"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Bot, Workflow, Database, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import CTARow from "@/components/CTARow";
import Footer from "@/components/Footer";
import { WHATSAPP_URL } from "@/lib/constants";
import { useIntakeModal } from "@/context/IntakeModalContext";
import { useMentorshipModal } from "@/context/MentorshipModalContext";
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

*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{
  background:${C.bg};color:${C.text};
  font-family:var(--font-instrument-sans),sans-serif;
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
  height:auto;padding:140px 28px 72px;
  display:grid;grid-template-columns:1fr;
  align-items:center;position:relative;
  max-width:940px;margin:0 auto;
}
.hero-rules{display:none}
.hero-kicker{
  font-family:var(--font-inconsolata),monospace;
  font-size:11px;letter-spacing:0.2em;text-transform:uppercase;
  color:${C.gold};margin-bottom:24px;
  display:flex;align-items:center;gap:12px;
}
.hero-kicker::before{content:'';width:32px;height:1px;background:${C.gold};opacity:0.6}
.hero-name{
  font-family:var(--font-fraunces),serif;
  font-feature-settings:"ss01","liga","kern";
  font-size:clamp(64px,10vw,108px);
  font-weight:700;line-height:0.9;
  letter-spacing:-0.02em;color:${C.heading};
  margin-bottom:28px;
}
.hero-name em{
  font-style:italic;
  color:transparent;
  -webkit-text-stroke:1.5px rgba(200,169,110,0.7);
}
.hero-roles{
  font-family:var(--font-inconsolata),monospace;
  font-size:12px;letter-spacing:0.12em;
  color:${C.text};margin-bottom:20px;
  text-transform:uppercase;
}
.hero-desc{
  font-family:var(--font-newsreader),serif;
  font-style:italic;
  font-size:18px;color:var(--c-body-lede);
  max-width:480px;line-height:1.75;
  margin-bottom:36px;
}
.hero-desc strong{color:${C.text};font-weight:500}
.tags{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:40px}
.tag{
  padding:5px 12px;border-radius:4px;
  font-family:var(--font-inconsolata),monospace;
  font-size:11px;letter-spacing:0.07em;
  border:1px solid rgba(200,169,110,0.4);color:${C.text};
}
.tag.gold{border-color:rgba(200,169,110,0.5);color:${C.gold};background:rgba(200,169,110,0.05)}
.tag.sage{border-color:rgba(122,171,143,0.3);color:${C.sage};background:rgba(122,171,143,0.05)}
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
.section{padding:72px 0}
.eyebrow{
  font-family:var(--font-inconsolata),monospace;
  font-size:10px;letter-spacing:0.22em;text-transform:uppercase;
  color:${C.gold};margin-bottom:10px;
  display:flex;align-items:center;gap:14px;
}
.eyebrow::after{content:'';flex:1;height:1px;background:${C.border}}
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
.pod-card:hover .pod-play{background:rgba(200,169,110,0.3);box-shadow:0 0 16px rgba(200,169,110,0.3)}

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

/* ── WRITING CARDS ── */
.write-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px}
@media(max-width:580px){.write-grid{grid-template-columns:1fr}}
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
.st-dev{background:rgba(200,169,110,0.08);color:${C.gold};border:1px solid rgba(200,169,110,0.2)}

/* Wide card */
.proj-card.wide{grid-column:1/-1;display:flex;align-items:flex-start;gap:16px}
.proj-card.wide .proj-name{padding-right:0;font-size:14px}
.proj-card.wide .proj-desc{font-size:12px}

/* ── ABOUT ── */
.about-layout{display:grid;grid-template-columns:180px 1fr;gap:36px;align-items:start}
@media(max-width:580px){.about-layout{grid-template-columns:1fr}}
.photo-frame{
  width:180px;flex-shrink:0;
  border-radius:8px;overflow:hidden;
  border:1px solid ${C.border2};aspect-ratio:4/5;
  background:${C.card};
  display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:8px;
}
.photo-frame img{width:100%;height:100%;object-fit:cover;object-position:top}
.photo-placeholder{
  text-align:center;
  font-family:var(--font-inconsolata),monospace;
  font-size:10px;letter-spacing:0.1em;color:${C.faint};
  padding:16px;
}
.about-tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px}
.about-bio p{font-size:13px;color:${C.muted};line-height:1.8;margin-bottom:11px}
.about-bio p:first-child{color:${C.text2};font-size:14px}
.about-bio strong{color:${C.text3};font-weight:500}

/* ── FOOTER ── */
.footer{
  border-top:1px solid ${C.border};
  padding:36px 0;
  display:flex;align-items:center;justify-content:space-between;
  gap:24px;
}
@media(max-width:768px){
  .footer{flex-direction:column;align-items:flex-start;gap:20px}
}
.footer-brand{
  font-family:var(--font-fraunces),serif;
  font-size:18px;font-weight:700;color:${C.text};letter-spacing:-0.01em;
}
.footer-year{font-size:11px;color:${C.faint};margin-top:3px;font-family:var(--font-inconsolata),monospace}
.footer-links{display:flex;gap:14px;flex-wrap:wrap}
.flink{
  font-family:var(--font-inconsolata),monospace;font-size:11px;
  color:${C.subtle};cursor:pointer;transition:color 0.15s;
  letter-spacing:0.06em;text-transform:uppercase;text-decoration:none;
}
.flink:hover{color:${C.gold}}

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

export default function HomePageClient({ latestPosts }: HomePageClientProps) {
  const { language } = useLanguage();
  const { open: openIntake } = useIntakeModal();
  const { open: openMentorshipModal } = useMentorshipModal();

  const blogPosts = latestPosts?.[language] ?? latestPosts?.en ?? [];
  const visible = blogPosts.length > 0 ? blogPosts : articles.slice(0, 3);

  return (
    <>
      <style>{CSS}</style>
      <div className="ambient" />

      <Navbar />

      {/* ══════════ HERO ══════════ */}
      <div className="hero">
        <div className="hero-rules"/>
        <div>
          <div className="hero-kicker">{language === "ru" ? "Сейчас в Да Нанге, Вьетнам" : "Currently in Da Nang, Vietnam"}</div>
          <h1 className="hero-name">Paul<br/><em>Burg</em></h1>
          <p className="hero-roles">{language === "ru" ? "AI-ASSISTED РАЗРАБОТКА · СЕРИЙНЫЙ ПРЕДПРИНИМАТЕЛЬ · КОФЕ И КОД" : "AI-ASSISTED DEVELOPMENT · SERIAL ENTREPRENEUR · COFFEE & CODE"}</p>
          <p className="hero-desc">
            {language === "ru"
              ? "Проектирую и запускаю AI-системы для бизнеса — боты, CRM, автоматизация, сайты. С нуля под ваш процесс. Не шаблон. Не no-code. Готово за дни."
              : "I design and ship AI-powered systems for businesses — bots, CRMs, automation, websites. Built from scratch around your process. Not a template. Not a no-code tool. Ready in days."}
          </p>
          <div className="tags">
            <span className="tag gold">{language === "ru" ? "AI-боты" : "AI Bots"}</span>
            <span className="tag gold">{language === "ru" ? "CRM-системы" : "CRM Systems"}</span>
            <span className="tag gold">{language === "ru" ? "Автоматизация процессов" : "Process Automation"}</span>
            <span className="tag">{language === "ru" ? "Сайты на заказ" : "Custom Websites"}</span>
            <span className="tag">{language === "ru" ? "AI-Assisted разработка" : "AI-Assisted Development"}</span>
          </div>
        </div>
      </div>

      <div className="wrap">
        <hr className="div"/>

        {/* ══════════ SERVICES TEASER ══════════ */}
        <section className="section" id="services-teaser" style={{ background: C.bg2, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, margin: "0 -28px", padding: "72px 28px" }}>
          <div style={{ maxWidth: 940, margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: 32 }}>
              <div className="eyebrow">SERVICES</div>
              <h2 className="sec-title">
                {language === "ru" ? "AI-системы под ключ" : "AI systems, end to end"}
              </h2>
              <p className="sec-sub">
                {language === "ru" ? "Боты, CRM, сайты — с нуля, без платформенной зависимости." : "Bots, CRMs, websites — built from scratch, no platform lock-in."}
              </p>
            </motion.div>

            <div className="services-mini-grid">
              {([
                { icon: Bot, title: language === "ru" ? "AI-боты" : "AI-Powered Bots", desc: language === "ru" ? "Чат-боты и агенты: квалификация лидов, ответы 24/7, запуск процессов, уведомления. Многоязычны по умолчанию." : "Chatbots and AI agents: lead qualification, 24/7 answers, workflow triggers, structured alerts. Multilingual by default.", price: language === "ru" ? "от $500" : "from $500" },
                { icon: Workflow, title: language === "ru" ? "Автоматизация процессов" : "Process Automation", desc: language === "ru" ? "AI-агенты двигают данные между системами, обрабатывают заявки, запускают действия. Zapier/Make на стероидах." : "AI agents move data between systems, process applications, trigger cross-stack actions. Zapier/Make on steroids.", price: language === "ru" ? "от $1,000" : "from $1,000" },
                { icon: Database, title: language === "ru" ? "Кастомная CRM" : "Custom CRM", desc: language === "ru" ? "Не Notion, не HubSpot. Своя CRM под ваш pipeline: роли, сделки, история клиента, Telegram." : "Not Notion. Not HubSpot. Your own CRM around your pipeline: roles, deals, client history, Telegram.", price: language === "ru" ? "от $1,500" : "from $1,500" },
                { icon: Globe, title: language === "ru" ? "Сайт на заказ" : "Custom Website", desc: language === "ru" ? "Быстрые, SEO-готовые, многоязычные. В комплекте — AI-бот для лидов с первого дня." : "Fast, SEO-ready, multilingual. Ships with an AI lead bot plugged in from day one.", price: language === "ru" ? "от $800" : "from $800" },
              ] as { icon: React.ElementType; title: string; desc: string; price: string }[]).map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                    style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 20, position: "relative" }}>
                    <div style={{ width: 32, height: 32, background: C.goldDim, border: "1px solid rgba(200,169,110,0.22)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                      <Icon size={15} color={C.gold} />
                    </div>
                    <div style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 5 }}>{card.title}</div>
                    <p style={{ fontFamily: "var(--font-instrument-sans), sans-serif", fontSize: 12, color: C.text2, lineHeight: 1.6, marginBottom: 10 }}>{card.desc}</p>
                    <span style={{ fontFamily: "var(--font-inconsolata), monospace", fontWeight: 700, fontSize: 12, color: C.gold }}>{card.price}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Turnkey flagship banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
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
                  boxShadow: "0 0 40px rgba(200,169,110,0.06)",
                }}
              >
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
                    letterSpacing: "0.08em",
                  }}
                >
                  {language === "ru" ? "ФЛАГМАН" : "FLAGSHIP"}
                </span>
                <div style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 700, fontSize: 18, color: C.heading, marginBottom: 6, paddingRight: 90 }}>
                  {language === "ru" ? "Turnkey: Сайт + Бот + CRM" : "Turnkey: Website + Bot + CRM"}
                </div>
                <p style={{ fontFamily: "var(--font-instrument-sans), sans-serif", fontSize: 13, color: C.text2, lineHeight: 1.6, marginBottom: 14 }}>
                  {language === "ru"
                    ? "Полная система под ключ. AI-ассистированная разработка, готова за 3–14 дней."
                    : "Complete system, end to end. AI-assisted development, ready in 3–14 days."}
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

            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} style={{ marginTop: 28 }}>
              <CTARow align="center" hidePrimary />
            </motion.div>
          </div>
        </section>

        <hr className="div"/>

        {/* ══════════ MENTORSHIP ══════════ */}
        <section className="section" id="mentorship">
          <div className="eyebrow">{language === "ru" ? "Менторство" : "Mentorship"}</div>
          <h2 className="sec-title">{language === "ru" ? "Капитал · Бизнес · AI и Автоматизация" : "Capital · Business · AI & Automation"}</h2>
          <p className="sec-sub">{language === "ru" ? "Индивидуальные сессии для предпринимателей и цифровых номадов" : "1-on-1 sessions for entrepreneurs and digital nomads"}</p>

          <div className="mentor-card">
            <div className="mentor-card-inner">
              <div className="mentor-content">
                <div className="mentor-title">{language === "ru" ? "Прокачайте своё преимущество" : "Accelerate Your Edge"}</div>
                <div className="mentor-desc">
                  {language === "ru"
                    ? "Ищете пассивный доход в крипте без риска, хотите вывести бизнес-идею на рынок или научиться встраивать AI в свои процессы — я помогу разобраться и дать конкретный следующий шаг."
                    : "Whether you are looking for risk-free crypto yield, need help packaging and launching your business idea, or want to embed AI into your workflow — I offer structured, high-agency mentorship to help you break through."}
                </div>
                <div className="mentor-features">
                  <span className="tag gold" style={{background:"transparent",borderColor:"rgba(200,169,110,0.2)"}}>DeFi Strategy</span>
                  <span className="tag gold" style={{background:"transparent",borderColor:"rgba(200,169,110,0.2)"}}>Business Positioning</span>
                  <span className="tag gold" style={{background:"transparent",borderColor:"rgba(200,169,110,0.2)"}}>AI & Automation</span>
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

        <hr className="div"/>

        {/* ══════════ PODCASTS & TALKS ══════════ */}
        <section className="section" id="media">
          <div className="eyebrow">Media</div>
          <h2 className="sec-title">Podcasts & Talks</h2>
          <p className="sec-sub">Conversations on ReFi, impact markets, and building in public</p>
          <div className="pod-grid">
            {podcasts.map((p,i)=>(
              <a key={i} className="pod-card" href={p.url} target="_blank" rel="noopener noreferrer">
                <div className="pod-thumb">
                  {p.img ? (
                    <Image src={p.img} alt={p.title} fill style={{objectFit:"cover",zIndex:0}} sizes="(max-width:520px) 100vw, 50vw" />
                  ) : p.ytId ? (
                    <Image
                      src={`https://img.youtube.com/vi/${p.ytId}/maxresdefault.jpg`}
                      alt={p.title}
                      fill
                      style={{objectFit:"cover",zIndex:0}}
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

        <hr className="div"/>

        {/* ══════════ WRITING ══════════ */}
        <section className="section" id="writing">
          <div className="eyebrow">Writing</div>
          <h2 className="sec-title">Articles & Insights</h2>
          <p className="sec-sub">On impact markets, health tech, and building in public</p>
          <div className="write-grid">
            {blogPosts.length > 0
              ? blogPosts.map((post, i) => {
                  const fresh = isNew(post.date);
                  const formattedDate = new Date(post.date).toLocaleDateString(
                    language === "ru" ? "ru-RU" : "en-US",
                    { month: "short", year: "numeric" }
                  );
                  return (
                    <Link key={i} href={`/blog/${post.slug}`} className={`write-card${fresh ? " write-card-new" : ""}`} style={{textDecoration:"none",color:"inherit",display:"block"}}>
                      <div className="write-src">
                        <span className="write-dot" style={{background:C.gold}}/>
                        <span style={{color:C.gold}}>paulburg.com</span>
                        {fresh && (
                          <span className="write-new">
                            <span className="write-new-dot"/>
                            NEW
                          </span>
                        )}
                      </div>
                      <div className="write-title">{post.title}</div>
                      <div className="write-excerpt">{post.excerpt}</div>
                      <div className="write-foot">
                        <span>{formattedDate}</span>
                        <span className="write-read">{language === "ru" ? "Читать →" : "Read →"}</span>
                      </div>
                    </Link>
                  );
                })
              : visible.map((a,i)=>(
                <a key={i} className="write-card" href={(a as {url:string}).url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",color:"inherit"}}>
                  <div className="write-src">
                    <span className="write-dot" style={{background:(a as {color:string}).color}}/>
                    <span style={{color:(a as {color:string}).color}}>{(a as {src:string}).src}</span>
                  </div>
                  <div className="write-title">{a.title}</div>
                  <div className="write-excerpt">{(a as {excerpt:string}).excerpt}</div>
                  <div className="write-foot">
                    <span>{(a as {date:string}).date}</span>
                    <span className="write-read">Read →</span>
                  </div>
                </a>
              ))
            }
          </div>
          <div style={{textAlign:"center",marginBottom:"14px"}}>
            <Link href="/blog" className="btn-ghost" style={{margin:"0 auto",fontSize:"12px",padding:"8px 20px",textDecoration:"none",display:"inline-flex"}}>
              View all articles →
            </Link>
          </div>
        </section>

        <hr className="div"/>

        {/* ══════════ FOLLOW THE JOURNEY ══════════ */}
        <section className="section" id="follow">
          <div className="eyebrow">Connect</div>
          <h2 className="sec-title">Follow the Journey</h2>
          <p className="sec-sub">Choose your format and language</p>
          
          <div className="follow-grid">
            <div className="follow-card">
              <div className="follow-title">Newsletter</div>
              <p className="follow-desc">
                Founder notes on impact markets, health tech, AI tools, and life as a digital nomad. In English.
              </p>
              <a href="https://paulburg.substack.com" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                <button className="btn-gold" style={{width:"100%", justifyContent:"center"}}>
                  Subscribe on Substack →
                </button>
              </a>
            </div>

            <div className="follow-card">
              <div className="follow-title">Telegram Channel <span className="badge-ru">RU</span></div>
              <p className="follow-desc">
                Русскоязычный канал о жизни цифрового кочевника, технологиях и Web3. Без фильтров.
              </p>
              <a href="https://t.me/nomadglobalview" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                <button className="btn-ghost" style={{width:"100%", justifyContent:"center", color:C.text}}>
                  Подписаться →
                </button>
              </a>
            </div>
          </div>
        </section>

        <hr className="div"/>

        {/* ══════════ PROJECTS ══════════ */}
        <section className="section" id="projects">
          <div className="eyebrow">Projects</div>
          <h2 className="sec-title">What I Build</h2>
          <p className="sec-sub">Startups and initiatives across impact, health, and local infrastructure</p>

          <div className="cat-head">
            <div className="cat-tick" style={{background:C.sage}}/>
            <span style={{color:C.sage}}>Impact & Public Goods Ecosystem</span>
          </div>
          <div className="proj-grid">
            {projects.impact.map((p,i)=>(
              <a key={i} className="proj-card" href={p.url} target="_blank" rel="noopener noreferrer">
                <span className={`status ${p.status==="live"?"st-live":p.status==="active"?"st-active":p.status==="paused"?"st-paused":"st-dev"}`}>
                  {p.status}
                </span>
                <div className="proj-name">{p.name}</div>
                <div className="proj-desc">{p.desc}</div>
              </a>
            ))}
          </div>

          <div className="cat-head">
            <div className="cat-tick" style={{background:"var(--c-sage)"}}/>
            <span style={{color:"var(--c-sage)"}}>NGO Impact Products · Proof of Concept</span>
          </div>
          <div className="proj-grid">
            {projects.ngo.map((p,i)=>(
              <a key={i} className="proj-card" href={p.url} target="_blank" rel="noopener noreferrer">
                <span className="status st-live">live</span>
                <div className="proj-name">{p.name}</div>
                <div className="proj-desc">{p.desc}</div>
              </a>
            ))}
          </div>

          <div className="cat-head">
            <div className="cat-tick" style={{background:C.gold}}/>
            <span style={{color:C.gold}}>Phangan Ecosystem · Local Infrastructure & AI Tools</span>
          </div>
          <div className="proj-grid">
            {projects.phangan.map((p,i)=>(
              <a key={i} className="proj-card" href={p.url} target="_blank" rel="noopener noreferrer">
                <span className="status st-dev">dev</span>
                <div className="proj-name">{p.name}</div>
                <div className="proj-desc">{p.desc}</div>
              </a>
            ))}
          </div>

          <div className="cat-head">
            <div className="cat-tick" style={{background:C.violet}}/>
            <span style={{color:C.violet}}>Health & Privacy Technology</span>
          </div>
          <div className="proj-grid" style={{gridTemplateColumns:"1fr"}}>
            {projects.health.map((p,i)=>(
              <a key={i} className="proj-card" href={p.url} target="_blank" rel="noopener noreferrer">
                <span className="status st-dev">dev</span>
                <div className="proj-name" style={{fontSize:"15px",paddingRight:60}}>{p.name}</div>
                <div className="proj-desc" style={{fontSize:"12px",maxWidth:"560px"}}>{p.desc}</div>
              </a>
            ))}
          </div>
        </section>

        <hr className="div"/>

        {/* ══════════ COMMUNITIES ══════════ */}
        <section className="section" id="communities">
          <div className="eyebrow">Communities</div>
          <h2 className="sec-title">Local Web3 Ecosystem</h2>
          <p className="sec-sub">Building regenerative infrastructure and decentralized coordination on Koh Phangan</p>

          <div className="proj-grid" style={{marginBottom: "24px"}}>
            {communities.map((c,i)=>(
              <a key={i} className="proj-card" href={c.url} target="_blank" rel="noopener noreferrer">
                <span className="status st-live">active</span>
                <div className="proj-name" style={{fontSize:"16px", color: c.color}}>{c.name}</div>
                <div className="proj-desc" style={{fontSize:"13px"}}>{c.desc}</div>
              </a>
            ))}
          </div>

          <div className="cat-head">
            <div className="cat-tick" style={{background:C.gold}}/>
            <span style={{color:C.gold}}>Events & Gatherings</span>
          </div>
          <div className="proj-grid">
            {communityEvents.map((e,i)=>(
              <a key={i} className="proj-card" href={e.url} target="_blank" rel="noopener noreferrer">
                <div className="write-src" style={{marginBottom: "6px"}}>
                  <span className="write-dot" style={{background:C.gold}}/>
                  <span style={{color:C.gold}}>{e.src}</span>
                </div>
                <div className="proj-name" style={{fontSize:"14px", paddingRight: 0}}>{e.name}</div>
                <div style={{fontFamily:"var(--font-inconsolata),monospace",fontSize:"10px",color:C.faint,marginTop:"12px"}}>
                  <span className="write-read">View on X →</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <hr className="div"/>

        {/* ══════════ ABOUT ══════════ */}
        <section className="section" id="about">
          <div className="eyebrow">About</div>
          <h2 className="sec-title">Who I Am</h2>
          <div className="about-layout">
            <div className="photo-frame">
              <Image src="/hero.webp" alt="Paul Burg" width={600} height={745} priority style={{width:"100%",height:"auto"}} />
            </div>
            <div>
              <div className="about-tags">
                <span className="tag">{language === "ru" ? "AI-Assisted разработка" : "AI-Assisted Development"}</span>
                <span className="tag">{language === "ru" ? "Серийный предприниматель" : "Serial Entrepreneur"}</span>
                <span className="tag">{language === "ru" ? "Кофе и код" : "Coffee & Code"}</span>
              </div>
              <div className="about-bio">
                {language === "ru" ? (
                  <>
                    <p>
                      Предприниматель с 2011 года, строю бизнесы в разных отраслях и странах. Последний год полностью сфокусирован на AI-assisted разработке — проектирую и запускаю продакшн-системы: чат-боты, CRM, автоматизированные процессы и веб-платформы.
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
                      Entrepreneur since 2011, building across industries and continents. For the past year, fully focused on AI-assisted development — designing and shipping production systems: chatbots, CRMs, automated workflows, and full web platforms.
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
        <Footer />
      </div>
    </>
  );
}
