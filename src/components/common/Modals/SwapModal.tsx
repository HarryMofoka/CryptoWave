import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SwapArrowsIcon } from "../../icons";

interface SwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (msg: string) => void;
}

const TOKENS = [
  { symbol: "BTC", name: "Bitcoin", price: 92450.0, balance: "0.0495" },
  { symbol: "ETH", name: "Ethereum", price: 3420.5, balance: "1.820" },
  { symbol: "SOL", name: "Solana", price: 184.2, balance: "24.50" },
  { symbol: "USDT", name: "Tether USD", price: 1.0, balance: "4895.20" },
];

export function SwapModal({ isOpen, onClose, onSuccess }: SwapModalProps) {
  const [fromToken, setFromToken] = useState(TOKENS[0]);
  const [toToken, setToToken] = useState(TOKENS[1]);
  const [fromAmount, setFromAmount] = useState<string>("0.01");
  const [swapping, setSwapping] = useState(false);

  const numAmount = parseFloat(fromAmount) || 0;
  const calculatedToAmount = ((numAmount * fromToken.price) / toToken.price).toFixed(4);

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  const handleExecuteSwap = () => {
    if (numAmount <= 0) return;
    setSwapping(true);
    setTimeout(() => {
      setSwapping(false);
      if (onSuccess) {
        onSuccess(`Successfully swapped ${fromAmount} ${fromToken.symbol} to ${calculatedToAmount} ${toToken.symbol}!`);
      }
      onClose();
    }, 1500);
  };

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
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "440px",
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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "12px", background: "linear-gradient(135deg, #3b82f6, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <SwapArrowsIcon size={20} />
                </div>
                <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600 }}>Instant Multi-Chain Swap</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                style={{ background: "rgba(255, 255, 255, 0.08)", border: "none", borderRadius: "50%", width: "30px", height: "30px", color: "#9ca3af", cursor: "pointer" }}
              >
                &times;
              </button>
            </div>

            {/* From Token Input */}
            <div style={{ background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "18px", padding: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "#9ca3af", marginBottom: "6px" }}>
                <span>You Pay</span>
                <span>Balance: {fromToken.balance} {fromToken.symbol}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#fff",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                  }}
                  placeholder="0.0"
                />
                <select
                  value={fromToken.symbol}
                  onChange={(e) => setFromToken(TOKENS.find((t) => t.symbol === e.target.value) || TOKENS[0])}
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "12px",
                    color: "#fff",
                    padding: "6px 12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  {TOKENS.map((t) => (
                    <option key={t.symbol} value={t.symbol} style={{ background: "#12141a", color: "#fff" }}>
                      {t.symbol}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "4px" }}>
                ≈ ${(numAmount * fromToken.price).toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
              </div>
            </div>

            {/* Swap Direction Toggle Button */}
            <div style={{ display: "flex", justifyContent: "center", margin: "-10px 0", position: "relative", zIndex: 2 }}>
              <motion.button
                type="button"
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSwapTokens}
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #eab308)",
                  border: "3px solid #12141a",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#000",
                  boxShadow: "0 4px 12px rgba(245, 158, 11, 0.4)",
                }}
              >
                &uarr;&darr;
              </motion.button>
            </div>

            {/* To Token Output */}
            <div style={{ background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "18px", padding: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "#9ca3af", marginBottom: "6px" }}>
                <span>You Receive (Estimated)</span>
                <span>Balance: {toToken.balance} {toToken.symbol}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#f59e0b" }}>{calculatedToAmount}</div>
                <select
                  value={toToken.symbol}
                  onChange={(e) => setToToken(TOKENS.find((t) => t.symbol === e.target.value) || TOKENS[1])}
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "12px",
                    color: "#fff",
                    padding: "6px 12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  {TOKENS.map((t) => (
                    <option key={t.symbol} value={t.symbol} style={{ background: "#12141a", color: "#fff" }}>
                      {t.symbol}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "4px" }}>
                1 {fromToken.symbol} = {(fromToken.price / toToken.price).toFixed(4)} {toToken.symbol}
              </div>
            </div>

            {/* Swap Rate Details */}
            <div style={{ marginTop: "14px", padding: "10px 12px", borderRadius: "12px", background: "rgba(255, 255, 255, 0.02)", fontSize: "0.78rem", color: "#9ca3af" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span>Network Slippage Tolerance</span>
                <span style={{ color: "#10b981", fontWeight: 600 }}>0.1% (Auto)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Estimated Gas Fee</span>
                <span>~$0.45 (0.05%)</span>
              </div>
            </div>

            {/* Execute Button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleExecuteSwap}
              disabled={swapping || numAmount <= 0}
              style={{
                marginTop: "18px",
                width: "100%",
                padding: "14px",
                borderRadius: "16px",
                background: swapping ? "#4b5563" : "linear-gradient(135deg, #f59e0b, #d97706)",
                border: "none",
                color: "#000",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: swapping ? "wait" : "pointer",
                boxShadow: "0 8px 20px rgba(245, 158, 11, 0.3)",
              }}
            >
              {swapping ? "Processing On-Chain Swap..." : `Confirm Swap (${fromToken.symbol} → ${toToken.symbol})`}
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
