import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CubeIcon } from "../../icons";

interface DAppBrowserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunch?: (dappName: string) => void;
}

const DAPPS = [
  { id: "uniswap", name: "Uniswap v3", category: "DeFi", desc: "Automated liquidity protocol & spot exchange", users: "1.2M", icon: "🦄" },
  { id: "opensea", name: "OpenSea Pro", category: "NFTs", desc: "Aggregated Web3 NFT marketplace & analytics", users: "850K", icon: "⛵" },
  { id: "aave", name: "Aave v3", category: "DeFi", desc: "Non-custodial liquidity protocol for earning interest", users: "640K", icon: "👻" },
  { id: "blur", name: "Blur IO", category: "NFTs", desc: "Pro NFT trading platform for professional traders", users: "410K", icon: "⚡" },
  { id: "lido", name: "Lido Finance", category: "Staking", desc: "Liquid staking solution for Ethereum & Solana", users: "980K", icon: "🏝️" },
  { id: "gmx", name: "GMX Perpetual", category: "DeFi", desc: "Decentralized perpetual swap exchange with zero slippage", users: "320K", icon: "🫐" },
];

export function DAppBrowserModal({ isOpen, onClose, onLaunch }: DAppBrowserModalProps) {
  const [selectedCat, setSelectedCat] = useState("All");

  const filteredDApps = selectedCat === "All" ? DAPPS : DAPPS.filter((d) => d.category === selectedCat);

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: "absolute", inset: 0, background: "rgba(0, 0, 0, 0.78)", backdropFilter: "blur(12px)" }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "520px",
              background: "rgba(18, 20, 26, 0.95)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
              zIndex: 10,
              color: "#fff",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "12px", background: "linear-gradient(135deg, #ec4899, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CubeIcon size={22} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 600 }}>Web3 dApp Ecosystem</h3>
                  <span style={{ fontSize: "0.78rem", color: "#9ca3af" }}>5,000+ Verified On-Chain Protocols</span>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                style={{ background: "rgba(255, 255, 255, 0.08)", border: "none", borderRadius: "50%", width: "30px", height: "30px", color: "#9ca3af", cursor: "pointer" }}
              >
                &times;
              </button>
            </div>

            {/* Category Filter Tabs */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px", overflowX: "auto", paddingBottom: "4px" }}>
              {["All", "DeFi", "NFTs", "Staking"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCat(cat)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "12px",
                    border: "none",
                    background: selectedCat === cat ? "linear-gradient(135deg, #ec4899, #8b5cf6)" : "rgba(255, 255, 255, 0.06)",
                    color: selectedCat === cat ? "#fff" : "#9ca3af",
                    fontWeight: selectedCat === cat ? 600 : 400,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* dApp List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "280px", overflowY: "auto" }}>
              {filteredDApps.map((dapp) => (
                <motion.div
                  key={dapp.id}
                  whileHover={{ scale: 1.01, background: "rgba(255, 255, 255, 0.07)" }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 14px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "16px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "1.4rem" }}>{dapp.icon}</span>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontWeight: 600, fontSize: "0.92rem", color: "#fff" }}>{dapp.name}</span>
                        <span style={{ fontSize: "0.7rem", padding: "2px 6px", borderRadius: "6px", background: "rgba(236, 72, 153, 0.15)", color: "#f472b6" }}>
                          {dapp.category}
                        </span>
                      </div>
                      <span style={{ fontSize: "0.76rem", color: "#9ca3af" }}>{dapp.desc}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (onLaunch) onLaunch(dapp.name);
                      onClose();
                    }}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "10px",
                      border: "none",
                      background: "rgba(255, 255, 255, 0.1)",
                      color: "#fff",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
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
