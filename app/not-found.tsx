import Link from "next/link";
import { headers } from "next/headers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LANG_HEADER } from "@/middleware";

/**
 * A styled 404 in the visitor's language.
 *
 * There was none, so a bad slug fell through to Next's built-in page:
 * unstyled, English only, no header, no footer, no language switch, and no way
 * back into the site.
 */
export default async function NotFound() {
  const lang = (await headers()).get(LANG_HEADER) === "ru" ? "ru" : "en";
  const t = lang === "ru"
    ? {
        code: "404",
        title: "Такой страницы нет",
        body: "Возможно, адрес изменился или ссылка оказалась неполной. Ниже то, что точно есть.",
        links: [
          { href: "/", l: "На главную" },
          { href: "/services", l: "Услуги" },
          { href: "/outbound", l: "Холодный аутбаунд" },
          { href: "/blog", l: "Блог" },
        ],
      }
    : {
        code: "404",
        title: "That page is not here",
        body: "The address may have changed, or the link arrived incomplete. Here is what definitely exists.",
        links: [
          { href: "/", l: "Home" },
          { href: "/services", l: "Services" },
          { href: "/outbound", l: "Cold outbound" },
          { href: "/blog", l: "Blog" },
        ],
      };

  return (
    <>
      <Navbar />
      <main id="content" style={{ background: "var(--c-bg)", minHeight: "100vh" }}>
        <section style={{ paddingTop: 160, paddingBottom: 120 }}>
          <div className="container-custom" style={{ maxWidth: 640 }}>
            <div
              aria-hidden="true"
              style={{
                fontFamily: "var(--font-inconsolata), monospace",
                fontSize: 14,
                letterSpacing: "0.22em",
                color: "var(--c-gold)",
                marginBottom: 18,
              }}
            >
              § {t.code}
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(30px, 4vw, 44px)",
                fontWeight: 700,
                color: "var(--c-heading)",
                letterSpacing: "-0.02em",
                marginBottom: 16,
              }}
            >
              {t.title}
            </h1>
            <p
              style={{
                fontFamily: "var(--font-newsreader), serif",
                fontSize: 17,
                lineHeight: 1.65,
                color: "var(--c-text2)",
                maxWidth: "58ch",
                marginBottom: 32,
              }}
            >
              {t.body}
            </p>
            <ul style={{ display: "flex", flexWrap: "wrap", gap: 10, listStyle: "none", padding: 0 }}>
              {t.links.map((x) => (
                <li key={x.href}>
                  <Link
                    href={x.href}
                    className="btn-ghost"
                    style={{
                      display: "inline-block",
                      padding: "10px 18px",
                      borderRadius: 6,
                      border: "1px solid var(--c-border-control)",
                      color: "var(--c-text)",
                      fontFamily: "var(--font-instrument-sans), sans-serif",
                      fontSize: 15,
                      textDecoration: "none",
                    }}
                  >
                    {x.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
