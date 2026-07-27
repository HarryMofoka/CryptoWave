import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoMark, WalletConnectIcon } from "../icons";
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
  const [menuPillOpen, setMenuPillOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuPillOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Logo */}
        <a href="#top" className={styles.logo} aria-label="CryptoWave home">
          <LogoMark size={42} />
        </a>

        {/* Only the Menu Button */}
        <div className={styles.menuPillContainer} ref={dropdownRef}>
          <motion.button
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className={styles.menuPillBtn}
            onClick={() => setMenuPillOpen((prev) => !prev)}
            aria-expanded={menuPillOpen}
            aria-label="Navigation Menu"
          >
            <span>Menu</span>
            <span style={{ fontSize: "0.7rem" }}>{menuPillOpen ? "▲" : "▼"}</span>
          </motion.button>

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

                <div className={styles.dropdownDivider} />

                <button
                  type="button"
                  onClick={() => {
                    setMenuPillOpen(false);
                    if (onOpenWalletModal) onOpenWalletModal();
                  }}
                  className={`${styles.dropdownConnectBtn} ${connectedAddress ? styles.dropdownConnectActive : ""}`}
                >
                  <WalletConnectIcon size={16} />
                  <span>{connectedAddress ? connectedAddress : "Connect Wallet"}</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}