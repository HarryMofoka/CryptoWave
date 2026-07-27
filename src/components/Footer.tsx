import { useState } from "react";
import { motion } from "framer-motion";
import { LogoMark } from "./icons";

interface FooterProps {
  onSubscribe?: (email: string) => void;
}

export default function Footer({ onSubscribe }: FooterProps) {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    if (onSubscribe) onSubscribe(email);
    setTimeout(() => {
      setEmail("");
    }, 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        position: "relative",
        background: "rgba(10, 11, 15, 0.95)",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        paddingTop: "64px",
        paddingBottom: "48px",
        color: "#9ca3af",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Background Subtle Radial Glow */}
      <div
        style={{
          position: "absolute",
          top: "-150px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "300px",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, rgba(0,0,0,0) 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        {/* Main Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "40px",
            marginBottom: "48px",
          }}
        >
          {/* Brand Column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <LogoMark size={38} />
              <span
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  letterSpacing: "-0.5px",
                  background: "linear-gradient(135deg, #ffffff, #d1d5db)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                CryptoWave
              </span>
            </div>
            <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "#9ca3af", marginBottom: "20px" }}>
              The leading decentralized multi-chain self-custody platform. Empowering instant swaps, encrypted vaults, and Web3 freedom.
            </p>

            {/* Network Status Pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 12px",
                borderRadius: "20px",
                background: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.25)",
                fontSize: "0.78rem",
                color: "#10b981",
                fontWeight: 600,
              }}
            >
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
              Mainnet Operational • 14ms ping
            </div>
          </div>

          {/* Navigation Links Column */}
          <div>
            <h4 style={{ color: "#fff", fontSize: "0.95rem", fontWeight: 600, marginBottom: "18px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Platform
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.88rem" }}>
              <li>
                <a href="#top" style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }}>
                  Home & Overview
                </a>
              </li>
              <li>
                <a href="#digital-assets" style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }}>
                  Digital Assets
                </a>
              </li>
              <li>
                <a href="#create-wallet" style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }}>
                  Create Self-Custody Wallet
                </a>
              </li>
              <li>
                <a href="#fiat-exchange" style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }}>
                  Buy, Sell & Swap
                </a>
              </li>
              <li>
                <a href="#ecosystem" style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }}>
                  Web3 dApps Ecosystem
                </a>
              </li>
            </ul>
          </div>

          {/* Security & Resources Column */}
          <div>
            <h4 style={{ color: "#fff", fontSize: "0.95rem", fontWeight: 600, marginBottom: "18px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Resources & Security
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.88rem" }}>
              <li>
                <a href="#security" style={{ color: "#9ca3af", textDecoration: "none" }}>
                  Smart Contract Audits
                </a>
              </li>
              <li>
                <a href="https://github.com/HarryMofoka/CryptoWave" target="_blank" rel="noreferrer" style={{ color: "#9ca3af", textDecoration: "none" }}>
                  Developer SDK & APIs
                </a>
              </li>
              <li>
                <a href="#top" style={{ color: "#9ca3af", textDecoration: "none" }}>
                  AES-256 Cloud Vault Backup
                </a>
              </li>
              <li>
                <a href="#top" style={{ color: "#9ca3af", textDecoration: "none" }}>
                  Security Bug Bounty ($50k)
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 style={{ color: "#fff", fontSize: "0.95rem", fontWeight: 600, marginBottom: "18px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Stay Ahead in Web3
            </h4>
            <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginBottom: "14px" }}>
              Get weekly market intelligence, alpha alerts, and platform update notes.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "10px 14px",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#fff",
                    fontSize: "0.85rem",
                    outline: "none",
                  }}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #f59e0b, #d97706)",
                    border: "none",
                    color: "#000",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  Join
                </motion.button>
              </div>
              {subscribed && (
                <span style={{ fontSize: "0.78rem", color: "#10b981", marginTop: "4px" }}>
                  ✓ Thank you! You're subscribed to CryptoWave Alpha.
                </span>
              )}
            </form>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255, 255, 255, 0.08)", marginBottom: "32px" }} />

        {/* Footer Bottom Bar */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", fontSize: "0.82rem", color: "#6b7280" }}>
          <div>
            &copy; {year} CryptoWave. Decentralized Multi-Chain Platform. All rights reserved.
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <a href="#privacy" style={{ color: "#6b7280", textDecoration: "none" }}>Privacy Policy</a>
            <a href="#terms" style={{ color: "#6b7280", textDecoration: "none" }}>Terms of Service</a>
            <a href="#cookies" style={{ color: "#6b7280", textDecoration: "none" }}>Security Disclosure</a>
            
            <motion.button
              type="button"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              aria-label="Scroll to top"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                marginLeft: "12px",
              }}
            >
              ↑
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
