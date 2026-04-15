import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Github, Linkedin, Mail, ExternalLink, Terminal, Cpu, Zap,
  Code2, Database, Brain, ChevronRight, ArrowUpRight,
  Monitor, Smartphone, GitBranch, Star, Award, BookOpen,
  BarChart3, Layers, Globe, Clock, CheckCircle2, Circle,
  ShieldCheck, Target, TrendingUp
} from "lucide-react";

// ============================================================
// ██████████████████████████████████████████████████████████
// CENTRAL CONFIG — EDIT ALL LINKS AND DATA HERE
// ██████████████████████████████████████████████████████████
// ============================================================
const CONFIG = {
  name: "Ramkrishna Parmar",
  shortName: "RK",
  tagline: "Class 12 · PCM · JEE 2026",
  // !! EDITABLE: swap path below with your actual image !!
  profilePhoto: "/images/profile-placeholder.jpg",

  links: {
    github: "YOUR_GITHUB_LINK",         // e.g. https://github.com/rkparmar
    linkedin: "YOUR_LINKEDIN_LINK",     // e.g. https://linkedin.com/in/rkparmar
    email: "YOUR_EMAIL",                // e.g. rk@example.com
    resume: "YOUR_RESUME_LINK",         // Google Drive / PDF link
  },

  certifications: [
    {
      title: "Introduction to Data Science and AI",
      issuer: "IIT Madras",
      date: "August 2025",
      duration: "8-week certification",
      color: "#6366f1",
      icon: "brain",
      highlight: true,
      note: "One of India's top technical institutions",
      certificateLink: "#", // Replace with real certificate drive/PDF link
    },
    {
      title: "PowerBI Workshop — AI Dashboards",
      issuer: "OfficeMaster",
      date: "March 8, 2026",
      duration: "Workshop completion",
      color: "#f59e0b",
      icon: "chart",
      highlight: false,
      note: "AI-powered interactive dashboards in <30 min",
      certificateLink: "#", // Replace with real certificate drive/PDF link
    },
    {
      title: "Diploma in Office Automation",
      issuer: "Certified Institute",
      date: "2024",
      duration: "A+ Grade",
      color: "#a3e635",
      icon: "award",
      highlight: false,
      note: "Highest grade — A+",
      certificateLink: "#", // Replace with real certificate drive/PDF link
    },
  ],

  projects: [
    {
      title: "AI PowerBI Dashboard",
      tag: "DATA · AI",
      desc: "Built an AI-powered interactive analytics dashboard in PowerBI under 30 minutes. Demonstrates real data storytelling with AI-generated insights and dynamic visuals.",
      stack: ["PowerBI", "AI Visuals", "Data Modeling", "DAX"],
      status: "completed",
      highlight: true,
      github: "YOUR_PROJECT1_GITHUB",   // Replace with real GitHub link
      live: "YOUR_PROJECT1_LIVE",       // Replace with real live link
      outcome: "Completed under 30 min at OfficeMaster Workshop",
    },
    {
      title: "Personal Portfolio V1",
      tag: "FRONTEND",
      desc: "First full portfolio — built entirely from Android + Termux workflow. Proved that constraint-based building produces deeper understanding.",
      stack: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
      status: "completed",
      highlight: false,
      github: "YOUR_PROJECT2_GITHUB",   // Replace with real GitHub link
      live: "YOUR_PROJECT2_LIVE",       // Replace with real live link
      outcome: "First shipped product — mobile-only dev environment",
    },
    {
      title: "React UI Experiments",
      tag: "FRONTEND · REACT",
      desc: "Component library experiments learning React hooks, state management, and Tailwind design systems. Focus on clean component architecture.",
      stack: ["React", "Tailwind CSS", "Framer Motion"],
      status: "in-progress",
      highlight: false,
      github: "YOUR_PROJECT3_GITHUB",   // Replace with real GitHub link
      live: "YOUR_PROJECT3_LIVE",       // Replace with real live link
      outcome: "Active learning — adding new components weekly",
    },
    {
      title: "Next Project",
      tag: "COMING SOON",
      desc: "Next.js + AI integration project currently in planning. Will demonstrate full-stack thinking with AI-first product architecture.",
      stack: ["Next.js", "Node.js", "AI API", "PostgreSQL"],
      status: "planned",
      highlight: false,
      github: null,
      live: null,
      outcome: "Target: Q2 2026",
    },
  ],
};

const LINKS = CONFIG.links;

// ============================================================
// DESIGN TOKENS
// ============================================================
const C = {
  bg: "#080810",
  bgCard: "#0e0e1a",
  bgElevated: "#111120",
  bgGrid: "#090916",
  bgGlass: "rgba(14,14,26,0.7)",
  indigo: "#6366f1",
  indigoLight: "#818cf8",
  indigoDim: "rgba(99,102,241,0.15)",
  lime: "#a3e635",
  limeDim: "rgba(163,230,53,0.12)",
  white: "#f1f5f9",
  muted: "#64748b",
  border: "rgba(99,102,241,0.18)",
  borderSubtle: "rgba(255,255,255,0.06)",
};

// ============================================================
// REUSABLE UTILITIES
// ============================================================
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px", amount: threshold });
  return [ref, isInView];
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.08 }
  }),
};

// ============================================================
// NOISE TEXTURE OVERLAY
// ============================================================
function NoiseOverlay() {
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.4,
      }}
    />
  );
}

// ============================================================
// ANIMATED GRID BACKGROUND
// ============================================================
function GridBackground() {
  return (
    <div style={{
      position: "absolute", inset: 0, overflow: "hidden", zIndex: 0,
      backgroundImage: `
        linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)
      `,
      backgroundSize: "60px 60px",
    }}>
      <div style={{
        position: "absolute", top: "35%", left: "50%", transform: "translate(-50%,-50%)",
        width: "700px", height: "700px",
        background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "-100px", right: "-100px",
        width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(163,230,53,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
    </div>
  );
}

// ============================================================
// SECTION HEADING — editorial chapter opener
// ============================================================
function SectionLabel({ number, title }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "14px",
      marginBottom: "10px",
    }}>
      <div style={{
        width: "4px", height: "28px", borderRadius: "2px",
        background: `linear-gradient(to bottom, ${C.indigo}, ${C.indigoLight})`,
        boxShadow: `0 0 12px ${C.indigo}88`,
        flexShrink: 0,
      }} />
      <span style={{
        color: C.indigoLight,
        fontFamily: "'DM Mono', monospace",
        fontSize: "13px",
        letterSpacing: "0.18em",
        fontWeight: "500",
        textTransform: "uppercase",
        borderBottom: `1px solid ${C.indigo}55`,
        paddingBottom: "2px",
      }}>
        {number} / {title}
      </span>
    </div>
  );
}

// ============================================================
// SECTION CHAPTER HEADING — full h2 combo
// ============================================================
function ChapterHeading({ label, number, children, subtitle }) {
  return (
    <div style={{ marginBottom: "64px" }}>
      <SectionLabel number={number} title={label} />
      <h2 style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: "clamp(38px, 6vw, 64px)",
        fontWeight: "800",
        letterSpacing: "-0.03em",
        color: C.white,
        marginTop: "14px",
        lineHeight: "1.05",
      }}>
        {children}
      </h2>
      {subtitle && (
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          color: C.muted, fontSize: "16px",
          maxWidth: "520px", lineHeight: "1.8",
          marginTop: "16px",
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ============================================================
// PREMIUM DIVIDER
// ============================================================
function PremiumDivider({ variant = "default" }) {
  if (variant === "fade") {
    return (
      <div style={{
        height: "1px", width: "100%",
        background: `linear-gradient(to right, transparent, ${C.indigo}44, transparent)`,
        margin: "0",
      }} />
    );
  }
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "20px",
      padding: "0 32px", maxWidth: "1100px", margin: "0 auto",
    }}>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, transparent, ${C.border})` }} />
      <div style={{
        width: "8px", height: "8px", borderRadius: "2px",
        background: C.indigo, transform: "rotate(45deg)",
        boxShadow: `0 0 8px ${C.indigo}`,
      }} />
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(to left, transparent, ${C.border})` }} />
    </div>
  );
}

// ============================================================
// NAV
// ============================================================
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = ["Story", "Skills", "Projects", "Achievements", "Timeline", "Focus", "Contact"];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 32px",
        height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(8,8,16,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition: "all 0.4s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "32px", height: "32px", borderRadius: "8px",
          background: `linear-gradient(135deg, ${C.indigo}, ${C.indigoLight})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "13px", fontWeight: "800", color: "#fff",
          fontFamily: "'Syne', sans-serif",
        }}>{CONFIG.shortName}</div>
        <span style={{ color: C.white, fontSize: "15px", fontWeight: "600", fontFamily: "'Syne', sans-serif", letterSpacing: "0.02em" }}>
          Ramkrishna
        </span>
      </div>

      <div style={{ display: "flex", gap: "32px" }} className="nav-links">
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            color: C.muted, fontSize: "13px", fontFamily: "'DM Mono', monospace",
            textDecoration: "none", letterSpacing: "0.05em",
            transition: "color 0.2s",
          }}
            onMouseEnter={e => e.target.style.color = C.indigoLight}
            onMouseLeave={e => e.target.style.color = C.muted}
          >{l}</a>
        ))}
      </div>

      <a href={`mailto:${LINKS.email}`} style={{
        background: C.indigoDim, border: `1px solid ${C.border}`,
        color: C.indigoLight, padding: "8px 18px", borderRadius: "8px",
        fontSize: "13px", fontFamily: "'DM Mono', monospace", textDecoration: "none",
        letterSpacing: "0.03em", transition: "all 0.2s",
      }}
        onMouseEnter={e => { e.target.style.background = C.indigo; e.target.style.color = "#fff"; }}
        onMouseLeave={e => { e.target.style.background = C.indigoDim; e.target.style.color = C.indigoLight; }}
      >
        Hire Me
      </a>
    </motion.nav>
  );
}

// ============================================================
// HERO
// ============================================================
function Hero() {
  const [typedText, setTypedText] = useState("");
  const phrases = ["Frontend Engineer.", "AI Explorer.", "JEE Aspirant.", "Product Builder."];
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    const speed = deleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setTypedText(current.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setTimeout(() => setDeleting(true), 1800);
      } else if (deleting && charIdx > 0) {
        setTypedText(current.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      } else {
        setDeleting(false);
        setPhraseIdx(i => (i + 1) % phrases.length);
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, phraseIdx]);

  return (
    <section id="hero" style={{
      minHeight: "100vh", position: "relative",
      display: "flex", alignItems: "center",
      padding: "120px 32px 80px",
      overflow: "hidden",
    }}>
      <GridBackground />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto", width: "100%" }}>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "64px",
          alignItems: "center",
        }} className="hero-grid">

          {/* Left: text content */}
          <div>
            {/* Status badge */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={0}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: C.limeDim, border: `1px solid rgba(163,230,53,0.25)`,
                padding: "6px 14px", borderRadius: "100px", marginBottom: "40px",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.lime, boxShadow: `0 0 8px ${C.lime}` }} />
              <span style={{ color: C.lime, fontSize: "12px", fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em" }}>
                AVAILABLE · CLASS 12 · JEE 2026
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
              <h1 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(48px, 8vw, 96px)",
                fontWeight: "800", lineHeight: "1.0",
                letterSpacing: "-0.03em", color: C.white,
                margin: "0 0 8px 0",
              }}>
                Ramkrishna
              </h1>
              <h1 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(48px, 8vw, 96px)",
                fontWeight: "800", lineHeight: "1.0",
                letterSpacing: "-0.03em",
                background: `linear-gradient(135deg, ${C.indigo} 0%, ${C.indigoLight} 50%, ${C.lime} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                margin: "0 0 32px 0",
              }}>
                Parmar
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2} style={{ marginBottom: "24px" }}>
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "clamp(16px, 2.5vw, 22px)",
                color: C.indigoLight, letterSpacing: "0.04em",
              }}>
                &gt; {typedText}
                <span style={{
                  display: "inline-block", width: "2px", height: "1.2em",
                  background: C.lime, marginLeft: "2px", verticalAlign: "text-bottom",
                  animation: "blink 1s step-end infinite",
                }} />
              </span>
            </motion.div>

            {/* Subline */}
            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={3} style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(15px, 2vw, 18px)",
              color: C.muted, maxWidth: "560px",
              lineHeight: "1.7", marginBottom: "48px",
            }}>
              Started on Android. Learned on Termux. Building toward an AI-focused engineering future —
              one disciplined system at a time.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}
              style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}
            >
              <a href="#projects" style={{
                background: `linear-gradient(135deg, ${C.indigo}, #4f46e5)`,
                color: "#fff", padding: "14px 28px", borderRadius: "10px",
                fontFamily: "'Syne', sans-serif", fontWeight: "700",
                fontSize: "14px", textDecoration: "none", letterSpacing: "0.03em",
                boxShadow: `0 0 30px rgba(99,102,241,0.3)`,
                transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: "8px",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                View Work <ArrowUpRight size={16} />
              </a>

              <a href="#achievements" style={{
                background: "transparent",
                border: `1px solid ${C.border}`,
                color: C.white, padding: "14px 28px", borderRadius: "10px",
                fontFamily: "'Syne', sans-serif", fontWeight: "600",
                fontSize: "14px", textDecoration: "none", letterSpacing: "0.03em",
                transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: "8px",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.indigo; e.currentTarget.style.background = C.indigoDim; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = "transparent"; }}
              >
                Certifications <Award size={16} />
              </a>

              <a href={LINKS.resume} target="_blank" rel="noreferrer" style={{
                background: "transparent",
                border: `1px solid rgba(163,230,53,0.3)`,
                color: C.lime, padding: "14px 28px", borderRadius: "10px",
                fontFamily: "'DM Mono', monospace",
                fontSize: "13px", textDecoration: "none", letterSpacing: "0.06em",
                transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: "8px",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = C.limeDim; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              >
                resume.pdf <ExternalLink size={14} />
              </a>
            </motion.div>
          </div>

          {/* Right: Professional Portrait */}
          {/* !! EDITABLE: Replace CONFIG.profilePhoto with your actual image path !! */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
            style={{ flexShrink: 0 }}
            className="hero-portrait"
          >
            <div style={{
              width: "220px",
              height: "220px",
              borderRadius: "20px",
              position: "relative",
              background: `linear-gradient(135deg, rgba(99,102,241,0.25) 0%, rgba(129,140,248,0.1) 50%, rgba(163,230,53,0.08) 100%)`,
              padding: "3px",
              boxShadow: `
                0 0 0 1px ${C.border},
                0 24px 64px rgba(99,102,241,0.2),
                0 8px 24px rgba(0,0,0,0.4),
                inset 0 1px 0 rgba(255,255,255,0.06)
              `,
            }}>
              <div style={{
                width: "100%", height: "100%",
                borderRadius: "18px",
                overflow: "hidden",
                background: C.bgElevated,
                position: "relative",
              }}>
                <img
                  src={CONFIG.profilePhoto}
                  alt="Ramkrishna Parmar — Professional Portrait"
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    display: "block",
                  }}
                  onError={e => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                {/* Placeholder shown if image missing */}
                <div style={{
                  display: "none",
                  position: "absolute", inset: 0,
                  flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  gap: "10px",
                }}>
                  <div style={{
                    width: "60px", height: "60px", borderRadius: "50%",
                    background: C.indigoDim, border: `2px solid ${C.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "22px", fontFamily: "'Syne', sans-serif",
                    fontWeight: "800", color: C.indigoLight,
                  }}>
                    {CONFIG.shortName}
                  </div>
                  <span style={{
                    fontFamily: "'DM Mono', monospace", fontSize: "10px",
                    color: C.muted, letterSpacing: "0.08em", textAlign: "center",
                    padding: "0 12px",
                  }}>
                    // profile photo
                  </span>
                </div>
              </div>

              <div style={{
                position: "absolute", bottom: "-12px", right: "-12px",
                width: "40px", height: "40px",
                background: `radial-gradient(circle, ${C.lime}44, transparent)`,
                borderRadius: "50%", pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute", top: "-8px", left: "-8px",
                width: "24px", height: "24px",
                background: `radial-gradient(circle, ${C.indigo}66, transparent)`,
                borderRadius: "50%", pointerEvents: "none",
              }} />
            </div>

            <div style={{
              marginTop: "14px", textAlign: "center",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
            }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.lime, boxShadow: `0 0 6px ${C.lime}` }} />
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: C.muted, letterSpacing: "0.1em" }}>
                AVAILABLE
              </span>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          style={{
            marginTop: "80px",
            display: "flex", alignItems: "center", gap: "12px",
          }}
        >
          <div style={{
            width: "1px", height: "48px",
            background: `linear-gradient(to bottom, ${C.indigo}, transparent)`,
          }} />
          <span style={{ color: C.muted, fontSize: "11px", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", writingMode: "vertical-lr" }}>
            SCROLL
          </span>
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.bg}; color: ${C.white}; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.indigo}; border-radius: 2px; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-portrait { display: none !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// STORY  —  elevated panel background
// ============================================================
function Story() {
  const [ref, inView] = useReveal();

  const nodes = [
    { icon: <Smartphone size={16} />, label: "Android + Termux", text: "No laptop. No shortcuts. Built first workflows entirely on Android using Termux — nano editor, local servers, GitHub clones. This constraint became an unfair advantage." },
    { icon: <Terminal size={16} />, label: "Deep Debugging", text: "When your environment breaks on mobile, you learn how systems actually work. Every error message became a lesson. Every fix became architecture thinking." },
    { icon: <BookOpen size={16} />, label: "JEE + Code Balance", text: "Class 12 PCM with PW online preparation — while simultaneously building a coding profile. Physics problems trained systematic thinking. JEE prep built pressure tolerance." },
    { icon: <Brain size={16} />, label: "Product Thinking", text: "Moved from 'does it work' to 'how does it build trust'. Started studying how polished interfaces create credibility — and why users feel confident in some products, not others." },
  ];

  return (
    <section id="story" style={{
      padding: "140px 32px",
      position: "relative",
      background: C.bgElevated,
    }} ref={ref}>
      {/* Subtle dot-pattern texture */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `radial-gradient(${C.border} 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
        opacity: 0.4,
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0}>
          <ChapterHeading
            number="01" label="ORIGIN"
            subtitle="Most developers start with a MacBook and a bootcamp. I started with a phone, Termux, and a Wi-Fi connection. What others call a limitation, I call my origin story."
          >
            The Story Behind<br />
            <span style={{ color: C.indigoLight }}>the Engineer</span>
          </ChapterHeading>
        </motion.div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
        }}>
          {nodes.map((n, i) => (
            <motion.div
              key={i}
              variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={i + 1}
              style={{
                background: C.bgCard, border: `1px solid ${C.border}`,
                borderRadius: "16px", padding: "28px",
                transition: "all 0.3s ease",
                cursor: "default",
              }}
              whileHover={{ y: -4, borderColor: C.indigo, boxShadow: `0 12px 40px rgba(99,102,241,0.12)` }}
            >
              <div style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: C.indigoDim, border: `1px solid ${C.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: C.indigoLight, marginBottom: "16px",
              }}>
                {n.icon}
              </div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: "700", fontSize: "15px", color: C.white, marginBottom: "10px" }}>
                {n.label}
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: C.muted, lineHeight: "1.7" }}>
                {n.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Editorial quote block */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={5}
          style={{
            marginTop: "48px", padding: "36px 44px",
            borderLeft: `4px solid ${C.indigo}`,
            background: `linear-gradient(135deg, ${C.indigoDim}, rgba(8,8,16,0.4))`,
            borderRadius: "0 16px 16px 0",
            boxShadow: `inset 0 0 40px rgba(99,102,241,0.04)`,
          }}
        >
          <p style={{
            fontFamily: "'Syne', sans-serif", fontSize: "clamp(16px, 2.5vw, 20px)",
            color: C.white, fontWeight: "600", lineHeight: "1.6", fontStyle: "italic",
          }}>
            "I don't just want systems to work. I want to understand why they work — and then make them look like they were built to last."
          </p>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: C.muted, marginTop: "14px", letterSpacing: "0.06em" }}>
            — Ramkrishna Parmar, Class 12
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// SKILLS / TECHNICAL PROOF CONSOLE  —  clean bg
// ============================================================
function Skills() {
  const [ref, inView] = useReveal();
  const [activeTab, setActiveTab] = useState("frontend");

  const tabs = {
    frontend: {
      label: "Frontend",
      color: C.indigoLight,
      items: [
        { name: "HTML & CSS", level: 90, note: "Semantic, accessible, responsive" },
        { name: "JavaScript", level: 75, note: "DOM, async, ES6+" },
        { name: "React", level: 70, note: "Components, hooks, state" },
        { name: "Tailwind CSS", level: 72, note: "Utility-first design systems" },
        { name: "Responsive UI", level: 80, note: "Mobile-first approach" },
      ]
    },
    tools: {
      label: "Tools",
      color: C.lime,
      items: [
        { name: "Git & GitHub", level: 75, note: "Repo management, cloning, commits" },
        { name: "Termux / Android", level: 85, note: "Full workflow on mobile" },
        { name: "Nano Editor", level: 80, note: "Terminal editing comfort" },
        { name: "Local Dev Servers", level: 70, note: "Testing & debugging" },
        { name: "API Basics", level: 55, note: "REST concepts, fetch" },
      ]
    },
    data: {
      label: "Data & AI",
      color: "#f472b6",
      items: [
        { name: "PowerBI", level: 72, note: "Dashboards, AI visuals, insights" },
        { name: "Data Visualization", level: 65, note: "Charts, metrics, storytelling" },
        { name: "Python Basics", level: 45, note: "Scripting fundamentals" },
        { name: "AI Integrations", level: 40, note: "Learning — APIs, prompting" },
        { name: "IIT Madras DS/AI", level: 70, note: "Certified 8-week course" },
      ]
    },
    learning: {
      label: "Learning",
      color: "#fb923c",
      items: [
        { name: "Next.js", level: 25, note: "SSR, routing — in progress" },
        { name: "Node.js", level: 20, note: "Backend basics — starting" },
        { name: "Product Architecture", level: 35, note: "System design thinking" },
        { name: "AI Integration", level: 40, note: "Building with AI APIs" },
      ]
    },
  };

  const active = tabs[activeTab];

  const proofLines = [
    { prefix: "focus", text: "Next.js + Node.js — full-stack in progress", color: "#fb923c" },
    { prefix: "workflow", text: "Android → Termux → GitHub → Vercel/Pages", color: C.indigoLight },
    { prefix: "mindset", text: "constraint-first debugging builds real intuition", color: C.white },
    { prefix: "tool", text: "PowerBI AI Dashboards — production-grade visuals", color: "#f472b6" },
    { prefix: "approach", text: "read the error, trace the call stack, fix the root", color: C.muted },
    { prefix: "system", text: "performance-first: load fast, render clean, no waste", color: C.indigoLight },
    { prefix: "ai", text: "exploring: Claude API + React = intelligent UIs", color: "#818cf8" },
    { prefix: "cert", text: "IIT Madras DS/AI — 8 weeks, completed Aug 2025", color: C.lime },
    { prefix: "jee", text: "PCM + Physics logic → systems thinking overlap", color: C.muted },
    { prefix: "target", text: "Q2 2026: first AI-integrated full-stack product", color: C.lime },
    { prefix: "build", text: "no shortcuts. shipped from a phone. still shipping.", color: C.white },
    { prefix: "~$", text: "_", color: C.lime },
  ];

  return (
    <section id="skills" style={{ padding: "140px 32px", background: C.bg }} ref={ref}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <ChapterHeading number="02" label="TECHNICAL PROOF">
            Skills &<br /><span style={{ color: C.indigoLight }}>Stack</span>
          </ChapterHeading>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }} className="skills-grid">

          {/* Skill bars panel */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={1}
            style={{
              background: C.bgCard, border: `1px solid ${C.border}`,
              borderRadius: "16px", padding: "32px", overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", gap: "8px", marginBottom: "28px", flexWrap: "wrap" }}>
              {Object.entries(tabs).map(([key, val]) => (
                <button key={key} onClick={() => setActiveTab(key)} style={{
                  padding: "6px 14px", borderRadius: "8px", border: "1px solid",
                  borderColor: activeTab === key ? val.color : C.border,
                  background: activeTab === key ? `${val.color}18` : "transparent",
                  color: activeTab === key ? val.color : C.muted,
                  fontFamily: "'DM Mono', monospace", fontSize: "12px", cursor: "pointer",
                  letterSpacing: "0.04em", transition: "all 0.2s",
                }}>
                  {val.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={activeTab}
                initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.25 }}
              >
                {active.items.map((item, i) => (
                  <div key={i} style={{ marginBottom: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: C.white, fontWeight: "500" }}>
                        {item.name}
                      </span>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: C.muted }}>
                        {item.level}%
                      </span>
                    </div>
                    <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${item.level}%` } : { width: 0 }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                        style={{
                          height: "100%", borderRadius: "2px",
                          background: `linear-gradient(90deg, ${active.color}, ${active.color}88)`,
                          boxShadow: `0 0 8px ${active.color}44`,
                        }}
                      />
                    </div>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: C.muted, marginTop: "4px", display: "block" }}>
                      {item.note}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Technical Proof Console */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={2}
            style={{
              background: "#050508", border: `1px solid rgba(99,102,241,0.25)`,
              borderRadius: "16px", overflow: "hidden",
            }}
          >
            <div style={{
              padding: "12px 16px",
              background: "#0a0a14",
              borderBottom: "1px solid rgba(99,102,241,0.15)",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f57" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#febc2e" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28c840" }} />
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: C.indigo, marginLeft: "8px", letterSpacing: "0.05em" }}>
                proof.console — engineering context
              </span>
            </div>

            <div style={{ padding: "20px", fontFamily: "'DM Mono', monospace", fontSize: "12px", lineHeight: "2.0" }}>
              {proofLines.map((line, i) => (
                <motion.div key={i}
                  variants={fadeIn} initial="hidden" animate={inView ? "visible" : "hidden"} custom={i}
                  style={{ display: "flex", gap: "10px", alignItems: "baseline" }}
                >
                  <span style={{
                    color: C.indigo, userSelect: "none", flexShrink: 0,
                    fontSize: "10px", letterSpacing: "0.06em", minWidth: "64px",
                    opacity: 0.75,
                  }}>
                    [{line.prefix}]
                  </span>
                  <span style={{ color: line.color, lineHeight: "1.6" }}>{line.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// PROJECTS BENTO  —  grid bg variation
// ============================================================
function Projects() {
  const [ref, inView] = useReveal();
  const projects = CONFIG.projects;

  const statusColors = {
    completed: C.lime,
    "in-progress": C.indigoLight,
    planned: C.muted,
  };

  return (
    <section id="projects" style={{
      padding: "140px 32px",
      background: C.bgGrid,
      backgroundImage: `
        linear-gradient(rgba(99,102,241,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(99,102,241,0.025) 1px, transparent 1px)
      `,
      backgroundSize: "40px 40px",
    }} ref={ref}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <ChapterHeading
            number="03" label="WORK"
            subtitle="// real builds, real problems, real learning"
          >
            Featured<br /><span style={{ color: C.indigoLight }}>Projects</span>
          </ChapterHeading>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
        }} className="projects-grid">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={i + 1}
              whileHover={{ y: -4 }}
              style={{
                background: p.highlight
                  ? `linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(14,14,26,1) 60%)`
                  : C.bgCard,
                border: `1px solid ${p.highlight ? C.indigo : C.border}`,
                borderRadius: "16px", padding: "28px",
                transition: "all 0.3s ease",
                position: "relative", overflow: "hidden",
                opacity: p.status === "planned" ? 0.65 : 1,
              }}
            >
              {p.highlight && (
                <div style={{
                  position: "absolute", top: "-40px", right: "-40px",
                  width: "120px", height: "120px",
                  background: "radial-gradient(circle, rgba(99,102,241,0.15), transparent)",
                  borderRadius: "50%", pointerEvents: "none",
                }} />
              )}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: C.muted, letterSpacing: "0.1em" }}>{p.tag}</span>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: "700", fontSize: "18px", color: C.white, marginTop: "4px" }}>{p.title}</h3>
                </div>
                <div style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "4px 10px", borderRadius: "100px",
                  background: `${statusColors[p.status]}14`,
                  border: `1px solid ${statusColors[p.status]}30`,
                }}>
                  <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: statusColors[p.status] }} />
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: statusColors[p.status], letterSpacing: "0.06em" }}>
                    {p.status}
                  </span>
                </div>
              </div>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: C.muted, lineHeight: "1.7", marginBottom: "20px" }}>
                {p.desc}
              </p>

              <div style={{
                padding: "10px 14px", borderRadius: "8px",
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                marginBottom: "20px",
              }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: C.lime, letterSpacing: "0.04em" }}>
                  → {p.outcome}
                </span>
              </div>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
                {p.stack.map((s, j) => (
                  <span key={j} style={{
                    fontFamily: "'DM Mono', monospace", fontSize: "11px",
                    padding: "4px 10px", borderRadius: "6px",
                    background: C.indigoDim, color: C.indigoLight,
                    border: `1px solid ${C.border}`, letterSpacing: "0.03em",
                  }}>{s}</span>
                ))}
              </div>

              {(p.github || p.live) && (
                <div style={{ display: "flex", gap: "12px" }}>
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer" style={{
                      display: "flex", alignItems: "center", gap: "6px",
                      fontFamily: "'DM Mono', monospace", fontSize: "12px",
                      color: C.muted, textDecoration: "none", transition: "color 0.2s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = C.white}
                      onMouseLeave={e => e.currentTarget.style.color = C.muted}
                    >
                      <Github size={13} /> GitHub
                    </a>
                  )}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" style={{
                      display: "flex", alignItems: "center", gap: "6px",
                      fontFamily: "'DM Mono', monospace", fontSize: "12px",
                      color: C.muted, textDecoration: "none", transition: "color 0.2s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = C.indigoLight}
                      onMouseLeave={e => e.currentTarget.style.color = C.muted}
                    >
                      <ExternalLink size={13} /> Live
                    </a>
                  )}
                </div>
              )}

              {p.status === "planned" && (
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: C.muted, letterSpacing: "0.04em" }}>
                  // coming soon
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// ACHIEVEMENTS & CERTIFICATIONS  —  elevated panel
// ============================================================
function Achievements() {
  const [ref, inView] = useReveal();
  const certs = CONFIG.certifications;

  const iconMap = {
    brain: <Brain size={18} />,
    chart: <BarChart3 size={18} />,
    award: <Award size={18} />,
  };

  const milestones = [
    { icon: <Smartphone size={14} />, text: "Built complete dev workflow on Android + Termux" },
    { icon: <GitBranch size={14} />, text: "Self-taught React and Tailwind from GitHub repos" },
    { icon: <Terminal size={14} />, text: "Comfortable with nano, local servers, and CLI debugging" },
    { icon: <Zap size={14} />, text: "JEE preparation + coding maintained simultaneously" },
    { icon: <Star size={14} />, text: "Consistent learning habit across Class 12 workload" },
    { icon: <Globe size={14} />, text: "Deployed projects live using GitHub Pages" },
  ];

  return (
    <section id="achievements" style={{
      padding: "140px 32px",
      background: C.bgElevated,
      position: "relative",
    }} ref={ref}>
      <div style={{
        position: "absolute", top: "60px", right: "-100px", zIndex: 0,
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <ChapterHeading number="04" label="CREDENTIALS">
            Achievements &<br /><span style={{ color: C.indigoLight }}>Certifications</span>
          </ChapterHeading>
        </motion.div>

        {/* Cert cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", marginBottom: "48px" }}>
          {certs.map((c, i) => (
            <motion.div
              key={i}
              variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={i + 1}
              whileHover={{ y: -4, boxShadow: `0 16px 48px ${c.color}20` }}
              style={{
                background: C.bgCard, border: `1px solid ${c.highlight ? c.color : C.border}`,
                borderRadius: "16px", padding: "28px", transition: "all 0.3s ease",
                position: "relative", overflow: "hidden",
                display: "flex", flexDirection: "column",
              }}
            >
              {/* Top accent strip */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                background: `linear-gradient(90deg, ${c.color}, ${c.color}44)`,
                borderRadius: "16px 16px 0 0",
              }} />

              <div style={{
                width: "40px", height: "40px", borderRadius: "10px",
                background: `${c.color}18`, border: `1px solid ${c.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: c.color, marginBottom: "16px",
              }}>
                {iconMap[c.icon]}
              </div>

              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: "700", fontSize: "16px", color: C.white, marginBottom: "6px", lineHeight: "1.4" }}>
                {c.title}
              </h3>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: c.color, marginBottom: "8px" }}>
                {c.issuer}
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: C.muted, marginBottom: "16px" }}>
                {c.note}
              </p>

              <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
                <span style={{
                  fontFamily: "'DM Mono', monospace", fontSize: "11px",
                  padding: "3px 10px", borderRadius: "6px",
                  background: `${c.color}14`, color: c.color,
                  border: `1px solid ${c.color}24`, letterSpacing: "0.04em",
                }}>{c.date}</span>
                <span style={{
                  fontFamily: "'DM Mono', monospace", fontSize: "11px",
                  padding: "3px 10px", borderRadius: "6px",
                  background: "rgba(255,255,255,0.04)", color: C.muted,
                  letterSpacing: "0.04em",
                }}>{c.duration}</span>
              </div>

              {/* Certificate CTA Button */}
              {/* !! EDITABLE: Replace certificateLink in CONFIG with real certificate link !! */}
              <a
                href={c.certificateLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  marginTop: "auto",
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "10px 18px",
                  borderRadius: "10px",
                  background: `${c.color}12`,
                  border: `1px solid ${c.color}35`,
                  color: c.color,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "12px",
                  fontWeight: "500",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  width: "fit-content",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `${c.color}25`;
                  e.currentTarget.style.borderColor = c.color;
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = `${c.color}12`;
                  e.currentTarget.style.borderColor = `${c.color}35`;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <ShieldCheck size={13} />
                View Certificate
                <ExternalLink size={11} style={{ opacity: 0.7 }} />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Milestones grid */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={4}
          style={{
            background: C.bgCard, border: `1px solid ${C.border}`,
            borderRadius: "16px", padding: "32px",
          }}
        >
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: "700", fontSize: "16px", color: C.white, marginBottom: "24px" }}>
            Engineering Milestones
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px" }}>
            {milestones.map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "8px", flexShrink: 0,
                  background: C.indigoDim, border: `1px solid ${C.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: C.indigoLight,
                }}>
                  {m.icon}
                </div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: C.muted, lineHeight: "1.6", paddingTop: "4px" }}>
                  {m.text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// GROWTH TIMELINE  —  dark clean bg
// ============================================================
function Timeline() {
  const [ref, inView] = useReveal();

  const events = [
    {
      year: "2024",
      title: "Office Automation Diploma",
      sub: "A+ Grade",
      desc: "First formal certification. Established technical discipline and earned top grade. This was the moment coding became a serious commitment.",
      color: C.lime,
      icon: <Award size={14} />,
    },
    {
      year: "2024",
      title: "Android + Termux Workflow",
      sub: "Self-taught",
      desc: "Built a complete development environment on Android. No laptop. Cloned repos, edited with nano, tested locally. Constraint became capability.",
      color: C.indigoLight,
      icon: <Smartphone size={14} />,
    },
    {
      year: "2024–25",
      title: "React & Tailwind Fundamentals",
      sub: "Frontend focus",
      desc: "Self-taught React and Tailwind from documentation, GitHub repos, and real projects. Developed component thinking and design system awareness.",
      color: C.indigo,
      icon: <Code2 size={14} />,
    },
    {
      year: "Aug 2025",
      title: "IIT Madras — DS & AI Certification",
      sub: "8-week program",
      desc: "Completed introduction to Data Science and AI from one of India's premier technical institutions. Added AI literacy to the engineering foundation.",
      color: "#f59e0b",
      icon: <Brain size={14} />,
    },
    {
      year: "Mar 2026",
      title: "PowerBI + AI Dashboard Workshop",
      sub: "OfficeMaster",
      desc: "Built AI-powered interactive analytics dashboards under 30 minutes. Connected data visualization with AI-driven insight generation.",
      color: "#f472b6",
      icon: <BarChart3 size={14} />,
    },
    {
      year: "2026 →",
      title: "Next.js · Node.js · AI Integration",
      sub: "In progress",
      desc: "Building toward full-stack with AI integration. Target: first production-grade AI product, strong internship profile, JEE result.",
      color: C.lime,
      icon: <Zap size={14} />,
      future: true,
    },
  ];

  return (
    <section id="timeline" style={{ padding: "140px 32px", background: C.bg }} ref={ref}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <ChapterHeading number="05" label="JOURNEY">
            Growth<br /><span style={{ color: C.indigoLight }}>Timeline</span>
          </ChapterHeading>
        </motion.div>

        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", left: "20px", top: 0, bottom: 0,
            width: "1px",
            background: `linear-gradient(to bottom, ${C.indigo}, ${C.indigo}44, transparent)`,
          }} />

          <div style={{ paddingLeft: "60px", display: "flex", flexDirection: "column", gap: "48px" }}>
            {events.map((e, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={i}
                style={{ position: "relative" }}
              >
                <div style={{
                  position: "absolute", left: "-48px", top: "4px",
                  width: "16px", height: "16px", borderRadius: "50%",
                  background: e.future ? "transparent" : e.color,
                  border: `2px solid ${e.color}`,
                  boxShadow: e.future ? "none" : `0 0 12px ${e.color}66`,
                }} />

                <div style={{
                  background: e.future ? "transparent" : C.bgCard,
                  border: `1px solid ${e.future ? `${e.color}30` : C.border}`,
                  borderRadius: "14px", padding: "24px",
                  borderStyle: e.future ? "dashed" : "solid",
                  opacity: e.future ? 0.7 : 1,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px", flexWrap: "wrap" }}>
                    <span style={{
                      fontFamily: "'DM Mono', monospace", fontSize: "11px",
                      padding: "3px 10px", borderRadius: "6px",
                      background: `${e.color}14`, color: e.color,
                      border: `1px solid ${e.color}24`, letterSpacing: "0.04em",
                    }}>{e.year}</span>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: "700", fontSize: "16px", color: C.white }}>
                      {e.title}
                    </h3>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: C.muted }}>
                      // {e.sub}
                    </span>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: C.muted, lineHeight: "1.7", maxWidth: "600px" }}>
                    {e.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CURRENT FOCUS  —  micro-section before contact
// ============================================================
function CurrentFocus() {
  const [ref, inView] = useReveal();

  const focusItems = [
    {
      icon: <BookOpen size={16} />,
      label: "JEE 2026",
      desc: "PCM preparation with discipline — PW online, systematic revision, pressure management.",
      color: "#f59e0b",
      status: "active",
    },
    {
      icon: <Code2 size={16} />,
      label: "Next.js + Node.js",
      desc: "Learning full-stack architecture. Server-side rendering, routing, API design fundamentals.",
      color: C.indigoLight,
      status: "active",
    },
    {
      icon: <Brain size={16} />,
      label: "Frontend + AI Systems",
      desc: "Exploring Claude API, AI-enhanced UIs, intelligent product interfaces and prompt engineering.",
      color: "#818cf8",
      status: "active",
    },
    {
      icon: <BarChart3 size={16} />,
      label: "PowerBI Storytelling",
      desc: "Expanding dashboard capabilities — advanced DAX, AI visuals, executive-level data narratives.",
      color: "#f472b6",
      status: "expanding",
    },
    {
      icon: <TrendingUp size={16} />,
      label: "Startup Engineering Vision",
      desc: "Long-term goal: build AI-first products from scratch. Strong systems thinking + product sense.",
      color: C.lime,
      status: "planning",
    },
  ];

  const statusLabel = { active: "Active", expanding: "Expanding", planning: "Planning" };
  const statusColor = { active: C.lime, expanding: C.indigoLight, planning: "#fb923c" };

  return (
    <section id="focus" style={{
      padding: "140px 32px",
      background: C.bgElevated,
      position: "relative",
      overflow: "hidden",
    }} ref={ref}>
      <div style={{
        position: "absolute", bottom: "-80px", left: "50%", transform: "translateX(-50%)",
        width: "600px", height: "300px",
        background: `radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <ChapterHeading
            number="06" label="CURRENT FOCUS"
            subtitle="Live growth signal — what I'm actively building, learning, and targeting right now."
          >
            What I'm<br /><span style={{ color: C.indigoLight }}>Working On</span>
          </ChapterHeading>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
        }}>
          {focusItems.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={i + 1}
              whileHover={{ y: -3, borderColor: item.color }}
              style={{
                background: C.bgCard,
                border: `1px solid ${C.border}`,
                borderRadius: "14px", padding: "24px",
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "10px",
                  background: `${item.color}14`,
                  border: `1px solid ${item.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: item.color,
                }}>
                  {item.icon}
                </div>
                <span style={{
                  fontFamily: "'DM Mono', monospace", fontSize: "10px",
                  padding: "3px 8px", borderRadius: "6px",
                  background: `${statusColor[item.status]}14`,
                  color: statusColor[item.status],
                  border: `1px solid ${statusColor[item.status]}24`,
                  letterSpacing: "0.06em",
                }}>
                  {statusLabel[item.status]}
                </span>
              </div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: "700", fontSize: "15px", color: C.white, marginBottom: "8px" }}>
                {item.label}
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: C.muted, lineHeight: "1.65" }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Editorial live-growth signal */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={6}
          style={{
            marginTop: "40px",
            padding: "20px 28px",
            background: C.indigoDim,
            border: `1px solid ${C.border}`,
            borderRadius: "12px",
            display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap",
          }}
        >
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: C.lime, boxShadow: `0 0 8px ${C.lime}`, flexShrink: 0 }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: C.indigoLight, letterSpacing: "0.04em" }}>
            This portfolio is a live document. Skills, projects, and focus areas update continuously.
          </span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: C.muted, marginLeft: "auto" }}>
            last updated: Apr 2026
          </span>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// CONTACT  —  section 07
// ============================================================
function Contact() {
  const [ref, inView] = useReveal();

  const socials = [
    { label: "GitHub", icon: <Github size={18} />, href: LINKS.github, color: C.white, note: "Code & repos" },
    { label: "LinkedIn", icon: <Linkedin size={18} />, href: LINKS.linkedin, color: "#0ea5e9", note: "Professional profile" },
    { label: "Email", icon: <Mail size={18} />, href: `mailto:${LINKS.email}`, color: C.indigo, note: "Direct contact" },
  ];

  return (
    <section id="contact" style={{ padding: "140px 32px 80px", background: C.bg }} ref={ref}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <SectionLabel number="07" title="CONTACT" />
        </motion.div>

        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={1}
          style={{
            marginTop: "32px", padding: "64px 48px",
            background: `linear-gradient(135deg, rgba(99,102,241,0.1) 0%, ${C.bgCard} 50%, rgba(163,230,53,0.05) 100%)`,
            border: `1px solid ${C.border}`,
            borderRadius: "24px",
            position: "relative", overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", top: "-60px", right: "-60px",
            width: "240px", height: "240px",
            background: "radial-gradient(circle, rgba(99,102,241,0.12), transparent)",
            borderRadius: "50%", pointerEvents: "none",
          }} />

          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: C.lime, boxShadow: `0 0 8px ${C.lime}` }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: C.lime, letterSpacing: "0.08em" }}>
              AVAILABLE FOR OPPORTUNITIES
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 5vw, 52px)",
            fontWeight: "800", letterSpacing: "-0.02em", color: C.white,
            marginBottom: "16px", lineHeight: "1.1",
          }}>
            Let's Build<br />
            <span style={{ color: C.indigoLight }}>Something Real</span>
          </h2>

          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: C.muted,
            maxWidth: "480px", lineHeight: "1.8", marginBottom: "48px",
          }}>
            Open for internships, freelance projects, collaborations, and conversations about
            frontend engineering, AI products, or just good ideas worth building.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "48px" }}>
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target={s.label !== "Email" ? "_blank" : undefined}
                rel="noreferrer"
                whileHover={{ y: -3, scale: 1.02 }}
                style={{
                  background: C.bgCard, border: `1px solid ${C.border}`,
                  borderRadius: "14px", padding: "20px 24px",
                  textDecoration: "none", display: "flex", alignItems: "center", gap: "14px",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = s.color}
                onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
              >
                <div style={{
                  width: "40px", height: "40px", borderRadius: "10px",
                  background: `${s.color}18`, border: `1px solid ${s.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: s.color, flexShrink: 0,
                }}>
                  {s.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: "700", fontSize: "15px", color: C.white }}>
                    {s.label}
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: C.muted, marginTop: "2px" }}>
                    {s.note}
                  </div>
                </div>
                <ArrowUpRight size={14} style={{ color: C.muted, marginLeft: "auto" }} />
              </motion.a>
            ))}
          </div>

          <div style={{
            padding: "16px 20px",
            background: "#050508",
            border: "1px solid rgba(163,230,53,0.15)",
            borderRadius: "10px", display: "inline-flex", alignItems: "center", gap: "12px",
          }}>
            <span style={{ color: C.lime, fontFamily: "'DM Mono', monospace", fontSize: "12px" }}>~$</span>
            <span style={{ color: C.muted, fontFamily: "'DM Mono', monospace", fontSize: "12px" }}>
              response_time --average
            </span>
            <span style={{ color: C.white, fontFamily: "'DM Mono', monospace", fontSize: "12px" }}>
              &lt; 24 hours
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer style={{
      borderTop: `1px solid ${C.border}`,
      padding: "32px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: "16px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "24px", height: "24px", borderRadius: "6px",
          background: `linear-gradient(135deg, ${C.indigo}, ${C.indigoLight})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "10px", fontWeight: "800", color: "#fff", fontFamily: "'Syne', sans-serif",
        }}>{CONFIG.shortName}</div>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: C.muted }}>
          Ramkrishna Parmar · 2026
        </span>
      </div>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: C.muted }}>
        // built with discipline
      </span>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: C.muted }}>
        {CONFIG.tagline}
      </span>
    </footer>
  );
}

// ============================================================
// ROOT APP
// ============================================================
export default function App() {
  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <NoiseOverlay />
      <Nav />
      <Hero />
      {/* Section rhythm: elevated → clean → grid → elevated → clean → elevated → clean */}
      <Story />
      <PremiumDivider />
      <Skills />
      <PremiumDivider variant="fade" />
      <Projects />
      <PremiumDivider />
      <Achievements />
      <PremiumDivider variant="fade" />
      <Timeline />
      <PremiumDivider />
      <CurrentFocus />
      <PremiumDivider variant="fade" />
      <Contact />
      <Footer />
    </div>
  );
}
