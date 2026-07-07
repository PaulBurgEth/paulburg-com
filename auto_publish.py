#!/usr/bin/env python3
"""paulburg.com blog publisher.

Reads EN+RU article pairs from articles/ and writes MDX to content/posts/
(or content/drafts/ with --draft). Handoff docs (files starting with a ═══
divider) are auto-extracted: body + sources are kept, all editorial scaffolding
(SEO block, working notes, changelog, "VERIFIED"/"NEEDS PAUL" markers) is dropped.
Source .md/.docx files are never modified.

Usage:
  python3 auto_publish.py                      # all pairs, interactive
  python3 auto_publish.py --only <base> --yes  # one pair, no prompt
  python3 auto_publish.py --only <base> --draft --yes   # write to content/drafts/
  python3 auto_publish.py --only <base> --date 2026-07-07 --yes
"""
import os, re, sys, json, time, argparse
from pathlib import Path

DEEPSEEK_API_KEY = os.environ.get("DEEPSEEK_API_KEY", "")
INPUT_DIR    = "/Users/paulburg/Vibe_coding/PaulBurg.com/articles"
POSTS_DIR    = "/Users/paulburg/Vibe_coding/PaulBurg.com/content/posts"
DRAFTS_DIR   = "/Users/paulburg/Vibe_coding/PaulBurg.com/content/drafts"
DEFAULT_TAG  = "AI"
EXCERPT_CHARS = 800

HANDOFF_MARK = "═"
# Section headings that mark the end of the article body / start of editorial scaffolding.
EDITORIAL_HEADS = (
    r"NOTES?\s*:", r"WORKING NOTES", r"SEO NOTES", r"OPEN ITEMS", r"CHANGELOG",
    r"CONTEXT FOR CRITIC", r"ARTICLE TEXT ENDS", r"COMPANION",
    r"ПРИМЕЧАНИ", r"ЗАМЕТКИ", r"ОТКРЫТЫЕ ВОПРОСЫ", r"ТЕКСТ КОНЧАЕТСЯ", r"РАБОЧИЕ ЗАМЕТКИ",
)
EDITORIAL_RE = re.compile(r"^\s*(?:" + "|".join(EDITORIAL_HEADS) + r")", re.I)
SOURCES_HEAD_RE = re.compile(
    r"^\s*(?:SOURCES|FOOTNOTES|REFERENCES|BIBLIOGRAPHY"
    r"|ИСТОЧНИКИ|СНОСКИ|СПИСОК ЛИТЕРАТУРЫ|БИБЛИОГРАФИЯ)\b", re.I)
DIVIDER_RE = re.compile(r"^\s*[─—\-]{5,}\s*$")
RULE_RE    = re.compile(r"^\s*═{3,}\s*$")


# ─── readers ──────────────────────────────────────────────────────────────
def _docx_body_markdown(path):
    """Convert a .docx body to markdown, interleaving paragraphs and tables in
    document order (python-docx's paragraph iterator alone drops tables)."""
    from docx import Document
    from docx.table import Table
    from docx.text.paragraph import Paragraph
    doc = Document(path)
    out = []
    for child in doc.element.body.iterchildren():
        if child.tag.endswith("}p"):
            para = Paragraph(child, doc)
            text = para.text.strip()
            style = para.style.name.lower() if para.style else ""
            if not text:              out.append("")
            elif "heading 1" in style: out.append("# " + text)
            elif "heading 2" in style: out.append("## " + text)
            elif "heading 3" in style: out.append("### " + text)
            elif "list" in style:      out.append("- " + text)
            else:                      out.append(text)
        elif child.tag.endswith("}tbl"):
            tbl = Table(child, doc)
            out.append("")
            out.append(_table_to_html(tbl))
            out.append("")
    # collapse consecutive blanks
    res, prev_blank = [], False
    for line in out:
        if line == "":
            if not prev_blank: res.append("")
            prev_blank = True
        else:
            res.append(line); prev_blank = False
    return "\n\n".join(res)


def _table_to_html(tbl):
    rows = [[c.text.strip() for c in r.cells] for r in tbl.rows]
    if not rows:
        return ""
    html = ["<table>", "<thead>",
            "<tr>" + "".join(f"<th>{c}</th>" for c in rows[0]) + "</tr>",
            "</thead>", "<tbody>"]
    for r in rows[1:]:
        html.append("<tr>" + "".join(f"<td>{c}</td>" for c in r) + "</tr>")
    html += ["</tbody>", "</table>"]
    return "\n".join(html)


def read_full(filepath, lang):
    ext = Path(filepath).suffix.lower()
    if ext == ".docx":
        return _docx_body_markdown(filepath)
    if ext == ".doc":
        import mammoth
        with open(filepath, "rb") as f:
            return mammoth.convert_to_markdown(f).value
    if ext == ".md":
        text = Path(filepath).read_text(encoding="utf-8")
        if text.lstrip().startswith(HANDOFF_MARK):
            body, _seo, _date = extract_handoff(text, lang)
            return body
        return text


def read_opening(filepath, max_chars=EXCERPT_CHARS):
    ext = Path(filepath).suffix.lower()
    if ext == ".docx":
        from docx import Document
        doc = Document(filepath)
        return "\n".join(p.text for p in doc.paragraphs if p.text.strip())[:max_chars]
    if ext == ".doc":
        import mammoth
        with open(filepath, "rb") as f:
            return mammoth.extract_raw_text(f).value[:max_chars]
    if ext == ".md":
        return Path(filepath).read_text(encoding="utf-8")[:max_chars]


# ─── handoff extraction ───────────────────────────────────────────────────
def extract_handoff(text, lang):
    """Return (body_markdown_with_sources, seo_dict, date_str) from a handoff doc.
    Body = article text (title dropped) + a canonical ## Sources / ## Источники
    section. All editorial scaffolding is removed. Source file is not touched."""
    lines = text.split("\n")
    seo = _parse_seo_block(lines)
    date = seo.pop("date", None)

    # body: from the '# Title' after 'ARTICLE TEXT'/'ТЕКСТ СТАТЬИ' to first divider
    body_start = None
    for i, ln in enumerate(lines):
        if re.match(r"^\s*#\s+\S", ln):        # first markdown H1 = title line
            body_start = i + 1
            break
    body_lines = []
    if body_start is not None:
        for ln in lines[body_start:]:
            if DIVIDER_RE.match(ln) or RULE_RE.match(ln) or EDITORIAL_RE.match(ln):
                break
            body_lines.append(ln)
    body = "\n".join(body_lines).strip()

    sources = _extract_sources(lines)
    heading = "## Источники" if lang == "ru" else "## Sources"
    if sources:
        body = body + "\n\n" + heading + "\n\n" + sources
    return body, seo, date


def _parse_seo_block(lines):
    seo = {}
    field = {
        "title": (r"title\s*\(h1\)|заголовок\s*\(h1\)|title", "title"),
        "excerpt": (r"meta description|мета-описание|meta", "excerpt"),
        "slug": (r"suggested slug|slug|слаг", "slug"),
        "date": (r"^date|^дата", "date"),
    }
    for ln in lines:
        m = re.match(r"^\s*([^:]{2,40}):\s*(.+)$", ln)
        if not m:
            continue
        key, val = m.group(1).strip().lower(), m.group(2).strip()
        for pat, out in [(v[0], v[1]) for v in field.values()]:
            if re.search(pat, key) and out not in seo:
                seo[out] = val
                break
    return seo


def _extract_sources(lines):
    """Pull the Sources/Источники/Список литературы section, clean editorial notes."""
    start = None
    for i, ln in enumerate(lines):
        if SOURCES_HEAD_RE.match(ln):
            start = i + 1
            break
    if start is None:
        return ""
    if start < len(lines) and DIVIDER_RE.match(lines[start]):
        start += 1
    out = []
    for j in range(start, len(lines)):
        ln = lines[j]
        nxt = lines[j + 1] if j + 1 < len(lines) else ""
        if RULE_RE.match(ln):
            break
        if EDITORIAL_RE.match(ln) and DIVIDER_RE.match(nxt):
            break
        if EDITORIAL_RE.match(ln) and (nxt.strip() == "" or DIVIDER_RE.match(nxt)):
            break
        out.append(ln)
    return _clean_sources("\n".join(out)).strip()


EDIT_KEYWORDS = (r"VERIFIED", r"NEEDS PAUL", r"Spot-check", r"this round",
                 r"this session", r"сверено", r"наследуется", r"проверен",
                 r"independently verified", r"Статус верификации")
EDIT_KW_RE = re.compile("|".join(EDIT_KEYWORDS), re.I)
# editorial clauses embedded inside otherwise-real source lines
EDIT_PAREN_RE = re.compile(
    r"\s*\((?:[^()]*(?:verified|page fetched|corrected structure|per author"
    r"|for the record|pending clarification|screenshots from paul|kept here)"
    r"[^()]*)\)", re.I)
EDIT_TAIL_RE = re.compile(r"\s*(?:VERIFIED|NEEDS PAUL|Spot-check)[^.\n]*\.?", re.I)


def _clean_sources(text):
    # drop bracketed editorial glosses (they hold verification status + notes)
    text = re.sub(r"\s*\[[^\]]*\]", "", text)
    # drop editorial parentheticals embedded in source entries
    text = EDIT_PAREN_RE.sub("", text)
    # drop trailing editorial status clauses (e.g. "... VERIFIED previous rounds.")
    text = EDIT_TAIL_RE.sub("", text)
    # drop standalone parenthetical lines that are editorial status notes
    out = []
    for ln in text.split("\n"):
        s = ln.strip()
        if s.startswith("(") and s.endswith(")") and EDIT_KW_RE.search(s):
            continue
        out.append(ln)
    return "\n".join(out)


# ─── pairing / metadata ───────────────────────────────────────────────────
def find_pairs(input_dir):
    folder = Path(input_dir)
    if not folder.exists():
        folder.mkdir(parents=True)
        print("Created articles/ folder."); sys.exit(0)
    all_files = list(folder.glob("*.doc")) + list(folder.glob("*.docx")) + list(folder.glob("*.md"))
    en_files = [f for f in all_files if re.search(r"[_\-]en$", f.stem, re.I)]
    ru_files = [f for f in all_files if re.search(r"[_\-]ru$", f.stem, re.I)]
    pairs = []
    for en in en_files:
        base = re.sub(r"[_\-]en$", "", en.stem, flags=re.I)
        ru = next((r for r in ru_files
                   if re.sub(r"[_\-]ru$", "", r.stem, flags=re.I).lower() == base.lower()), None)
        if ru:
            pairs.append({"base": base, "en": str(en), "ru": str(ru)})
        else:
            print("  WARNING: No RU pair for " + en.name + " — skipping")
    return pairs


def read_doc_date(filepath):
    if Path(filepath).suffix.lower() == ".docx":
        try:
            from docx import Document
            cp = Document(filepath).core_properties
            if cp.created:
                return cp.created.strftime("%Y-%m-%d")
        except Exception:
            pass
    if Path(filepath).suffix.lower() == ".md":
        text = Path(filepath).read_text(encoding="utf-8")
        m = re.search(r"(?im)^\s*(?:date|дата)\s*:\s*(\d{4}-\d{2}-\d{2})", text)
        if m:
            return m.group(1)
    return None


def load_sidecar_seo(en_filepath):
    seo_path = Path(en_filepath).parent / (
        re.sub(r"[_\-]en$", "", Path(en_filepath).stem, flags=re.I) + ".seo.json")
    if seo_path.exists():
        print("  Using sidecar SEO file: " + seo_path.name)
        return json.loads(seo_path.read_text(encoding="utf-8"))
    return None


def extract_metadata(opening_en, opening_ru, base_name):
    slug = re.sub(r"[^a-z0-9]+", "-", base_name.lower()).strip("-")
    fallback = {
        "slug": slug,
        "title_en": base_name.replace("-", " ").replace("_", " ").title(),
        "title_ru": base_name.replace("-", " ").replace("_", " ").title(),
        "excerpt_en": "Article on paulburg.com",
        "excerpt_ru": "Article on paulburg.com",
        "tags": [DEFAULT_TAG],
    }
    if not DEEPSEEK_API_KEY:
        print("  WARNING: DEEPSEEK_API_KEY not set, using filename fallback")
        return fallback
    try:
        import requests
        prompt = (
            "Extract metadata from these article openings. Return ONLY a JSON object.\n\n"
            "English:\n" + opening_en + "\n\nRussian:\n" + opening_ru + "\n\n"
            '{"slug":"' + slug + '","title_en":"","title_ru":"","excerpt_en":"",'
            '"excerpt_ru":"","tags":["tag1","tag2","tag3"]}\n'
            "excerpt: max 155 chars. tags: 2-4 short English tags. Return ONLY JSON.")
        r = requests.post("https://api.deepseek.com/v1/chat/completions",
            headers={"Authorization": "Bearer " + DEEPSEEK_API_KEY,
                     "Content-Type": "application/json"},
            json={"model": "deepseek-chat", "messages": [{"role": "user", "content": prompt}],
                  "max_tokens": 400, "temperature": 0.1}, timeout=30)
        r.raise_for_status()
        raw = re.sub(r"^```json\s*|^```\s*|\s*```$", "", r.json()["choices"][0]["message"]["content"].strip())
        return json.loads(raw)
    except Exception as e:
        print("  WARNING: DeepSeek failed (" + str(e) + "), using fallback")
        return fallback


# ─── mdx build ────────────────────────────────────────────────────────────
def sanitize_mdx(text):
    # escape < and > followed by digits so MDX doesn't read them as JSX (<100, >20%)
    text = re.sub(r"<(\d)", r"&lt;\1", text)
    text = re.sub(r"(\s)>(\d)", r"\1&gt;\2", text)
    # strip a leading H1 (frontmatter title already shows in the page header)
    text = re.sub(r"^\s*# [^\n]+\n+", "", text)
    # strip editorial author-notes (Use:/Использование:) from source lists
    text = re.sub(r"(?im)^(use|использование)\s*:.*$\n?", "", text)
    # detach a docx-glued sources label; normalize sources heading, per language
    text = re.sub(r"(?m)([.!?…])(Sources|Footnotes|References)[ \t]*$", r"\1\n\n## Sources", text)
    text = re.sub(r"(?m)([.!?…])(Источники|Сноски)[ \t]*$", r"\1\n\n## Источники", text)
    text = re.sub(r"(?im)^[ \t]*#{0,3}[ \t]*(?:sources and research basis|sources|footnotes|references)[ \t]*$", "## Sources", text)
    text = re.sub(r"(?im)^[ \t]*#{0,3}[ \t]*(?:источники и исследовательская база|источники|сноски)[ \t]*$", "## Источники", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip() + "\n"


def build_mdx(title, date_str, tags, excerpt, content):
    t = title.replace('"', '\\"')
    e = excerpt.replace('"', '\\"')
    tags_yaml = "[" + ", ".join('"' + tag + '"' for tag in tags) + "]"
    content = sanitize_mdx(content)
    return "\n".join([
        "---", 'title: "' + t + '"', 'date: "' + date_str + '"',
        "tags: " + tags_yaml, 'excerpt: "' + e + '"', "---", "", content])


# ─── main ─────────────────────────────────────────────────────────────────
def main():
    from datetime import date
    ap = argparse.ArgumentParser(description="paulburg.com blog publisher")
    ap.add_argument("--only", help="publish only the pair with this base name")
    ap.add_argument("--draft", action="store_true", help="write to content/drafts/ (inert)")
    ap.add_argument("--yes", action="store_true", help="skip interactive confirmation")
    ap.add_argument("--date", help="override publish date (YYYY-MM-DD)")
    args = ap.parse_args()

    today = date.today().isoformat()
    out_root = DRAFTS_DIR if args.draft else POSTS_DIR
    print("paulburg.com Auto Blog Publisher")
    print("Output: " + out_root + ("  [DRAFT]" if args.draft else "") + "\n")

    pairs = find_pairs(INPUT_DIR)
    if args.only:
        pairs = [p for p in pairs if p["base"].lower() == args.only.lower()]
        if not pairs:
            print("No pair matching --only " + args.only); sys.exit(1)
    if not pairs:
        print("No EN+RU pairs found."); sys.exit(0)
    print("Found " + str(len(pairs)) + " pair(s): " + str([p["base"] for p in pairs]) + "\n")

    for i, pair in enumerate(pairs, 1):
        base = pair["base"]
        print("[" + str(i) + "/" + str(len(pairs)) + "] " + base)
        meta = load_sidecar_seo(pair["en"])
        if meta is None:
            # try handoff SEO, then DeepSeek
            en_text = Path(pair["en"]).read_text(encoding="utf-8") if pair["en"].endswith(".md") else ""
            ru_text = Path(pair["ru"]).read_text(encoding="utf-8") if pair["ru"].endswith(".md") else ""
            if en_text.lstrip().startswith(HANDOFF_MARK):
                _, en_seo, _ = extract_handoff(en_text, "en")
                _, ru_seo, _ = extract_handoff(ru_text, "ru")
                meta = {"slug": re.sub(r"[^a-z0-9]+", "-", en_seo.get("slug", base).lower()).strip("-"),
                        "title_en": en_seo.get("title", base), "title_ru": ru_seo.get("title", base),
                        "excerpt_en": en_seo.get("excerpt", ""), "excerpt_ru": ru_seo.get("excerpt", ""),
                        "tags": [DEFAULT_TAG]}
                print("  Using handoff SEO block")
            else:
                meta = extract_metadata(read_opening(pair["en"]), read_opening(pair["ru"]), base)

        slug = meta["slug"]
        out_dir = Path(out_root) / slug
        if (out_dir / "en.mdx").exists():
            print("  SKIP: " + slug + " already exists in " + out_root); continue

        # date priority: --date > sidecar > handoff Date: > docx core-prop > today
        doc_date = args.date or meta.get("date") or read_doc_date(pair["en"]) or today
        tags = meta.get("tags", [DEFAULT_TAG])
        print("  ─── Proposed metadata ───────────────────")
        print("  Slug:  " + slug + ("   [DRAFT]" if args.draft else ""))
        print("  Date:  " + doc_date)
        print("  EN:    " + meta["title_en"])
        print("  RU:    " + meta["title_ru"])
        print("  Tags:  " + ", ".join(tags))
        print("  Excerpt EN: " + meta["excerpt_en"])
        print("  Excerpt RU: " + meta["excerpt_ru"])
        print("  ─────────────────────────────────────────")
        if not args.yes:
            confirm = input("  Publish? [y/n/edit tags]: ").strip().lower()
            if confirm == "n":
                print("  Skipped."); continue
            if confirm not in ("y", ""):
                nt = [t.strip() for t in confirm.split(",") if t.strip()]
                if nt: tags = nt; print("  Tags: " + ", ".join(tags))

        print("  Converting content...")
        content_en = read_full(pair["en"], "en")
        content_ru = read_full(pair["ru"], "ru")
        out_dir.mkdir(parents=True, exist_ok=True)
        (out_dir / "en.mdx").write_text(
            build_mdx(meta["title_en"], doc_date, tags, meta["excerpt_en"], content_en), encoding="utf-8")
        (out_dir / "ru.mdx").write_text(
            build_mdx(meta["title_ru"], doc_date, tags, meta["excerpt_ru"], content_ru), encoding="utf-8")
        print("  ✓ " + str(out_dir))

    print("\n✓ Done.")


if __name__ == "__main__":
    main()
