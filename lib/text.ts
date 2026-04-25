export function splitLastWord(title: string): { head: string; tail: string } {
  const words = title.trim().split(/\s+/);
  if (words.length === 1) return { head: "", tail: title };
  return { head: words.slice(0, -1).join(" ") + " ", tail: words[words.length - 1] };
}
