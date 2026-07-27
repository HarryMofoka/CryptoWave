import { useEffect, useId, useState } from "react";
import { motion } from "framer-motion";
import { LogoMark, MenuIcon, WalletConnectIcon } from "../icons";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { index: "01", label: "CryptoCurrencies", href: "#crypto-currencies" },
  { index: "02", label: "Digital Assets", href: "#digital-assets" },
  { index: "03", label: "Create a Wallet", href: "#create-wallet" },
  { index: "04", label: "Exchange & Swap", href: "#fiat-exchange" },
];

interface NavbarProps {
  onOpenWalletModal?: () => void;
  connectedAddress?: string | null;
}

export function Navbar({ onOpenWalletModal, connectedAddress }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const query = window.matchMedia("(min-width: 900px)");
    const handleChange = () => setMenuOpen(false);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#top" className={styles.logo} aria-label="CryptoWave home">
          <LogoMark size={42} />
        </a>

        <nav className={styles.links} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a key={link.index} href={link.href} className={styles.link}>
              <span className={styles.linkIndex}>[{link.index}]</span>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Connect Wallet Button */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <motion.button
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenWalletModal}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "14px",
              background: connectedAddress
                ? "rgba(16, 185, 129, 0.15)"
                : "linear-gradient(135deg, #f59e0b, #d97706)",
              border: connectedAddress
                ? "1px solid rgba(16, 185, 129, 0.4)"
                : "none",
              color: connectedAddress ? "#10b981" : "#000000",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
              boxShadow: connectedAddress
                ? "0 4px 14px rgba(16, 185, 129, 0.2)"
                : "0 4px 14px rgba(245, 158, 11, 0.35)",
            }}
          >
            <WalletConnectIcon size={18} />
            <span>{connectedAddress ? connectedAddress : "Connect Wallet"}</span>
          </motion.button>

          <button
            type="button"
            className={styles.menuToggle}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      <nav
        id={menuId}
        aria-label="Primary mobile"
        className={`${styles.mobilePanel} ${menuOpen ? styles.mobilePanelOpen : ""}`}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.index}
            href={link.href}
            className={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            <span className={styles.linkIndex}>[{link.index}]</span>
            {link.label}
          </a>
        ))}

        <div style={{ padding: "16px 20px" }}>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              if (onOpenWalletModal) onOpenWalletModal();
            }}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              border: "none",
              color: "#000",
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            {connectedAddress ? connectedAddress : "Connect Wallet"}
          </button>
        </div>
      </nav>
    </header>
  );
}