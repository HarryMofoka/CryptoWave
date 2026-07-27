import { useEffect, useId, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoMark, MenuIcon, WalletConnectIcon } from "../icons";
import styles from "./Navbar.module.css";

const ROUTED_MENU_ITEMS = [
  { index: "01", label: "CryptoCurrencies", href: "#top" },
  { index: "02", label: "Digital Assets", href: "#digital-assets" },
  { index: "03", label: "Create a Wallet", href: "#create-wallet" },
  { index: "04", label: "Exchange & Swap", href: "#fiat-exchange" },
  { index: "05", label: "Security Audits", href: "#security" },
];

interface NavbarProps {
  onOpenWalletModal?: () => void;
  connectedAddress?: string | null;
}

export function Navbar({ onOpenWalletModal, connectedAddress }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPillOpen, setMenuPillOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuPillOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          {/* Item 01 */}
          <a href="#top" className={styles.link}>
            <span className={styles.linkIndex}>[01]</span>
            CryptoCurrencies
          </a>

          {/* Item 02: Menu Pill Dropdown */}
          <div className={styles.menuPillContainer} ref={dropdownRef}>
            <button
              type="button"
              className={styles.menuPillBtn}
              onClick={() => setMenuPillOpen((prev) => !prev)}
              aria-expanded={menuPillOpen}
              aria-label="Navigation Menu"
            >
              <span className={styles.linkIndex}>[02]</span>
              <span>Menu</span>
              <span style={{ fontSize: "0.7rem", marginLeft: "2px" }}>{menuPillOpen ? "▲" : "▼"}</span>
            </button>

            <AnimatePresence>
              {menuPillOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className={styles.menuPillDropdown}
                >
                  {ROUTED_MENU_ITEMS.map((item) => (
                    <a
                      key={item.index}
                      href={item.href}
                      className={styles.dropdownItem}
                      onClick={() => setMenuPillOpen(false)}
                    >
                      <span className={styles.dropdownIndex}>[{item.index}]</span>
                      <span>{item.label}</span>
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Item 03 */}
          <a href="#create-wallet" className={styles.link}>
            <span className={styles.linkIndex}>[03]</span>
            Create a Wallet
          </a>

          {/* Item 04 */}
          <a href="#fiat-exchange" className={styles.link}>
            <span className={styles.linkIndex}>[04]</span>
            Exchange & Swap
          </a>
        </nav>

        <div className={styles.navRight}>
          <motion.button
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenWalletModal}
            className={`${styles.connectBtn} ${connectedAddress ? styles.connectBtnActive : ""}`}
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
        {ROUTED_MENU_ITEMS.map((item) => (
          <a
            key={item.index}
            href={item.href}
            className={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            <span className={styles.linkIndex}>[{item.index}]</span>
            {item.label}
          </a>
        ))}

        <div className={styles.mobileConnectWrap}>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              if (onOpenWalletModal) onOpenWalletModal();
            }}
            className={styles.mobileConnectBtn}
          >
            {connectedAddress ? connectedAddress : "Connect Wallet"}
          </button>
        </div>
      </nav>
    </header>
  );
}