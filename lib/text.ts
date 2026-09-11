export function splitLastWord(title: string): { head: string; tail: string } {
  const words = title.trim().split(/\s+/);
  if (words.length === 1) return { head: "", tail: title };
  return { head: words.slice(0, -1).join(" ") + " ", tail: words[words.length - 1] };
}

/**
 * Heading id for in-page anchors.
 *
 * There were three copies of this, and they had drifted. `extractToc` slugified
 * the raw markdown source including the `**` of a bold run, while `makeHeading`
 * only produced an id at all when `children` was a plain string — so any
 * heading containing inline markup arrived as an array, got `id=""`, and its
 * table-of-contents link dead-ended.
 *
 * `seen` de-duplicates: two headings with the same text used to produce two
 * identical ids, and the second anchor was unreachable.
 */
export function headingId(text: string, seen?: Set<string>): string {
  const base = text
    // Strip inline markdown first, so the id matches whether it is derived from
    // the source or from the rendered children.
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\*\*([^*]*)\*\*/g, "$1")
    .replace(/\*([^*]*)\*/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .toLowerCase()
    .replace(/[^a-zа-яё0-9]+/gi, "-")
    .replace(/^-|-$/g, "");

  if (!seen) return base || "section";
  let id = base || "section";
  let n = 2;
  while (seen.has(id)) id = `${base || "section"}-${n++}`;
  seen.add(id);
  return id;
}

/** Plain text of a React child, for deriving an id from rendered content. */
export function childText(children: unknown): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(childText).join("");
  if (children && typeof children === "object" && "props" in children) {
    return childText((children as { props?: { children?: unknown } }).props?.children);
  }
  return "";
}
