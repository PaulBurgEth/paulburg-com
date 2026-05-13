"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Bot, Workflow, Database, Globe, Lightbulb, Coffee } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import CTARow from "@/components/CTARow";
import Footer from "@/components/Footer";
import { useIntakeModal } from "@/context/IntakeModalContext";
import { useMentorshipModal } from "@/context/MentorshipModalContext";
import { useStageReveal, useRevealObserver } from "@/lib/useStageReveal";
import type { Post } from "@/lib/posts";

const C = {
  bg:       "var(--c-bg)",
  bg2:      "var(--c-bg2)",
  card:     "var(--c-card)",
  card2:    "var(--c-card2)",
  border:   "var(--c-border)",
  border2:  "var(--c-border2)",
  gold:     "var(--c-gold)",
  goldDim:  "var(--c-gold-dim)",
  goldGlow: "var(--c-gold-glow)",
  sage:     "var(--c-sage)",
  sageDim:  "var(--c-sage-dim)",
  violet:   "var(--c-violet)",
  text:     "var(--c-text)",
  text2:    "var(--c-text2)",
  text3:    "var(--c-text3)",
  muted:    "var(--c-muted)",
  faint:    "var(--c-faint)",
  subtle:   "var(--c-subtle)",
  heading:  "var(--c-heading)",
};

const CSS = `

html{scroll-behavior:smooth}
body{
  background:${C.bg};color:${C.text};
  /* Body face matches the mockup — Newsreader serif. Per-element fonts
     (Fraunces for headings, Instrument Sans for UI labels, Inconsolata
     for mono) override locally. */
  font-family:var(--font-newsreader),var(--font-source-serif),Georgia,serif;
  -webkit-font-smoothing:antialiased;
}

/* ── GRAIN ── */
body::after{
  content:'';position:fixed;inset:0;pointer-events:none;z-index:999;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
  opacity:0.5;mix-blend-mode:overlay;
}

/* ── WARM GLOW ── */
.ambient{
  position:fixed;inset:0;pointer-events:none;z-index:0;
  background:
    radial-gradient(ellipse 60% 40% at 20% 0%, rgba(200,169,110,0.05) 0%, transparent 60%),
    radial-gradient(ellipse 50% 50% at 80% 100%, rgba(122,171,143,0.04) 0%, transparent 55%);
}

.wrap{position:relative;z-index:1;max-width:940px;margin:0 auto;padding:0 28px}

/* ── HERO ── */
.hero{
  position:relative;
  padding:140px 28px 72px;
  max-width:940px;margin:0 auto;
}
.hero-inner{position:relative}
.hero-kicker{
  font-family:var(--font-inconsolata),monospace;
  font-size:11px;letter-spacing:0.2em;text-transform:uppercase;
  color:${C.gold};margin-bottom:24px;
  display:flex;align-items:center;gap:12px;flex-wrap:wrap;
}
.hero-kicker::before{content:'';width:32px;height:1px;background:${C.gold};opacity:0.6}
.hero-kicker-coord{color:${C.muted};letter-spacing:0.12em;font-size:10px;margin-left:4px}
.hero-name{
  font-family:var(--font-fraunces),serif;
  font-feature-settings:"ss01","liga","kern";
  font-size:clamp(64px,10vw,108px);
  font-weight:700;line-height:0.9;
  letter-spacing:-0.02em;color:${C.heading};
  margin:0 0 28px;
  position:relative;
}
.hero-name em{
  font-style:italic;
  font-family:var(--font-fraunces),serif;
  font-weight:600;
  color:transparent;
  -webkit-text-stroke:1.5px rgba(200,169,110,0.7);
}
.hero-roles{
  font-family:var(--font-inconsolata),monospace;
  font-size:12px;letter-spacing:0.12em;
  color:${C.text};margin-bottom:20px;
  text-transform:uppercase;
  display:flex;align-items:center;gap:14px;flex-wrap:wrap;
}
.hero-role{display:inline-flex;align-items:center;gap:7px}
.hero-role svg{color:${C.gold};flex-shrink:0}
.hero-role-sep{color:${C.muted};opacity:0.6}
.hero-desc{
  font-family:var(--font-newsreader),serif;
  font-style:italic;
  font-size:18px;color:var(--c-body-lede);
  max-width:480px;line-height:1.75;
  margin-bottom:36px;
}
.hero-desc strong{
  color:${C.text};font-weight:500;
  font-style:normal;
  font-family:var(--font-newsreader),serif;
}

/* Hero coordinate pin — two separate absolute elements per mockup. */
.hero-pin-line{
  display:none;
  position:absolute;
  top:144px;left:28px;
  width:1px;height:96px;
  background:linear-gradient(180deg, rgba(200,169,110,0.67), transparent);
  pointer-events:none;
}
.hero-pin-circle{
  display:none;
  position:absolute;
  top:248px;left:22px;
  width:13px;height:13px;
  border:1px solid ${C.gold};
  border-radius:50%;
  align-items:center;justify-content:center;
  background:${C.bg};
  pointer-events:none;
}
.hero-pin-dot{
  width:5px;height:5px;border-radius:50%;
  background:${C.gold};
  box-shadow:0 0 8px ${C.gold};
}
@media (min-width: 768px){
  .hero-pin-line{display:block}
  .hero-pin-circle{display:flex}
}

/* Hero stage cascade — gated by data-stage attribute (set by JS via inline style). */
.pb-stage{
  opacity:0;transform:translateY(8px);
  transition:opacity 540ms cubic-bezier(.2,.7,.3,1), transform 540ms cubic-bezier(.2,.7,.3,1);
}
.pb-stage[data-visible="1"]{opacity:1;transform:translateY(0)}
@media (prefers-reduced-motion: reduce){
  .pb-stage{opacity:1;transform:none;transition:none}
}

.tags{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:40px}
.tag{
  padding:5px 12px;border-radius:4px;
  font-family:var(--font-inconsolata),monospace;
  font-size:11px;letter-spacing:0.07em;
  border:1px solid rgba(200,169,110,0.4);color:${C.text};
}
.tag.gold{border-color:rgba(200,169,110,0.5);color:${C.gold};background:rgba(200,169,110,0.05)}
.tag.sage{border-color:rgba(122,171,143,0.3);color:${C.sage};background:rgba(122,171,143,0.05)}
.tag.tag-icon{display:inline-flex;align-items:center;gap:7px;padding:6px 12px}
.tag.tag-icon svg{color:${C.gold};flex-shrink:0}
.ctas{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:44px}
.btn-gold{
  background:${C.gold};color:${C.bg};border:none;
  border-radius:5px;padding:12px 24px;
  font-size:13px;font-weight:600;cursor:pointer;
  font-family:var(--font-instrument-sans),sans-serif;
  display:flex;align-items:center;gap:8px;
  letter-spacing:0.04em;transition:all 0.2s;
}
.btn-gold:hover{background:#d9bc82;transform:translateY(-1px);box-shadow:0 6px 20px rgba(200,169,110,0.2)}
.btn-ghost{
  background:transparent;color:${C.text};
  border:1px solid ${C.border2};border-radius:5px;
  padding:12px 24px;font-size:13px;cursor:pointer;
  font-family:var(--font-instrument-sans),sans-serif;
  display:flex;align-items:center;gap:8px;
  letter-spacing:0.04em;transition:all 0.2s;
}
.btn-ghost:hover{border-color:${C.gold};color:${C.gold}}
.socials{
  display:flex;gap:18px;padding-top:12px;
  border-top:1px solid ${C.border2};
}
.social{
  font-family:var(--font-inconsolata),monospace;font-size:11px;
  color:${C.subtle};cursor:pointer;transition:color 0.2s;
  letter-spacing:0.08em;text-transform:uppercase;
  text-decoration:none;
}
.social:hover{color:${C.gold}}

/* ── SECTION ── */
.section{padding:72px 0;position:relative}
.section-number{
  position:absolute;top:24px;right:28px;
  font-family:var(--font-inconsolata),monospace;
  font-size:11px;letter-spacing:0.18em;color:${C.muted};
  pointer-events:none;
}
@media(max-width:600px){.section-number{display:none}}
.eyebrow{
  font-family:var(--font-inconsolata),monospace;
  font-size:11px;letter-spacing:0.22em;text-transform:uppercase;
  color:${C.gold};margin-bottom:14px;
  display:flex;align-items:center;gap:14px;
}
.eyebrow::before{content:'';width:32px;height:1px;background:${C.gold};opacity:0.6}
.sec-title{
  font-family:var(--font-fraunces),serif;
  font-size:clamp(26px,4vw,38px);font-weight:700;
  color:${C.heading};margin-bottom:6px;letter-spacing:-0.01em;
}
.sec-sub{font-size:13px;color:var(--c-body);margin-bottom:36px}
hr.div{border:none;border-top:1px solid ${C.border}}

/* ── PODCAST CARDS ── */
.pod-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
@media(max-width:520px){.pod-grid{grid-template-columns:1fr}}
.pod-card{
  background:${C.card};border:1px solid ${C.border};
  border-radius:10px;overflow:hidden;
  cursor:pointer;transition:all 0.22s;
  text-decoration:none;color:inherit;
  display:flex;flex-direction:column;
}
.pod-card:hover{border-color:rgba(200,169,110,0.35);transform:translateY(-2px);box-shadow:0 10px 32px rgba(0,0,0,0.5)}
.pod-thumb{
  width:100%;aspect-ratio:16/9;
  position:relative;overflow:hidden;
  display:flex;align-items:center;justify-content:center;
  background:${C.card};
}
.pod-thumb img{
  position:absolute;inset:0;width:100%;height:100%;
  object-fit:cover;z-index:0;
}
.pod-overlay{
  position:absolute;inset:0;z-index:1;
  background:linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%);
}
.pod-ep{
  position:absolute;top:9px;left:9px;z-index:2;
  background:rgba(7,8,10,0.85);border:1px solid ${C.border2};
  border-radius:4px;padding:3px 8px;
  font-family:var(--font-inconsolata),monospace;font-size:10px;color:${C.muted};
}
.pod-play{
  position:relative;z-index:2;
  width:42px;height:42px;border-radius:50%;
  border:1px solid ${C.gold};background:rgba(200,169,110,0.15);backdrop-filter:blur(4px);
  display:flex;align-items:center;justify-content:center;
  color:${C.gold};font-size:12px;transition:all 0.2s;
}
.pod-card:hover .pod-play{
  background:rgba(200,169,110,0.3);
  box-shadow:0 0 0 3px rgba(200,169,110,0.2), 0 0 16px rgba(200,169,110,0.3);
}

@media(max-width: 768px){
  .pod-card { aspect-ratio: 16/9; }
  .pod-thumb { aspect-ratio: auto; flex: 1; }
  .pod-body { padding: 10px 12px; }
}
.pod-body{padding:14px 16px}
.pod-src{
  font-family:var(--font-inconsolata),monospace;
  font-size:9px;letter-spacing:0.15em;text-transform:uppercase;
  color:${C.gold};margin-bottom:7px;
}
.pod-title{font-size:12px;font-weight:500;color:${C.text3};line-height:1.55}
.pod-ext{float:right;color:${C.faint};font-size:14px;margin-top:1px;transition:color 0.2s}
.pod-card:hover .pod-ext{color:${C.gold}}

/* ── WRITING CARDS ── editorial layout: 1.2fr featured + 1fr stacked list */
.write-grid{display:grid;grid-template-columns:1.2fr 1fr;gap:20px;margin-bottom:14px;align-items:start}
.write-list{display:flex;flex-direction:column;gap:12px}
.write-featured{padding:24px 24px 28px}
@media(max-width:680px){.write-grid{grid-template-columns:1fr}}
.write-card{
  background:${C.card};border:1px solid ${C.border};
  border-radius:10px;padding:18px;cursor:pointer;
  transition:all 0.2s;
}
.write-card:hover{border-color:rgba(200,169,110,0.28);transform:translateY(-2px)}
.write-src{
  display:flex;align-items:center;gap:6px;
  font-family:var(--font-inconsolata),monospace;
  font-size:9px;letter-spacing:0.15em;text-transform:uppercase;
  margin-bottom:11px;
}
.write-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0}
.write-title{
  font-family:var(--font-fraunces),serif;
  font-size:13px;font-weight:700;color:${C.text};
  line-height:1.45;margin-bottom:10px;
}
.write-excerpt{font-size:11px;color:${C.muted};line-height:1.6;margin-bottom:12px}
.write-foot{
  display:flex;align-items:center;justify-content:space-between;
  font-family:var(--font-inconsolata),monospace;font-size:10px;color:${C.faint};
}
.write-read{color:${C.gold}}
.write-new{
  display:inline-flex;align-items:center;gap:4px;
  font-family:var(--font-inconsolata),monospace;
  font-size:8px;font-weight:700;letter-spacing:0.14em;
  color:${C.gold};
  background:rgba(200,169,110,0.10);
  border:1px solid rgba(200,169,110,0.30);
  border-radius:3px;padding:2px 5px;
  margin-left:auto;
}
.write-new-dot{
  width:4px;height:4px;border-radius:50%;
  background:${C.gold};
  animation:pulse-dot 2s ease-in-out infinite;
}
@keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:0.3}}
.write-card-new{border-color:rgba(200,169,110,0.20)!important}
.sub-bar{
  background:${C.card2};border:1px solid ${C.border2};
  border-radius:10px;padding:18px 22px;
  display:flex;align-items:center;justify-content:space-between;gap:16px;
}
.sub-bar p{font-size:12px;color:${C.muted}}
.sub-bar strong{color:${C.text};font-weight:500}

/* ── PROJECTS ── */
.cat-head{
  display:flex;align-items:center;gap:10px;
  margin-bottom:13px;margin-top:36px;
  font-family:var(--font-inconsolata),monospace;
  font-size:9px;letter-spacing:0.2em;text-transform:uppercase;
}
.cat-tick{width:2px;height:14px;border-radius:2px;flex-shrink:0}
.proj-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:9px}
@media(max-width:500px){.proj-grid{grid-template-columns:1fr}}
.proj-card{
  background:${C.card};border:1px solid ${C.border};
  border-radius:9px;padding:16px;
  position:relative;cursor:pointer;
  transition:all 0.2s;text-decoration:none;color:inherit;
  display:block;
}
.proj-card:hover{border-color:rgba(200,169,110,0.25);background:${C.card2}}
.proj-name{font-weight:600;font-size:13px;color:${C.text};margin-bottom:5px;padding-right:52px}
.proj-desc{font-size:13px;color:${C.text2};line-height:1.6}

/* ── MENTORSHIP ── */
.mentor-card{
  display:block;text-decoration:none;
  background:linear-gradient(135deg, rgba(200,169,110,0.06) 0%, rgba(200,169,110,0.01) 100%);
  border:1px solid ${C.border};border-radius:12px;
  padding:32px 32px;margin-top:24px;
  transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position:relative;overflow:hidden;
}
.mentor-card::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(200,169,110,0.08), transparent 40%);
  opacity:0;transition:opacity 0.3s;
}
.mentor-card:hover{
  border-color:rgba(200,169,110,0.3);
  transform:translateY(-2px);
  box-shadow:0 12px 30px rgba(0,0,0,0.3), 0 0 48px rgba(200,169,110,0.05);
}
.mentor-card:hover::before{opacity:1}
.mentor-card-inner{position:relative;z-index:1;display:flex;flex-direction:column;gap:16px;}
@media (min-width:768px){
  .mentor-card-inner{flex-direction:row;align-items:center;justify-content:space-between;gap:32px;}
}
.mentor-content{flex:1;}
.mentor-title{font-family:var(--font-fraunces),serif;font-size:24px;color:${C.gold};margin-bottom:8px;}
.mentor-desc{font-size:14px;color:${C.text2};line-height:1.6;}
.mentor-features{display:flex;flex-wrap:wrap;gap:12px;margin-top:16px;}
.mentor-btn{
  background:transparent;border:1px solid ${C.gold};color:${C.gold};
  padding:10px 24px;border-radius:6px;font-size:13px;font-family:var(--font-instrument-sans),sans-serif;
  letter-spacing:0.04em;transition:all 0.2s;white-space:nowrap;
  display:flex;align-items:center;gap:8px;align-self:flex-start;
}
.mentor-card:hover .mentor-btn{
  background:${C.gold};color:${C.bg};
}

/* ── MEDIA ── */
.status{
  position:absolute;top:12px;right:12px;
  font-family:var(--font-inconsolata),monospace;
  font-size:8px;letter-spacing:0.1em;text-transform:uppercase;
  padding:3px 7px;border-radius:3px;
}
.st-live{background:rgba(122,171,143,0.1);color:${C.sage};border:1px solid rgba(122,171,143,0.25)}
.st-active{background:rgba(122,171,143,0.1);color:${C.sage};border:1px solid rgba(122,171,143,0.25)}
.st-paused{background:rgba(90,92,98,0.15);color:${C.muted};border:1px solid ${C.border2}}
.st-dev{background:rgba(155,142,196,0.10);color:${C.violet};border:1px solid rgba(155,142,196,0.33)}

/* Wide card */
.proj-card.wide{grid-column:1/-1;display:flex;align-items:flex-start;gap:16px}
.proj-card.wide .proj-name{padding-right:0;font-size:14px}
.proj-card.wide .proj-desc{font-size:12px}

/* ── ABOUT ── */
.about-layout{display:grid;grid-template-columns:300px 1fr;gap:48px;align-items:start}
@media(max-width:680px){.about-layout{grid-template-columns:1fr}}
.photo-frame{
  width:300px;flex-shrink:0;
  border-radius:12px;overflow:hidden;
  border:1px solid ${C.border2};aspect-ratio:4/5;
  background:${C.card};
  position:relative;
}
.photo-frame img{width:100%;height:100%;object-fit:cover;object-position:top}
.photo-frame::after{
  content:'';position:absolute;inset:0;
  background:linear-gradient(180deg, transparent 60%, rgba(7,8,10,0.35) 100%);
  pointer-events:none;
}
@media(max-width:680px){.photo-frame{width:100%;max-width:300px}}
.about-tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px}
.about-bio p{font-size:13px;color:${C.muted};line-height:1.8;margin-bottom:11px}
.about-bio p:first-child{color:${C.text2};font-size:14px}
.about-bio strong{color:${C.text3};font-weight:500}

/* ── LIGHT MODE OVERRIDES ── */
:root:not(.dark) body::after{opacity:0.2}
:root:not(.dark) .ambient{opacity:0}

/* ── SERVICES TEASER ── */
.services-mini-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:600px){.services-mini-grid{grid-template-columns:1fr}}

/* ── FOLLOW SECTION ── */
.follow-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
@media(max-width:640px){.follow-grid{grid-template-columns:1fr}}
.follow-card{
  background:${C.card};border:1px solid ${C.border};
  border-radius:12px;padding:32px;display:flex;flex-direction:column;
  transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.follow-card:hover{border-color:rgba(200,169,110,0.25);transform:translateY(-2px)}
.follow-title{font-family:var(--font-fraunces),serif;font-size:20px;color:${C.gold};margin-bottom:12px}
.follow-desc{font-size:14px;color:${C.text2};line-height:1.6;margin-bottom:24px;flex:1}
.badge-ru{
  background:rgba(200,169,110,0.1);color:${C.gold};
  padding:2px 6px;border-radius:4px;font-size:9px;
  font-family:var(--font-inconsolata),monospace;vertical-align:middle;margin-left:8px;
}
`;

const podcasts = [
  { ep:"Ep. 138", src:"Crypto Altruism",
    title:"ReFi Phangan: Regenerative Finance, Quadratic Funding & Local Impact",
    url:"https://www.cryptoaltruism.org/blog/crypto-altruism-podcast-episode-138-refi-phangan-regenerative-finance-quadratic-funding-and-local-impact",
    img:"/podcast-138.jpg" },
  { ep:"Ep. 201", src:"Crypto Altruism",
    title:"Web3 Localism for Global Climate Action: From Decentralized Cleanups to Regenerative Economies",
    url:"https://www.cryptoaltruists.com/blog/crypto-altruists-episode-201-web3-localism-for-global-climate-action-from-decentralized-cleanups-to-regenerative-local-economies",
    img:"/podcast-201.webp" },
  { ep:"Talk", src:"Devcon 7 SEA · Bangkok",
    title:"Impact Products & Impact Marketplace — Regen Hub, Devcon 7",
    url:"https://www.youtube.com/watch?v=40KkjjSW3C8",
    ytId:"40KkjjSW3C8" },
  { ep:"EP01", src:"Super dApp Builders",
    title:"Building DeCleanup Network: Turning Physical Cleanups into On-Chain Capital",
    url:"https://www.youtube.com/watch?v=ZEobYbUxDxk",
    ytId:"ZEobYbUxDxk" },
];

const articles = [
  { src:"Substack", color:"#e8a46e",
    title:"Vietnam Between the Village and the Megacity",
    excerpt:"Observations on contrast, pace, and what living between two worlds teaches you about building for the future.",
    date:"Mar 2026", url:"https://paulburg.substack.com/p/vietnam-between-the-village-and-the" },
  { src:"Substack", color:"#e8a46e",
    title:"AI Is the Greatest Productivity Tool in History — If You Can Afford It",
    excerpt:"On the access gap opening up between AI-native builders and everyone else — and what that means.",
    date:"Mar 2026", url:"https://paulburg.substack.com/p/ai-is-the-greatest-productivity-tool" },
  { src:"Substack", color:"#e8a46e",
    title:"Gender and Pay: Why the Reality of the Labor Market Is Far More Complex Than It Looks",
    excerpt:"A look at the data and incentives behind one of the most misread topics in modern economics.",
    date:"Mar 2026", url:"https://paulburg.substack.com/p/gender-and-pay-why-the-reality-of" },
  { src:"EcoSynthesisX", color:C.sage,
    title:"Taking Notes on the Development of a Global Impact Market",
    excerpt:"How RWI tokenization unlocks sustainable funding loops for public goods and NGOs.",
    date:"Mar 2025", url:"https://mirror.xyz/ecosynthesisx.eth/zOdeuaeFfJUFScZZKu1OGF7cWCiRgUHQSGE-14cf8fo" },
  { src:"EcoSynthesisX", color:C.sage,
    title:"Clean Phangan Impact Product: Converting Cleanups into Capital",
    excerpt:"DeCleanup bridges physical environmental action with on-chain incentives and community capital.",
    date:"Jan 2025", url:"https://mirror.xyz/ecosynthesisx.eth/lBc13WGdIsnOI5t6w0AMcjWL_mqx9kFR0548Ft14ptM" },
  { src:"Paul Burg", color:C.violet,
    title:"EcoSynthesisX: From Crisis to Innovation",
    excerpt:"The pivot that transformed a local challenge on Koh Phangan into a global public goods framework.",
    date:"Nov 2024", url:"https://paragraph.com/@paulburg/ecosynthesisx-from-crisis-to-innovation" },
];

const projects = {
  impact: [
    { name:"EcoSynthesisX", desc:"Web3 public good studio collaborating with real-world NGOs to tokenize environmental and community impact into verifiable on-chain assets.", status:"active", url:"https://ecosynthesisx.xyz" },
    { name:"DeCleanup Network", desc:"Transforms environmental cleanups into transparent, verifiable digital impact. Your cleanups become tokenized assets that unlock rewards, reputation, and community recognition.", status:"live", url:"https://decleanup.net" },
    { name:"Regen Bazaar", desc:"Marketplace where real-world impact meets market value — tokenizing NGO activities such as cleanups, reforestation, and animal care, bridging nonprofits with global buyers.", status:"paused", url:"https://regenbazaar.com" },
  ],
  ngo: [
    { name:"Clean Phangan Impact Product", desc:"First MVP Impact Product built with the Clean Phangan NGO — 224+ weekly cleanups, 90+ tons of trash collected, now tokenized as sellable impact assets for impact investors.", status:"live", url:"https://cleanphangan.regenbazaar.com/" },
    { name:"EcoThailand Foundation Impact Product", desc:"Impact product framework built for EcoThailand Foundation — tokenizing volunteer contributions and environmental education into fundable, verifiable on-chain capital.", status:"live", url:"https://ecothailand.regenbazaar.com/" },
  ],
  phangan: [
    { name:"HelpRent Phangan", desc:"Real estate ecosystem for digital nomads on Koh Phangan — long-term rentals, local tours, and island guides in one platform.", status:"dev", url:"https://helprentphangan.com" },
    { name:"Guide Phangan", desc:"Authentic local guide and AI-driven infrastructure platform for nomads and expats navigating Koh Phangan — transport, food, stays, and community.", status:"dev", url:"https://guidephangan.com" },
  ],
  health: [
    { name:"Vita Crypt", desc:"Personal Health Intelligence with Blind Computing (FHE) — giving individuals true ownership and intelligence from their health data without ever exposing it. Your data stays encrypted, even during computation.", status:"dev", url:"https://vitacrypt.xyz", wide:true },
  ],
};

const communities = [
  {
    name:"ReFi Phangan",
    desc:"Empowering sustainability through decentralized coordination, connecting NGOs, and fostering a regenerative local economy.",
    url:"https://x.com/ReFiPhangan",
    color: C.sage
  },
  {
    name:"GreenPill Phangan",
    desc:"Local chapter of the GreenPill Network focused on building local regeneration infrastructure and public good funding.",
    url:"https://x.com/GreenPillKPG",
    color: C.sage
  }
];

const communityEvents = [
  { name:"Robonomics Network Collab", src:"ReFi & GreenPill Collab", url:"https://x.com/greenpillkpg/status/1958458246358036696" },
  { name:"Web3 / Blockchain Meetups", src:"Web3 Onboarding", url:"https://x.com/paulburg_/status/1959079994690576609" },
  { name:"Ethereum 10th Anniversary", src:"Phangan Edition", url:"https://x.com/ReFiPhangan/status/1962888082073727371" },
  { name:"BTC Pizza Day", src:"Community Gathering", url:"https://x.com/PaulBurg_/status/1926320701163589792" },
];

const NEW_DAYS = 30;
function isNew(dateStr: string) {
  return (Date.now() - new Date(dateStr).getTime()) / 86_400_000 < NEW_DAYS;
}

interface HomePageClientProps {
  latestPosts?: { en: Post[]; ru: Post[] };
}

/** Decorative section number marker — top-right corner of each section. aria-hidden. */
function SectionNumber({ n }: { n: string }) {
  return <span aria-hidden="true" className="section-number">§ {n}</span>;
}

/** GoldCursor — solid gold bar with glow, optionally blinking. Used in hero + footer brand. */
function GoldCursor({ h = 56, w = 4, blink = false, style }: { h?: number; w?: number; blink?: boolean; style?: React.CSSProperties }) {
  return (
    <span
      aria-hidden="true"
      className={blink ? "pb-cursor-blink" : undefined}
      style={{
        display: "inline-block",
        width: w,
        height: h,
        background: C.gold,
        boxShadow: `0 0 14px rgba(200,169,110,0.5)`,
        verticalAlign: "middle",
        ...style,
      }}
    />
  );
}

export default function HomePageClient({ latestPosts }: HomePageClientProps) {
  const { language } = useLanguage();
  const { open: openIntake } = useIntakeModal();
  const { open: openMentorshipModal } = useMentorshipModal();

  // 4-stage hero cascade with absolute delays matching the mockup
  // (mockup defines 5 stages; the 5th is the "selected ventures" strip
  // that the user excluded, so we stop at stage 4).
  const stage = useStageReveal([220, 520, 880, 1180]);

  // Reveal on scroll for all .pb-reveal elements.
  useRevealObserver();

  const blogPosts = latestPosts?.[language] ?? latestPosts?.en ?? [];
  const visible = blogPosts.length > 0 ? blogPosts : articles.slice(0, 3);

  // Mentorship card mouse-glow: update --mouse-x/y on the card element.
  const handleMentorMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <div className="ambient" />

      <Navbar />

      {/* ══════════ HERO ══════════ */}
      <section className="hero">
        {/* Left-rail coordinate pin — 96px gold gradient hairline + 13px circle outline + dot.
            Two separate absolute-positioned elements per the mockup.
            Hidden under md: breakpoint via CSS. */}
        <span
          aria-hidden="true"
          className="pb-stage hero-pin-line"
          data-visible={stage >= 1 ? "1" : "0"}
        />
        <span
          aria-hidden="true"
          className="pb-stage hero-pin-circle"
          data-visible={stage >= 1 ? "1" : "0"}
        >
          <span className="hero-pin-dot" />
        </span>

        <div className="hero-inner">
          <div className="pb-stage" data-visible={stage >= 1 ? "1" : "0"}>
            <div className="hero-kicker">
              <span>{language === "ru" ? "Сейчас в Да Нанге, Вьетнам" : "Currently in Da Nang, Vietnam"}</span>
              <span aria-hidden="true" className="hero-kicker-coord">· 16°N 108°E</span>
            </div>
          </div>
          <div className="pb-stage" data-visible={stage >= 2 ? "1" : "0"}>
            <h1 className="hero-name">
              Paul<br />
              <em>Burg</em>
              <GoldCursor h={68} w={5} blink style={{ marginLeft: 12, verticalAlign: "baseline", transform: "translateY(8px)" }} />
            </h1>
          </div>
          <div className="pb-stage" data-visible={stage >= 3 ? "1" : "0"}>
            <div className="hero-roles">
              <span className="hero-role">
                <Bot size={12} strokeWidth={1.5} aria-hidden="true" />
                {language === "ru" ? "AI-ASSISTED РАЗРАБОТКА" : "AI-ASSISTED DEVELOPMENT"}
              </span>
              <span className="hero-role-sep" aria-hidden="true">·</span>
              <span className="hero-role">
                <Lightbulb size={12} strokeWidth={1.5} aria-hidden="true" />
                {language === "ru" ? "СЕРИЙНЫЙ ПРЕДПРИНИМАТЕЛЬ" : "SERIAL ENTREPRENEUR"}
              </span>
              <span className="hero-role-sep" aria-hidden="true">·</span>
              <span className="hero-role">
                <Coffee size={12} strokeWidth={1.5} aria-hidden="true" />
                {language === "ru" ? "КОФЕ И КОД" : "COFFEE & CODE"}
              </span>
            </div>
          </div>
          <div className="pb-stage" data-visible={stage >= 4 ? "1" : "0"}>
            <p className="hero-desc">
              {language === "ru"
                ? "Проектирую и запускаю AI-системы для бизнеса — боты, CRM и BI-дашборды, автоматизация, matching-движки, сайты. С нуля под ваш процесс. "
                : "I design and ship AI-powered systems for businesses — bots, CRMs and BI dashboards, automation, matching engines, websites. Built from scratch around your process. "}
              <strong>
                {language === "ru" ? "Не шаблон. Не no-code." : "Not a template. Not a no-code tool."}
              </strong>
              {language === "ru" ? " Готово за дни." : " Ready in days."}
            </p>
            <div className="tags">
              <span className="tag gold">{language === "ru" ? "AI-боты" : "AI Bots"}</span>
              <span className="tag gold">{language === "ru" ? "CRM и BI" : "CRM & BI"}</span>
              <span className="tag gold">{language === "ru" ? "AI Matching" : "AI Matching"}</span>
              <span className="tag">{language === "ru" ? "Автоматизация" : "Process Automation"}</span>
              <span className="tag">{language === "ru" ? "Сайты на заказ" : "Custom Websites"}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap">
        <hr className="div" />

        {/* ══════════ SERVICES TEASER ══════════ */}
        <section className="section pb-reveal" id="services-teaser" style={{ background: C.bg2, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, margin: "0 -28px", padding: "72px 28px" }}>
          <SectionNumber n="01" />
          <div style={{ maxWidth: 940, margin: "0 auto" }}>
            <div style={{ marginBottom: 32 }}>
              <div className="eyebrow">{language === "ru" ? "Услуги" : "Services"}</div>
              <h2 className="sec-title">
                {language === "ru" ? "AI-системы под ключ" : "AI systems, end to end"}
              </h2>
              <p className="sec-sub">
                {language === "ru" ? "Боты, CRM, BI, дашборды, matching-движки, сайты — с нуля, без платформенной зависимости." : "Bots, CRMs, BI, dashboards, matching engines, websites — built from scratch, no platform lock-in."}
              </p>
            </div>

            <div className="services-mini-grid">
              {([
                { icon: Bot, title: language === "ru" ? "AI-боты" : "AI-Powered Bots", desc: language === "ru" ? "Чат-боты и агенты: квалификация лидов, ответы 24/7, запуск процессов, уведомления. Многоязычны по умолчанию." : "Chatbots and AI agents: lead qualification, 24/7 answers, workflow triggers, structured alerts. Multilingual by default.", price: language === "ru" ? "от $500" : "from $500" },
                { icon: Workflow, title: language === "ru" ? "Автоматизация процессов" : "Process Automation", desc: language === "ru" ? "AI-агенты двигают данные между системами, обрабатывают заявки, запускают действия. Zapier/Make на стероидах." : "AI agents move data between systems, process applications, trigger cross-stack actions. Zapier/Make on steroids.", price: language === "ru" ? "от $1,000" : "from $1,000" },
                { icon: Database, title: language === "ru" ? "Кастомная CRM и BI" : "Custom CRM & BI Systems", desc: language === "ru" ? "Не Notion, не HubSpot. Своя CRM, BI-дашборды, менеджерские панели и matching-движки под ваш pipeline: роли, сделки, история клиента, Telegram." : "Not Notion. Not HubSpot. Your own CRM, BI dashboards, manager panels, and matching engines around your pipeline: roles, deals, client history, Telegram.", price: language === "ru" ? "от $1,500" : "from $1,500" },
                { icon: Globe, title: language === "ru" ? "Сайт на заказ" : "Custom Website", desc: language === "ru" ? "Быстрые, SEO-готовые, многоязычные. В комплекте — AI-бот для лидов с первого дня." : "Fast, SEO-ready, multilingual. Ships with an AI lead bot plugged in from day one.", price: language === "ru" ? "от $800" : "from $800" },
              ] as { icon: React.ElementType; title: string; desc: string; price: string }[]).map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div key={i} initial={{ y: 16 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="pb-card-hover"
                    style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 20, position: "relative" }}>
                    <span aria-hidden="true" style={{
                      position: "absolute", top: 14, right: 16,
                      fontFamily: "var(--font-inconsolata), monospace", fontSize: 9,
                      letterSpacing: "0.14em", color: C.muted,
                    }}>
                      /{String(i + 1).padStart(2, "0")}
                    </span>
                    <div style={{ width: 32, height: 32, background: C.goldDim, border: "1px solid rgba(200,169,110,0.22)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                      <Icon size={15} color={C.gold} />
                    </div>
                    <div style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 6 }}>{card.title}</div>
                    <p style={{ fontFamily: "var(--font-instrument-sans), sans-serif", fontSize: 12, color: C.text2, lineHeight: 1.6, marginBottom: 10 }}>{card.desc}</p>
                    <span style={{ fontFamily: "var(--font-inconsolata), monospace", fontWeight: 700, fontSize: 12, color: C.gold }}>{card.price}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Turnkey flagship banner */}
            <motion.div
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ marginTop: 24 }}
            >
              <div
                className="turnkey-banner"
                style={{
                  display: "block",
                  width: "100%",
                  background: "linear-gradient(135deg, rgba(200,169,110,0.08) 0%, rgba(200,169,110,0.02) 100%)",
                  border: "1px solid rgba(200,169,110,0.35)",
                  borderRadius: 10,
                  padding: "22px 24px",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 0 40px rgba(200,169,110,0.06)",
                }}
              >
                {/* L-bracket corner ticks — cover-image motif. */}
                <span aria-hidden="true" style={{ position: "absolute", top: 8, left: 8, width: 12, height: 12, borderTop: `1px solid ${C.gold}`, borderLeft: `1px solid ${C.gold}` }} />
                <span aria-hidden="true" style={{ position: "absolute", bottom: 8, right: 8, width: 12, height: 12, borderBottom: `1px solid ${C.gold}`, borderRight: `1px solid ${C.gold}` }} />
                <span
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    fontFamily: "var(--font-inconsolata), monospace",
                    fontWeight: 700,
                    fontSize: 9,
                    background: C.gold,
                    color: C.bg,
                    padding: "2px 8px",
                    borderRadius: 4,
                    letterSpacing: "0.12em",
                  }}
                >
                  {language === "ru" ? "ФЛАГМАН" : "FLAGSHIP"}
                </span>
                <div style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 700, fontSize: 18, color: C.heading, marginBottom: 6, paddingRight: 90 }}>
                  {language === "ru" ? "Turnkey: AI-бот + Кастомная CRM + BI" : "Turnkey: AI Bot + Custom CRM + BI"}
                </div>
                <p style={{ fontFamily: "var(--font-instrument-sans), sans-serif", fontSize: 13, color: C.text2, lineHeight: 1.6, marginBottom: 14 }}>
                  {language === "ru"
                    ? "Пять продакшен-систем под ключ: сайт, AI-бот и автоматизация, кастомная CRM, BI и менеджерские дашборды. AI-assisted разработка — готово за 3–14 дней."
                    : "Five production systems, end to end: website, AI bot & automation, custom CRM, BI, and manager dashboards. AI-assisted development — ready in 3–14 days."}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14, fontFamily: "var(--font-inconsolata), monospace", fontWeight: 700, fontSize: 13 }}>
                  <span style={{ color: C.gold }}>
                    {language === "ru" ? "от $3,000" : "from $3,000"}
                  </span>
                  <button
                    type="button"
                    onClick={openIntake}
                    className="btn-primary"
                    style={{
                      background: C.gold,
                      border: `1px solid ${C.gold}`,
                      color: "#07080a",
                      fontFamily: "var(--font-instrument-sans), sans-serif",
                      fontWeight: 600,
                      fontSize: 12,
                      letterSpacing: "0.04em",
                      padding: "8px 18px",
                      borderRadius: 5,
                      cursor: "pointer",
                    }}
                  >
                    {language === "ru" ? "Запросить цену →" : "Get a quote →"}
                  </button>
                  <Link
                    href="/services"
                    className="btn-ghost"
                    style={{
                      border: `1px solid ${C.border}`,
                      borderRadius: 5,
                      color: C.text2,
                      fontFamily: "var(--font-instrument-sans), sans-serif",
                      fontWeight: 500,
                      fontSize: 12,
                      letterSpacing: "0.04em",
                      padding: "8px 18px",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    {language === "ru" ? "Все услуги →" : "All services →"}
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ y: 10 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5 }} style={{ marginTop: 28 }}>
              <CTARow align="center" hidePrimary />
            </motion.div>
          </div>
        </section>

        <hr className="div" />

        {/* ══════════ MENTORSHIP ══════════ */}
        <section className="section pb-reveal" id="mentorship">
          <SectionNumber n="02" />
          <div className="eyebrow">{language === "ru" ? "Менторство" : "Mentorship"}</div>
          <h2 className="sec-title">{language === "ru" ? "Капитал · Бизнес · AI и Автоматизация" : "Capital · Business · AI & Automation"}</h2>
          <p className="sec-sub">{language === "ru" ? "Индивидуальные сессии для предпринимателей и цифровых номадов" : "1-on-1 sessions for entrepreneurs and digital nomads"}</p>

          <div className="mentor-card" onMouseMove={handleMentorMove}>
            {/* Decorative gold rule top-right + 3 terminal dots — cover-image motif. */}
            <span aria-hidden="true" style={{
              position: "absolute", top: 0, right: 0, width: 120, height: 1,
              background: `linear-gradient(270deg, rgba(200,169,110,0.67), transparent)`,
              pointerEvents: "none",
            }} />
            <span aria-hidden="true" style={{
              position: "absolute", top: 14, right: 14, display: "flex", gap: 5,
              pointerEvents: "none", zIndex: 2,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.gold, opacity: 0.7 }} />
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.gold, opacity: 0.5 }} />
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.gold, opacity: 0.3 }} />
            </span>
            <div className="mentor-card-inner">
              <div className="mentor-content">
                <div className="mentor-title">{language === "ru" ? "Прокачайте своё преимущество" : "Accelerate Your Edge"}</div>
                <div className="mentor-desc">
                  {language === "ru"
                    ? "Ищете пассивный доход в крипте без риска, хотите вывести бизнес-идею на рынок или научиться встраивать AI в свои процессы — я помогу разобраться и дать конкретный следующий шаг."
                    : "Whether you are looking for risk-free crypto yield, need help packaging and launching your business idea, or want to embed AI into your workflow — I offer structured, high-agency mentorship to help you break through."}
                </div>
                <div className="mentor-features">
                  <span className="tag gold" style={{ background: "transparent", borderColor: "rgba(200,169,110,0.2)" }}>DeFi Strategy</span>
                  <span className="tag gold" style={{ background: "transparent", borderColor: "rgba(200,169,110,0.2)" }}>Business Positioning</span>
                  <span className="tag gold" style={{ background: "transparent", borderColor: "rgba(200,169,110,0.2)" }}>AI & Automation</span>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 16 }}>
                <Link
                  href="/mentorship"
                  className="btn-primary"
                  style={{ padding: "12px 24px", background: C.gold, border: `1px solid ${C.gold}`, borderRadius: 8, color: "#07080a", fontFamily: "var(--font-instrument-sans), sans-serif", fontSize: 13, fontWeight: 600, textDecoration: "none", display: "inline-block" }}
                >
                  {language === "ru" ? "Узнать подробнее →" : "Explore Programs →"}
                </Link>
                <button
                  type="button"
                  onClick={openMentorshipModal}
                  className="btn-ghost"
                  style={{ padding: "12px 24px", border: `1px solid ${C.border}`, borderRadius: 8, color: C.text2, fontFamily: "var(--font-instrument-sans), sans-serif", fontSize: 13, fontWeight: 500, background: "transparent", cursor: "pointer" }}
                >
                  {language === "ru" ? "Оставить заявку →" : "Drop me a hint →"}
                </button>
              </div>
            </div>
          </div>
        </section>

        <hr className="div" />

        {/* ══════════ PODCASTS & TALKS ══════════ */}
        <section className="section pb-reveal" id="media">
          <SectionNumber n="03" />
          <div className="eyebrow">{language === "ru" ? "Медиа" : "Media"}</div>
          <h2 className="sec-title">{language === "ru" ? "Подкасты и выступления" : "Podcasts & Talks"}</h2>
          <p className="sec-sub">{language === "ru" ? "Разговоры про ReFi, impact-рынки и публичное строительство" : "Conversations on ReFi, impact markets, and building in public"}</p>
          <div className="pod-grid">
            {podcasts.map((p, i) => (
              <a key={i} className="pod-card" href={p.url} target="_blank" rel="noopener noreferrer">
                <div className="pod-thumb">
                  {p.img ? (
                    <Image src={p.img} alt={p.title} fill style={{ objectFit: "cover", zIndex: 0 }} sizes="(max-width:520px) 100vw, 50vw" />
                  ) : p.ytId ? (
                    <Image
                      src={`https://img.youtube.com/vi/${p.ytId}/maxresdefault.jpg`}
                      alt={p.title}
                      fill
                      style={{ objectFit: "cover", zIndex: 0 }}
                      sizes="(max-width:520px) 100vw, 50vw"
                    />
                  ) : null}
                  <div className="pod-overlay" />
                  <span className="pod-ep">{p.ep}</span>
                  <div className="pod-play">▶</div>
                </div>
                <div className="pod-body">
                  <div className="pod-src">{p.src}</div>
                  <div className="pod-title">
                    {p.title}
                    <span className="pod-ext">↗</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <hr className="div" />

        {/* ══════════ WRITING ══════════ */}
        <section className="section pb-reveal" id="writing">
          <SectionNumber n="04" />
          <div className="eyebrow">{language === "ru" ? "Статьи" : "Writing"}</div>
          <h2 className="sec-title">{language === "ru" ? "Статьи и заметки" : "Articles & Insights"}</h2>
          <p className="sec-sub">{language === "ru" ? "Про impact-рынки, health tech и публичное строительство" : "On impact markets, health tech, and building in public"}</p>
          {(() => {
            // Editorial layout — 1 featured + up to 3 stacked.
            const items = blogPosts.length > 0 ? blogPosts : (articles.slice(0, 4) as unknown as Post[]);
            const formatItemDate = (date: string) =>
              new Date(date).toLocaleDateString(language === "ru" ? "ru-RU" : "en-US", { month: "short", year: "numeric" });
            const featured = items[0];
            const rest = items.slice(1, 4);

            const renderCard = (item: Post, opts: { featured?: boolean }) => {
              const fresh = isNew(item.date);
              const date = formatItemDate(item.date);
              const isExternal = !("slug" in item) || !item.slug;
              const cardProps = {
                className: `write-card${fresh ? " write-card-new" : ""}${opts.featured ? " write-featured" : ""}`,
                style: { textDecoration: "none" as const, color: "inherit" as const, display: "block" as const, position: "relative" as const },
              };
              const inner = (
                <>
                  {fresh && (
                    <span className="write-new" style={{ position: "absolute", top: opts.featured ? 14 : 12, right: opts.featured ? 14 : 12, color: C.sage, borderColor: `rgba(122,171,143,0.30)`, background: `rgba(122,171,143,0.10)` }}>
                      <span className="write-new-dot" style={{ background: C.sage }} />
                      NEW
                    </span>
                  )}
                  <div className="write-src" style={{ marginBottom: opts.featured ? 14 : 8 }}>
                    <span className="write-dot" style={{ background: C.gold }} />
                    <span style={{ color: C.gold }}>paulburg.com</span>
                  </div>
                  <div className="write-title" style={{ fontSize: opts.featured ? 26 : 15, lineHeight: opts.featured ? 1.18 : 1.3, marginBottom: opts.featured ? 12 : 6 }}>
                    {item.title}
                  </div>
                  <p className="write-excerpt" style={{ fontSize: opts.featured ? 14 : 12, marginBottom: opts.featured ? 18 : 10 }}>{item.excerpt}</p>
                  <div className="write-foot">
                    <span>{date}</span>
                    <span className="write-read">{language === "ru" ? "Читать →" : "Read →"}</span>
                  </div>
                </>
              );
              return isExternal ? (
                <a {...cardProps} href={(item as unknown as { url: string }).url} target="_blank" rel="noopener noreferrer">{inner}</a>
              ) : (
                <Link {...cardProps} href={`/blog/${item.slug}`}>{inner}</Link>
              );
            };

            return (
              <div className="write-grid">
                {featured && renderCard(featured, { featured: true })}
                <div className="write-list">
                  {rest.map((p, i) => <React.Fragment key={i}>{renderCard(p, {})}</React.Fragment>)}
                </div>
              </div>
            );
          })()}
          <div style={{ textAlign: "center", marginBottom: "14px" }}>
            <Link href="/blog" className="btn-ghost" style={{ margin: "0 auto", fontSize: "12px", padding: "8px 20px", textDecoration: "none", display: "inline-flex" }}>
              {language === "ru" ? "Все статьи →" : "View all articles →"}
            </Link>
          </div>
        </section>

        <hr className="div" />

        {/* ══════════ FOLLOW THE JOURNEY ══════════ */}
        <section className="section pb-reveal" id="follow">
          <SectionNumber n="05" />
          <div className="eyebrow">{language === "ru" ? "Контакты" : "Connect"}</div>
          <h2 className="sec-title">{language === "ru" ? "Следить за журналом" : "Follow the Journey"}</h2>
          <p className="sec-sub">{language === "ru" ? "Выберите формат и язык" : "Choose your format and language"}</p>

          <div className="follow-grid">
            <div className="follow-card pb-card-hover" style={{ position: "relative", overflow: "hidden" }}>
              {/* Decorative envelope SVG top-right */}
              <svg aria-hidden="true" width="48" height="32" viewBox="0 0 48 32" fill="none" style={{ position: "absolute", top: 18, right: 18, opacity: 0.6 }}>
                <rect x="2" y="4" width="44" height="26" rx="2" stroke={C.gold} strokeWidth="1" />
                <path d="M3 6 L24 18 L45 6" stroke={C.gold} strokeWidth="1" />
              </svg>
              <div className="follow-title">{language === "ru" ? "Рассылка" : "Newsletter"}</div>
              <p className="follow-desc">
                {language === "ru"
                  ? "Заметки фаундера про impact-рынки, health tech, AI-инструменты и жизнь цифрового номада. На английском."
                  : "Founder notes on impact markets, health tech, AI tools, and life as a digital nomad. In English."}
              </p>
              <a href="https://paulburg.substack.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <button className="btn-gold" style={{ width: "100%", justifyContent: "center" }}>
                  {language === "ru" ? "Подписаться на Substack →" : "Subscribe on Substack →"}
                </button>
              </a>
            </div>

            <div className="follow-card pb-card-hover" style={{ position: "relative", overflow: "hidden" }}>
              {/* Decorative telegram-style SVG top-right */}
              <svg aria-hidden="true" width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ position: "absolute", top: 18, right: 18, opacity: 0.55 }}>
                <circle cx="20" cy="20" r="18" stroke={C.gold} strokeWidth="1" />
                <path d="M10 20 L18 24 L24 14 L18 22 L18 28 L21 25" stroke={C.gold} strokeWidth="1" fill="none" strokeLinejoin="round" />
              </svg>
              <div className="follow-title" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                Telegram Channel
                <span style={{
                  fontFamily: "var(--font-inconsolata), monospace", fontSize: 9, padding: "2px 7px", borderRadius: 3,
                  background: "rgba(155,142,196,0.12)", color: C.violet, border: "1px solid rgba(155,142,196,0.33)",
                  letterSpacing: "0.14em", fontWeight: 700,
                }}>RU</span>
              </div>
              <p className="follow-desc">
                Русскоязычный канал о жизни цифрового кочевника, технологиях и Web3. Без фильтров.
              </p>
              <a href="https://t.me/nomadglobalview" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <button className="btn-ghost" style={{ width: "100%", justifyContent: "center", color: C.text }}>
                  Подписаться →
                </button>
              </a>
            </div>
          </div>
        </section>

        <hr className="div" />

        {/* ══════════ PROJECTS ══════════ */}
        <section className="section pb-reveal" id="projects">
          <SectionNumber n="06" />
          <div className="eyebrow">{language === "ru" ? "Проекты" : "Projects"}</div>
          <h2 className="sec-title">{language === "ru" ? "Что я строю" : "What I Build"}</h2>
          <p className="sec-sub">{language === "ru" ? "Стартапы и инициативы в impact, health и локальной инфраструктуре" : "Startups and initiatives across impact, health, and local infrastructure"}</p>

          <div className="cat-head">
            <div className="cat-tick" style={{ background: C.sage }} />
            <span style={{ color: C.sage }}>01 — Impact & Public Goods Ecosystem</span>
          </div>
          <div className="proj-grid">
            {projects.impact.map((p, i) => (
              <a key={i} className="proj-card" href={p.url} target="_blank" rel="noopener noreferrer">
                <span className={`status ${p.status === "live" ? "st-live" : p.status === "active" ? "st-active" : p.status === "paused" ? "st-paused" : "st-dev"}`}>
                  {p.status}
                </span>
                <div className="proj-name">{p.name}</div>
                <div className="proj-desc">{p.desc}</div>
              </a>
            ))}
          </div>

          <div className="cat-head">
            <div className="cat-tick" style={{ background: "var(--c-sage)" }} />
            <span style={{ color: "var(--c-sage)" }}>02 — NGO Impact Products · Proof of Concept</span>
          </div>
          <div className="proj-grid">
            {projects.ngo.map((p, i) => (
              <a key={i} className="proj-card" href={p.url} target="_blank" rel="noopener noreferrer">
                <span className="status st-live">live</span>
                <div className="proj-name">{p.name}</div>
                <div className="proj-desc">{p.desc}</div>
              </a>
            ))}
          </div>

          <div className="cat-head">
            <div className="cat-tick" style={{ background: C.gold }} />
            <span style={{ color: C.gold }}>03 — Phangan Ecosystem · Local Infrastructure & AI Tools</span>
          </div>
          <div className="proj-grid">
            {projects.phangan.map((p, i) => (
              <a key={i} className="proj-card" href={p.url} target="_blank" rel="noopener noreferrer">
                <span className="status st-dev">dev</span>
                <div className="proj-name">{p.name}</div>
                <div className="proj-desc">{p.desc}</div>
              </a>
            ))}
          </div>

          <div className="cat-head">
            <div className="cat-tick" style={{ background: C.violet }} />
            <span style={{ color: C.violet }}>04 — Health & Privacy Technology</span>
          </div>
          <div className="proj-grid" style={{ gridTemplateColumns: "1fr" }}>
            {projects.health.map((p, i) => (
              <a key={i} className="proj-card" href={p.url} target="_blank" rel="noopener noreferrer">
                <span className="status st-dev">dev</span>
                <div className="proj-name" style={{ fontSize: "15px", paddingRight: 60 }}>{p.name}</div>
                <div className="proj-desc" style={{ fontSize: "12px", maxWidth: "560px" }}>{p.desc}</div>
              </a>
            ))}
          </div>
        </section>

        <hr className="div" />

        {/* ══════════ COMMUNITIES ══════════ */}
        <section className="section pb-reveal" id="communities" style={{ background: C.bg2, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, margin: "0 -28px", padding: "72px 28px" }}>
          <SectionNumber n="07" />
          <div className="eyebrow">{language === "ru" ? "Сообщества" : "Communities"}</div>
          <h2 className="sec-title">{language === "ru" ? "Локальная Web3-экосистема" : "Local Web3 Ecosystem"}</h2>
          <p className="sec-sub">{language === "ru" ? "Регенеративная инфраструктура и децентрализованная координация на Ко Панган" : "Building regenerative infrastructure and decentralized coordination on Koh Phangan"}</p>

          <div className="proj-grid" style={{ marginBottom: "24px" }}>
            {communities.map((c, i) => (
              <a key={i} className="proj-card" href={c.url} target="_blank" rel="noopener noreferrer">
                <span className="status st-live">active</span>
                <div className="proj-name" style={{ fontSize: "16px", color: c.color }}>{c.name}</div>
                <div className="proj-desc" style={{ fontSize: "13px" }}>{c.desc}</div>
              </a>
            ))}
          </div>

          <div className="cat-head">
            <div className="cat-tick" style={{ background: C.gold }} />
            <span style={{ color: C.gold }}>{language === "ru" ? "События и встречи" : "Events & Gatherings"}</span>
          </div>
          <div className="proj-grid">
            {communityEvents.map((e, i) => (
              <a key={i} className="proj-card" href={e.url} target="_blank" rel="noopener noreferrer">
                <div className="write-src" style={{ marginBottom: "6px" }}>
                  <span className="write-dot" style={{ background: C.gold }} />
                  <span style={{ color: C.gold }}>{e.src}</span>
                </div>
                <div className="proj-name" style={{ fontSize: "14px", paddingRight: 0 }}>{e.name}</div>
                <div style={{ fontFamily: "var(--font-inconsolata),monospace", fontSize: "10px", color: C.faint, marginTop: "12px" }}>
                  <span className="write-read">{language === "ru" ? "Открыть в X →" : "View on X →"}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <hr className="div" />

        {/* ══════════ ABOUT ══════════ */}
        <section className="section pb-reveal" id="about">
          <SectionNumber n="08" />
          <div className="eyebrow">{language === "ru" ? "О себе" : "About"}</div>
          <h2 className="sec-title">{language === "ru" ? "Кто я" : "Who I Am"}</h2>
          <div className="about-layout">
            <div className="photo-frame">
              <Image src="/hero.webp" alt="Paul Burg" width={600} height={745} priority style={{ width: "100%", height: "auto" }} />
            </div>
            <div>
              <div className="about-tags">
                <span className="tag tag-icon">
                  <Bot size={13} strokeWidth={1.4} aria-hidden="true" />
                  {language === "ru" ? "AI-Assisted разработка" : "AI-Assisted Development"}
                </span>
                <span className="tag tag-icon">
                  <Lightbulb size={13} strokeWidth={1.4} aria-hidden="true" />
                  {language === "ru" ? "Серийный предприниматель" : "Serial Entrepreneur"}
                </span>
                <span className="tag tag-icon">
                  <Coffee size={13} strokeWidth={1.4} aria-hidden="true" />
                  {language === "ru" ? "Кофе и код" : "Coffee & Code"}
                </span>
              </div>
              <div className="about-bio">
                {language === "ru" ? (
                  <>
                    <p>
                      Предприниматель с 2011 года, строю бизнесы в разных отраслях и странах. Последний год полностью сфокусирован на AI-assisted разработке — проектирую и запускаю продакшн-системы: чат-боты, CRM и BI-дашборды, автоматизированные процессы, matching-движки и веб-платформы.
                    </p>
                    <p>
                      Работаю на стыке продуктового мышления и AI-исполнения — формирую архитектуру, оркестрирую сборку с AI-инструментами и несу ответственность за результат от начала до конца.
                    </p>
                    <p>
                      До этого: управление международными цепочками поставок в Азии, Web3 public goods, медиастартапы в России. Академический фон — экологические науки.
                    </p>
                    <p>
                      Работаю удалённо, действую глобально, сотрудничаю с бизнесами и фаундерами из разных отраслей и часовых поясов.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Entrepreneur since 2011, building across industries and continents. For the past year, fully focused on AI-assisted development — designing and shipping production systems: chatbots, CRMs and BI dashboards, automated workflows, matching engines, and full web platforms.
                    </p>
                    <p>
                      I work at the intersection of product thinking and AI execution — I scope the architecture, orchestrate the build with AI tools, and own the delivery end-to-end.
                    </p>
                    <p>
                      Previously: international supply chain management across Asia, Web3 public goods, media startups in Russia. Environmental science background.
                    </p>
                    <p>
                      Work remotely, operate globally, collaborate with businesses and founders across different industries and time zones.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ FOOTER ══════════ */}
      </div>
      <Footer />
    </>
  );
}
