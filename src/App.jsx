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
                color: C.lime, padding: "14px 
