import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SwapArrowsIcon } from "../../icons";
import styles from "./SwapModal.module.css";

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
        onSuccess(`Swapped ${fromAmount} ${fromToken.symbol} → ${calculatedToAmount} ${toToken.symbol}`);
      }
      onClose();
    }, 1200);
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
                  <SwapArrowsIcon size={20} />
                </div>
                <h3 className={styles.title}>Cross-Chain Swap</h3>
              </div>
              <button type="button" onClick={onClose} className={styles.closeBtn}>
                &times;
              </button>
            </div>

            {/* From Token */}
            <div className={styles.tokenCard}>
              <div className={styles.cardHeader}>
                <span>You Pay</span>
                <span>Bal: {fromToken.balance} {fromToken.symbol}</span>
              </div>
              <div className={styles.inputRow}>
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className={styles.amountInput}
                  placeholder="0.0"
                />
                <select
                  value={fromToken.symbol}
                  onChange={(e) => setFromToken(TOKENS.find((t) => t.symbol === e.target.value) || TOKENS[0])}
                  className={styles.tokenSelect}
                >
                  {TOKENS.map((t) => (
                    <option key={t.symbol} value={t.symbol} className={styles.tokenOption}>
                      {t.symbol}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.usdValue}>
                ≈ ${(numAmount * fromToken.price).toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
              </div>
            </div>

            {/* Swap Button */}
            <div className={styles.swapToggleWrap}>
              <motion.button
                type="button"
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSwapTokens}
                className={styles.swapToggleBtn}
              >
                &uarr;&darr;
              </motion.button>
            </div>

            {/* To Token */}
            <div className={styles.tokenCard}>
              <div className={styles.cardHeader}>
                <span>You Receive</span>
                <span>Bal: {toToken.balance} {toToken.symbol}</span>
              </div>
              <div className={styles.inputRow}>
                <div className={styles.calculatedValue}>{calculatedToAmount}</div>
                <select
                  value={toToken.symbol}
                  onChange={(e) => setToToken(TOKENS.find((t) => t.symbol === e.target.value) || TOKENS[1])}
                  className={styles.tokenSelect}
                >
                  {TOKENS.map((t) => (
                    <option key={t.symbol} value={t.symbol} className={styles.tokenOption}>
                      {t.symbol}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.usdValue}>
                1 {fromToken.symbol} = {(fromToken.price / toToken.price).toFixed(4)} {toToken.symbol}
              </div>
            </div>

            {/* Rate Info */}
            <div className={styles.rateCard}>
              <div className={styles.rateRow}>
                <span>Slippage Tolerance</span>
                <span className={styles.rateHighlight}>0.1%</span>
              </div>
              <div className={styles.rateRow}>
                <span>Protocol Fee</span>
                <span>0.05%</span>
              </div>
            </div>

            {/* Action */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleExecuteSwap}
              disabled={swapping || numAmount <= 0}
              className={`${styles.submitBtn} ${swapping || numAmount <= 0 ? styles.submitBtnDisabled : ""}`}
            >
              {swapping ? "Executing Swap..." : `Confirm Swap (${fromToken.symbol} → ${toToken.symbol})`}
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
