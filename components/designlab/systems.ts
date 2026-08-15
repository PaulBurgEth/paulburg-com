/**
 * Three complete visual systems for paulburg.com.
 *
 * Each one is a closed set: ground, surface, text, accent, type pairing, scale
 * and section rhythm are chosen together. Mixing pieces across systems is what
 * produces the "Frankenstein" the current site already suffers from — the point
 * of the lab is to compare whole systems, not individual swaps.
 *
 * Hard constraint: every face must ship Cyrillic. Fraunces does not, which is
 * why Russian headings on the live site currently fall back to system serif.
 */

export type System = {
  id: string;
  name: string;
  tagline: string;
  why: string;
  risk: string;
  fonts: { headingVar: string; bodyVar: string; labelVar: string; monoVar: string };
  fontNames: { heading: string; body: string; label: string };
  tokens: {
    bg: string; bg2: string; card: string; border: string; borderStrong: string;
    heading: string; body: string; muted: string;
    accent: string; accentSoft: string; accent2?: string;
  };
  scale: { hero: string; h2: string; h3: string; body: string; lede: string; label: string };
  rhythm: {
    /** Uppercase letterspaced mono eyebrow — the single strongest template tell. */
    eyebrow: "none" | "mono" | "rule";
    cards: "bordered" | "flat" | "ruled";
    sectionNumbers: boolean;
  };
};

export const SYSTEMS: System[] = [
  {
    id: "paper",
    name: "Бумага",
    tagline: "Светлая, чернильная, редакционная",
    why:
      "Тёмный фон — общее место всех похожих сайтов, включая тот, что вы нашли. Светлая бумага ломает узнавание мгновенно и бесплатно решает читаемость. Oxblood вместо золота читается как печатная традиция и авторитет, а не как «люкс». Literata — редакционная гарнитура с настоящей кириллицей: русская версия впервые будет набрана тем же шрифтом, что английская.",
    risk: "Самый большой визуальный скачок. Тёмная тема остаётся, но становится вторым режимом, а не главным.",
    fonts: { headingVar: "var(--lab-literata)", bodyVar: "var(--lab-literata)", labelVar: "var(--lab-golos)", monoVar: "var(--lab-mono)" },
    fontNames: { heading: "Literata 700", body: "Literata 400", label: "Golos Text" },
    tokens: {
      bg: "#F4F1EA", bg2: "#EBE6DC", card: "#FFFFFF", border: "#DDD6C8", borderStrong: "#C4B9A5",
      heading: "#1B1A17", body: "#33302A", muted: "#6B6558",
      accent: "#8C2F27", accentSoft: "rgba(140,47,39,0.08)",
    },
    scale: { hero: "clamp(40px, 6vw, 68px)", h2: "clamp(28px, 4vw, 42px)", h3: "20px", body: "17px", lede: "20px", label: "13px" },
    rhythm: { eyebrow: "none", cards: "ruled", sectionNumbers: false },
  },
  {
    id: "spec",
    name: "Спецификация",
    tagline: "Тёмная, но с перевёрнутой типографикой",
    why:
      "Сохраняет тёмную тему, которая вам нравится, но ломает главный признак шаблона: гротеск в заголовках и serif только в длинных текстах — ровно наоборот к нынешней связке. Фон уходит от почти-чёрного к холодному графиту, чтобы читаться как выбор, а не как дефолт. Onest — кириллический по происхождению гротеск. Такая система нативно подходит вашему контенту: воронки, метрики, таблицы бенчмарков.",
    risk: "Может уйти в сухость. Нужен характер хотя бы в одной точке — например в герое.",
    fonts: { headingVar: "var(--lab-onest)", bodyVar: "var(--lab-literata)", labelVar: "var(--lab-onest)", monoVar: "var(--lab-mono)" },
    fontNames: { heading: "Onest 700", body: "Literata 400", label: "Onest 500" },
    tokens: {
      bg: "#0E1216", bg2: "#141A20", card: "#171E25", border: "#232C35", borderStrong: "#334051",
      heading: "#EEF3F7", body: "#C3CDD6", muted: "#7C8A97",
      accent: "#5B8CFF", accentSoft: "rgba(91,140,255,0.10)",
    },
    scale: { hero: "clamp(40px, 6vw, 66px)", h2: "clamp(26px, 3.6vw, 38px)", h3: "19px", body: "16px", lede: "19px", label: "12px" },
    rhythm: { eyebrow: "rule", cards: "flat", sectionNumbers: true },
  },
  {
    id: "archive",
    name: "Тёплый архив",
    tagline: "Тёмная и тёплая, два акцента со смыслом",
    why:
      "Самый консервативный вариант: сохраняет характер, который вам нравится, и меняет температуру. Фон уходит от сине-чёрного к коричнево-чёрному, золото — к более глухой меди, и появляется второй акцент (шалфей уже есть в палитре), но с семантической ролью: медь — действие, шалфей — подтверждённый результат. PT Serif сделан для кириллицы, поэтому русские заголовки перестанут выпадать.",
    risk: "Самый слабый эффект. По записи в DECISIONS.md вы дважды не увидели разницы от осторожных правок — здесь тот же риск.",
    fonts: { headingVar: "var(--lab-ptserif)", bodyVar: "var(--lab-golos)", labelVar: "var(--lab-golos)", monoVar: "var(--lab-mono)" },
    fontNames: { heading: "PT Serif 700", body: "Golos Text 400", label: "Golos Text 500" },
    tokens: {
      bg: "#16120F", bg2: "#1D1815", card: "#221C18", border: "#2E2621", borderStrong: "#40352C",
      heading: "#F2EAdf", body: "#D6CBBD", muted: "#8B8073",
      accent: "#B8734A", accentSoft: "rgba(184,115,74,0.10)", accent2: "#7AAB8F",
    },
    scale: { hero: "clamp(40px, 6vw, 66px)", h2: "clamp(27px, 3.8vw, 40px)", h3: "20px", body: "16.5px", lede: "19px", label: "12px" },
    rhythm: { eyebrow: "mono", cards: "bordered", sectionNumbers: true },
  },
];

/** Current production values, shown as the baseline to compare against. */
export const CURRENT = {
  name: "Сейчас",
  tokens: { bg: "#07080a", card: "#0f1215", border: "#1a1d22", heading: "#ffffff", body: "#c5bfb3", muted: "#6a6e78", accent: "#c8a96e" },
  fontNames: { heading: "Fraunces 700 (без кириллицы)", body: "Instrument Sans", label: "Inconsolata" },
  scale: { body: "12.5–13px", label: "9–11px" },
  contrastMuted: "3.93:1",
};
