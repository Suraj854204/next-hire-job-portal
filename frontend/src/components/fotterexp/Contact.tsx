"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

type Category = "general" | "complaint" | "support" | "business";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<Category>("general");
  const [focused, setFocused] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const sectionRef = useRef<HTMLDivElement>(null);

  const categories: {
    id: Category;
    label: string;
    icon: string;
    desc: string;
  }[] = [
    {
      id: "general",
      label: "General",
      icon: "✦",
      desc: "Questions & inquiries",
    },
    {
      id: "complaint",
      label: "Complaint",
      icon: "⚑",
      desc: "Report an issue",
    },
    {
      id: "support",
      label: "Support",
      icon: "◎",
      desc: "Technical help",
    },
    {
      id: "business",
      label: "Business",
      icon: "◈",
      desc: "Partnerships",
    },
  ];

  const themes = {
    general: {
      primary: "#818cf8",
      secondary: "#e879f9",
      soft: "rgba(99,102,241,0.12)",
      border: "rgba(99,102,241,0.35)",
      glow: "rgba(99,102,241,0.25)",
      orb: "rgba(99,102,241,0.18)",
    },
    complaint: {
      primary: "#fb7185",
      secondary: "#f43f5e",
      soft: "rgba(244,63,94,0.12)",
      border: "rgba(244,63,94,0.35)",
      glow: "rgba(244,63,94,0.25)",
      orb: "rgba(244,63,94,0.18)",
    },
    support: {
      primary: "#22d3ee",
      secondary: "#06b6d4",
      soft: "rgba(6,182,212,0.12)",
      border: "rgba(6,182,212,0.35)",
      glow: "rgba(6,182,212,0.25)",
      orb: "rgba(6,182,212,0.18)",
    },
    business: {
      primary: "#fbbf24",
      secondary: "#f59e0b",
      soft: "rgba(245,158,11,0.12)",
      border: "rgba(245,158,11,0.35)",
      glow: "rgba(245,158,11,0.25)",
      orb: "rgba(245,158,11,0.18)",
    },
  };

  const theme = themes[category];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();

        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "message") {
      setCharCount(e.target.value.length);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/auth/contact", {
        ...form,
        category,
      });

      setSent(true);

      setTimeout(() => {
        setSent(false);
        setForm({ name: "", email: "", message: "" });
        setCharCount(0);
      }, 3500);
    } catch (error: any) {
      alert(error.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .contact-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #080b14;
          color: #e8eaf0;
          position: relative;
          overflow: hidden;
        }

        .contact-root * {
          box-sizing: border-box;
        }

        .bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          transition: all 0.8s ease;
        }

        .bg-orb-1 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, var(--orb) 0%, transparent 70%);
          top: -100px;
          left: -100px;
        }

        .bg-orb-2 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, var(--soft) 0%, transparent 70%);
          bottom: -100px;
          right: -50px;
        }

        .bg-orb-3 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, var(--glow) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
        }

        .inner {
          position: relative;
          z-index: 10;
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 24px;
        }

        .header {
          margin-bottom: 64px;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--primary);
          background: var(--soft);
          border: 1px solid var(--border);
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 20px;
        }

        .eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--primary);
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.7);
          }
        }

        .headline {
          font-family: 'Syne', sans-serif;
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 16px;
        }

        .headline span {
          background: linear-gradient(135deg, var(--primary), var(--secondary), #67e8f9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subheadline {
          font-size: 16px;
          color: #94a3b8;
          line-height: 1.7;
          max-width: 440px;
          font-weight: 300;
        }

        .categories {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-bottom: 40px;
        }

        .cat-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 14px 12px;
          cursor: pointer;
          transition: all 0.25s ease;
          text-align: left;
          position: relative;
          overflow: hidden;
        }

        .cat-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--soft), rgba(255,255,255,0.03));
          opacity: 0;
          transition: opacity 0.25s ease;
          border-radius: 14px;
        }

        .cat-btn:hover::before,
        .cat-btn.active::before {
          opacity: 1;
        }

        .cat-btn.active {
          border-color: var(--border);
          box-shadow: 0 0 0 1px var(--glow), 0 10px 35px var(--glow);
        }

        .cat-icon {
          font-size: 18px;
          margin-bottom: 6px;
          display: block;
          color: var(--primary);
          transition: transform 0.2s;
          position: relative;
          z-index: 1;
        }

        .cat-btn.active .cat-icon {
          transform: scale(1.2);
        }

        .cat-label {
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #e2e8f0;
          display: block;
          position: relative;
          z-index: 1;
        }

        .cat-desc {
          font-size: 11px;
          color: #64748b;
          display: block;
          margin-top: 2px;
          position: relative;
          z-index: 1;
        }

        .layout {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 24px;
          align-items: start;
        }

        .info-panel {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .info-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          transition: all 0.25s ease;
        }

        .info-card:hover {
          border-color: var(--border);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }

        .info-card-accent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
        }

        .info-label {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 12px;
          font-weight: 700;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }

        .info-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .info-icon-wrap {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--soft);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          flex-shrink: 0;
          color: var(--primary);
        }

        .info-text {
          font-size: 13.5px;
          color: #cbd5e1;
        }

        .status-card {
          background: linear-gradient(135deg, rgba(16,185,129,0.08), rgba(6,182,212,0.05));
          border: 1px solid rgba(16,185,129,0.2);
          border-radius: 18px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .status-dot-wrap {
          position: relative;
          width: 12px;
          height: 12px;
          flex-shrink: 0;
        }

        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #10b981;
          position: absolute;
          top: 1px;
          left: 1px;
        }

        .status-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1.5px solid #10b981;
          animation: ping 2s cubic-bezier(0,0,0.2,1) infinite;
        }

        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 0.75;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        .status-text {
          font-size: 13px;
          color: #6ee7b7;
          line-height: 1.5;
        }

        .form-panel {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 36px;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }

        .form-panel::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--primary), var(--secondary), transparent);
        }

        .form-title {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 6px;
        }

        .form-subtitle {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 28px;
        }

        .category-name {
          color: var(--primary);
          font-weight: 700;
        }

        .field {
          position: relative;
          margin-bottom: 18px;
        }

        .field-label {
          display: block;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 8px;
          font-weight: 700;
          transition: color 0.2s;
        }

        .field.focused .field-label {
          color: var(--primary);
        }

        .field-input,
        .field-textarea {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 14px 16px;
          color: #e2e8f0;
          font-family: 'DM Sans', sans-serif;
          font-size: 14.5px;
          outline: none;
          transition: all 0.25s ease;
          caret-color: var(--primary);
        }

        .field-input::placeholder,
        .field-textarea::placeholder {
          color: #475569;
        }

        .field-input:focus,
        .field-textarea:focus {
          border-color: var(--border);
          background: var(--soft);
          box-shadow: 0 0 0 3px var(--glow);
        }

        .field-textarea {
          resize: none;
          line-height: 1.65;
        }

        .char-count {
          position: absolute;
          bottom: 12px;
          right: 14px;
          font-size: 11px;
          color: #475569;
          pointer-events: none;
          font-family: 'Syne', monospace;
        }

        .char-count.warn {
          color: #f59e0b;
        }

        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border: none;
          border-radius: 12px;
          padding: 16px;
          color: #ffffff;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          margin-top: 8px;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--secondary), var(--primary));
          opacity: 0;
          transition: opacity 0.3s;
        }

        .submit-btn:hover::before {
          opacity: 1;
        }

        .submit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 16px 40px var(--glow);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .submit-btn span {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .success-overlay {
          position: absolute;
          inset: 0;
          background: rgba(8,11,20,0.96);
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          z-index: 20;
          animation: fade-in 0.4s ease;
          backdrop-filter: blur(4px);
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.97);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .success-icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(16,185,129,0.2), rgba(6,182,212,0.1));
          border: 1px solid rgba(16,185,129,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          animation: pop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.1s both;
        }

        @keyframes pop {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        .success-title {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #ffffff;
        }

        .success-sub {
          font-size: 14px;
          color: #64748b;
          text-align: center;
          max-width: 240px;
        }

        .success-bar {
          width: 200px;
          height: 3px;
          background: rgba(255,255,255,0.05);
          border-radius: 99px;
          overflow: hidden;
          margin-top: 8px;
        }

        .success-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          border-radius: 99px;
          animation: fill-bar 3.5s linear forwards;
        }

        @keyframes fill-bar {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        .social-row {
          display: flex;
          gap: 10px;
          margin-top: 4px;
        }

        .social-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
          color: #64748b;
          text-decoration: none;
        }

        .social-btn:hover {
          background: var(--soft);
          border-color: var(--border);
          color: var(--primary);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .layout {
            grid-template-columns: 1fr;
          }

          .inner {
            padding: 60px 18px;
          }

          .form-panel {
            padding: 26px;
          }
        }

        @media (max-width: 640px) {
          .categories {
            grid-template-columns: repeat(2, 1fr);
          }

          .headline {
            font-size: 38px;
          }
        }
      `}</style>

      <div
        className="contact-root"
        ref={sectionRef}
        style={
          {
            "--primary": theme.primary,
            "--secondary": theme.secondary,
            "--soft": theme.soft,
            "--border": theme.border,
            "--glow": theme.glow,
            "--orb": theme.orb,
          } as React.CSSProperties
        }
      >
        <div
          className="bg-orb bg-orb-1"
          style={{
            transform: `translate(${mousePos.x * 0.04}px, ${
              mousePos.y * 0.04
            }px)`,
          }}
        />

        <div
          className="bg-orb bg-orb-2"
          style={{
            transform: `translate(${-mousePos.x * 0.03}px, ${
              -mousePos.y * 0.03
            }px)`,
          }}
        />

        <div className="bg-orb bg-orb-3" />
        <div className="grid-bg" />

        <div className="inner">
          <div className="header">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Get In Touch
            </div>

            <h1 className="headline">
              We're here to <span>help you.</span>
            </h1>

            <p className="subheadline">
              Questions, complaints, or partnership ideas — reach our team and
              expect a thoughtful reply within 24 hours.
            </p>
          </div>

          <div className="categories">
            {categories.map((c) => (
              <button
                key={c.id}
                className={`cat-btn${category === c.id ? " active" : ""}`}
                onClick={() => setCategory(c.id)}
                type="button"
              >
                <span className="cat-icon">{c.icon}</span>
                <span className="cat-label">{c.label}</span>
                <span className="cat-desc">{c.desc}</span>
              </button>
            ))}
          </div>

          <div className="layout">
            <div className="info-panel">
              <div className="info-card">
                <div className="info-card-accent" />
                <div className="info-label">Contact Details</div>

                {[
                  { icon: "✉", text: "surajkumar854000@gmail.com" },
                  { icon: "✆", text: "+91 7250903724" },
                  { icon: "◎", text: "India" },
                ].map((item, i) => (
                  <div className="info-item" key={i}>
                    <div className="info-icon-wrap">{item.icon}</div>
                    <span className="info-text">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="status-card">
                <div className="status-dot-wrap">
                  <div className="status-ring" />
                  <div className="status-dot" />
                </div>

                <div className="status-text">
                  <strong
                    style={{
                      color: "#a7f3d0",
                      display: "block",
                      fontSize: 13,
                    }}
                  >
                    All systems operational
                  </strong>
                  Usually responding within 24 hours
                </div>
              </div>

              <div className="info-card">
                <div className="info-label">Find Us Online</div>

                <div className="social-row">
                  {["𝕏", "in", "gh", "yt"].map((s, i) => (
                    <a href="#" className="social-btn" key={i}>
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-panel">
              {sent && (
                <div className="success-overlay">
                  <div className="success-icon">✓</div>
                  <div className="success-title">Message Sent!</div>

                  <p className="success-sub">
                    We received your message and will get back to you soon.
                  </p>

                  <div className="success-bar">
                    <div className="success-bar-fill" />
                  </div>
                </div>
              )}

              <div className="form-title">Send a Message</div>

              <div className="form-subtitle">
                Category:{" "}
                <span className="category-name">
                  {categories.find((c) => c.id === category)?.label}
                </span>
              </div>

              <form onSubmit={handleSubmit}>
                <div className={`field${focused === "name" ? " focused" : ""}`}>
                  <label className="field-label">Your Name</label>

                  <input
                    className="field-input"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    placeholder="Suraj Kumar"
                    required
                  />
                </div>

                <div
                  className={`field${focused === "email" ? " focused" : ""}`}
                >
                  <label className="field-label">Email Address</label>

                  <input
                    className="field-input"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div
                  className={`field${focused === "message" ? " focused" : ""}`}
                >
                  <label className="field-label">Your Message</label>

                  <textarea
                    className="field-textarea"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    placeholder="Describe your inquiry in detail…"
                    rows={5}
                    required
                    maxLength={500}
                  />

                  <span
                    className={`char-count${charCount > 420 ? " warn" : ""}`}
                  >
                    {charCount}/500
                  </span>
                </div>

                <button className="submit-btn" type="submit" disabled={loading}>
                  <span>
                    {loading ? (
                      <>
                        <div className="spinner" />
                        Sending…
                      </>
                    ) : (
                      <>Send Message ↗</>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;