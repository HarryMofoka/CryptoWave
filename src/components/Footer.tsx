import { useState } from "react";
import { motion } from "framer-motion";
import { LogoMark } from "./icons";
import styles from "./Footer.module.css";

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
    }, 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.root}>
      <div className={styles.glow} />

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <a href="#top" className={styles.brandLogo}>
              <LogoMark size={38} />
              <span className={styles.brandTitle}>CryptoWave</span>
            </a>
            <p className={styles.brandDesc}>
              Leading decentralized self-custody platform. Empowering instant cross-chain swaps, encrypted cloud vaults, and Web3 ecosystem access.
            </p>
          </div>

          {/* Platform Directory */}
          <div>
            <h4 className={styles.colHeading}>Platform</h4>
            <ul className={styles.linkList}>
              <li><a href="#top" className={styles.linkItem}>Home Overview</a></li>
              <li><a href="#digital-assets" className={styles.linkItem}>Digital Assets</a></li>
              <li><a href="#create-wallet" className={styles.linkItem}>Create Wallet</a></li>
              <li><a href="#fiat-exchange" className={styles.linkItem}>Cross-Chain Swap</a></li>
              <li><a href="#security" className={styles.linkItem}>Smart Contract Audits</a></li>
            </ul>
          </div>

          {/* Developers & Governance */}
          <div>
            <h4 className={styles.colHeading}>Resources</h4>
            <ul className={styles.linkList}>
              <li><a href="https://github.com/HarryMofoka/CryptoWave" target="_blank" rel="noreferrer" className={styles.linkItem}>Developer SDK & APIs</a></li>
              <li><a href="#security" className={styles.linkItem}>AES-256 Vault Backup</a></li>
              <li><a href="#security" className={styles.linkItem}>Security Bug Bounty</a></li>
              <li><a href="#top" className={styles.linkItem}>Protocol Documentation</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className={styles.colHeading}>Stay Informed</h4>
            <p className={styles.newsletterDesc}>
              Subscribe to weekly Web3 market analysis and protocol releases.
            </p>

            <form onSubmit={handleSubmit} className={styles.subscribeForm}>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.emailInput}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={styles.subscribeBtn}
                >
                  Join
                </motion.button>
              </div>
              {subscribed && (
                <span className={styles.subscribedNotice}>
                  ✓ Subscribed to CryptoWave Alpha
                </span>
              )}
            </form>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div>
            &copy; {year} CryptoWave. Self-Custody Multi-Chain Platform. All rights reserved.
          </div>

          <div className={styles.legalLinks}>
            <a href="#privacy" className={styles.legalLink}>Privacy Policy</a>
            <a href="#terms" className={styles.legalLink}>Terms of Service</a>
            <a href="#security" className={styles.legalLink}>Security Disclosure</a>

            <motion.button
              type="button"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className={styles.scrollTopBtn}
            >
              ↑
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
