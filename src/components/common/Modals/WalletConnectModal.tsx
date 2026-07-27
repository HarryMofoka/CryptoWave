import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BitcoinIcon, SafeBrowserIcon, WalletConnectIcon, RippleXIcon } from "../../icons";
import styles from "./WalletConnectModal.module.css";

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletName: string, address: string) => void;
}

const WALLETS = [
  {
    id: "metamask",
    name: "MetaMask",
    desc: "Browser extension & mobile key storage",
    badge: "Popular",
    icon: <BitcoinIcon size={20} />,
  },
  {
    id: "phantom",
    name: "Phantom Vault",
    desc: "Multi-chain Solana & Bitcoin Web3 key",
    badge: "Fast",
    icon: <RippleXIcon size={20} />,
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    desc: "Scan QR code with 300+ mobile wallets",
    badge: "Universal",
    icon: <WalletConnectIcon size={20} />,
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    desc: "Self-custody account abstraction wallet",
    badge: "Secure",
    icon: <SafeBrowserIcon size={20} />,
  },
];

export function WalletConnectModal({ isOpen, onClose, onConnect }: WalletConnectModalProps) {
  const [connectingId, setConnectingId] = useState<string | null>(null);

  const handleSelect = (wallet: (typeof WALLETS)[0]) => {
    setConnectingId(wallet.id);
    setTimeout(() => {
      const mockAddress = "0x" + Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join("") + "...8F9";
      onConnect(wallet.name, mockAddress);
      setConnectingId(null);
      onClose();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.backdrop}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={styles.overlay}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className={styles.modal}
          >
            <div className={styles.header}>
              <div className={styles.headerTitleWrap}>
                <div className={styles.headerIcon}>
                  <WalletConnectIcon size={22} />
                </div>
                <div>
                  <h3 className={styles.title}>Connect Web3 Wallet</h3>
                  <p className={styles.subtitle}>Select self-custody provider</p>
                </div>
              </div>
              <button type="button" onClick={onClose} className={styles.closeBtn}>
                &times;
              </button>
            </div>

            <div className={styles.list}>
              {WALLETS.map((w) => {
                const isConnecting = connectingId === w.id;
                return (
                  <motion.button
                    key={w.id}
                    type="button"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(w)}
                    disabled={connectingId !== null}
                    className={`${styles.walletBtn} ${isConnecting ? styles.walletBtnActive : ""}`}
                  >
                    <div className={styles.walletInfo}>
                      <div className={styles.walletIconBox}>{w.icon}</div>
                      <div>
                        <div className={styles.walletNameRow}>
                          <span className={styles.walletName}>{w.name}</span>
                          <span className={styles.badge}>{w.badge}</span>
                        </div>
                        <span className={styles.walletDesc}>{w.desc}</span>
                      </div>
                    </div>

                    {isConnecting ? (
                      <span className={styles.connectingText}>Connecting...</span>
                    ) : (
                      <span className={styles.arrow}>&rarr;</span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            <div className={styles.footerNote}>
              <span>Encrypted 256-bit Connection</span>
              <span>Self-Custody</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
