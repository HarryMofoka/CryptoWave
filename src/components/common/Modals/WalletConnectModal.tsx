import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BitcoinIcon, WalletConnectIcon, SafeBrowserIcon } from "../../icons";

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletName: string, address: string) => void;
}

const WALLETS = [
  {
    id: "metamask",
    name: "MetaMask",
    desc: "Connect using browser extension or mobile app",
    badge: "Popular",
    iconColor: "from-amber-500 to-orange-600",
  },
  {
    id: "phantom",
    name: "Phantom Vault",
    desc: "Multi-chain Solana & Bitcoin Web3 wallet",
    badge: "Fast",
    iconColor: "from-purple-500 to-indigo-600",
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    desc: "Scan QR code with 300+ mobile wallets",
    badge: "Universal",
    iconColor: "from-blue-500 to-cyan-500",
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    desc: "Self-custody wallet & dApp browser",
    badge: "Secure",
    iconColor: "from-emerald-500 to-teal-600",
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
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0, 0, 0, 0.75)",
              backdropFilter: "blur(12px)",
            }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "460px",
              background: "rgba(18, 20, 26, 0.92)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "24px",
              padding: "28px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              zIndex: 10,
              color: "#fff",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "12px", background: "linear-gradient(135deg, #f59e0b, #d97706)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <WalletConnectIcon size={22} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 600, color: "#fff" }}>Connect Web3 Wallet</h3>
                  <p style={{ margin: "2px 0 0", fontSize: "0.8rem", color: "#9ca3af" }}>Choose your provider to access self-custody features</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  color: "#9ca3af",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                }}
              >
                &times;
              </button>
            </div>

            {/* Wallet Options List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {WALLETS.map((w) => {
                const isConnecting = connectingId === w.id;
                return (
                  <motion.button
                    key={w.id}
                    type="button"
                    whileHover={{ scale: 1.015, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(w)}
                    disabled={connectingId !== null}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 16px",
                      background: isConnecting ? "rgba(245, 158, 11, 0.15)" : "rgba(255, 255, 255, 0.04)",
                      border: isConnecting ? "1px solid rgba(245, 158, 11, 0.5)" : "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "16px",
                      cursor: connectingId !== null ? "wait" : "pointer",
                      textAlign: "left",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(255, 255, 255, 0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {w.id === "metamask" ? <BitcoinIcon size={20} /> : w.id === "walletconnect" ? <WalletConnectIcon size={20} /> : <SafeBrowserIcon size={20} />}
                      </div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontWeight: 600, fontSize: "0.95rem", color: "#fff" }}>{w.name}</span>
                          <span style={{ fontSize: "0.7rem", padding: "2px 6px", borderRadius: "6px", background: "rgba(255, 255, 255, 0.1)", color: "#d1d5db", fontWeight: 500 }}>
                            {w.badge}
                          </span>
                        </div>
                        <span style={{ fontSize: "0.78rem", color: "#9ca3af" }}>{w.desc}</span>
                      </div>
                    </div>

                    {isConnecting ? (
                      <span style={{ fontSize: "0.8rem", color: "#f59e0b", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ width: "12px", height: "12px", borderRadius: "50%", border: "2px solid #f59e0b", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
                        Connecting...
                      </span>
                    ) : (
                      <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>&rarr;</span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Footer Note */}
            <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", alignItems: "center", justifyContent: "between", fontSize: "0.78rem", color: "#6b7280" }}>
              <span>🔒 Encrypted 256-bit Self-Custody Connection</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
