import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CubeIcon, SafeBrowserIcon, SwapArrowsIcon, RippleXIcon } from "../../icons";
import styles from "./DAppBrowserModal.module.css";

interface DAppBrowserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunch?: (dappName: string) => void;
}

const DAPPS = [
  { id: "uniswap", name: "Uniswap v3", category: "DeFi", desc: "Automated liquidity protocol & spot exchange", icon: <SwapArrowsIcon size={18} /> },
  { id: "opensea", name: "OpenSea Pro", category: "NFTs", desc: "Aggregated Web3 NFT marketplace & analytics", icon: <CubeIcon size={18} /> },
  { id: "aave", name: "Aave v3", category: "DeFi", desc: "Non-custodial liquidity protocol for earning yield", icon: <RippleXIcon size={18} /> },
  { id: "lido", name: "Lido Finance", category: "Staking", desc: "Liquid staking solution for Ethereum & Solana", icon: <SafeBrowserIcon size={18} /> },
  { id: "blur", name: "Blur IO", category: "NFTs", desc: "Pro NFT trading platform for professional traders", icon: <CubeIcon size={18} /> },
  { id: "gmx", name: "GMX Perpetual", category: "DeFi", desc: "Decentralized perpetual swap exchange with 0.05% fee", icon: <SwapArrowsIcon size={18} /> },
];

export function DAppBrowserModal({ isOpen, onClose, onLaunch }: DAppBrowserModalProps) {
  const [selectedCat, setSelectedCat] = useState("All");

  const filteredDApps = selectedCat === "All" ? DAPPS : DAPPS.filter((d) => d.category === selectedCat);

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
                  <CubeIcon size={20} />
                </div>
                <div>
                  <h3 className={styles.title}>Web3 dApp Directory</h3>
                  <span className={styles.subtitle}>Verified On-Chain Protocols</span>
                </div>
              </div>
              <button type="button" onClick={onClose} className={styles.closeBtn}>
                &times;
              </button>
            </div>

            <div className={styles.catRow}>
              {["All", "DeFi", "NFTs", "Staking"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCat(cat)}
                  className={`${styles.catTab} ${selectedCat === cat ? styles.catTabActive : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className={styles.dappGrid}>
              {filteredDApps.map((dapp) => (
                <motion.div key={dapp.id} className={styles.dappCard}>
                  <div className={styles.dappInfo}>
                    <div className={styles.dappIconBox}>{dapp.icon}</div>
                    <div>
                      <div className={styles.dappNameRow}>
                        <span className={styles.dappName}>{dapp.name}</span>
                        <span className={styles.categoryTag}>{dapp.category}</span>
                      </div>
                      <span className={styles.dappDesc}>{dapp.desc}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (onLaunch) onLaunch(dapp.name);
                      onClose();
                    }}
                    className={styles.launchBtn}
                  >
                    Launch
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
