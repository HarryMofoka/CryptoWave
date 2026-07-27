import type { CSSProperties, ReactNode } from "react";
import { RippleXIcon } from "../icons";
import { EllipseGlow } from "./EllipseGlow";
import { OverlapBadges } from "./OverlapBadges";
import { TransactionRow } from "./TransactionRow";
import { transactions } from "./data";
import styles from "./BalanceCard.module.css";

interface BalanceCardProps {
  balance?: string;
  showCursor?: boolean;
  address?: string;
  actionIcon?: ReactNode;
  actionLabel?: string;
  actionButtonSize?: string;
  showBadges?: boolean;
  badgesDelay?: number;
  cornerButton?: ReactNode;
  cornerButtonInset?: string;
  onOpenSwap?: () => void;
  onOpenWallet?: () => void;
}

export function BalanceCard({
  balance = "0.00578",
  showCursor = false,
  address = "0x417 57Zx9 .. 46qx8 x0879",
  actionIcon,
  actionLabel = "Swap",
  actionButtonSize,
  showBadges = true,
  badgesDelay = 0,
  cornerButton,
  cornerButtonInset,
  onOpenSwap,
  onOpenWallet,
}: BalanceCardProps) {
  const handleAction = () => {
    if (actionLabel.toLowerCase().includes("menu") || actionLabel.toLowerCase().includes("wallet")) {
      if (onOpenWallet) onOpenWallet();
    } else {
      if (onOpenSwap) onOpenSwap();
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.glowMask} aria-hidden="true">
        <EllipseGlow />
      </div>

      <div className={styles.topRow}>
        <span className={styles.balance}>
          {balance}
          {showCursor && <span className={styles.cursor} aria-hidden="true" />}
        </span>
        <button
          type="button"
          className={styles.sparkleBtn}
          aria-label={actionLabel}
          onClick={handleAction}
          style={actionButtonSize ? ({ "--action-btn-size": actionButtonSize } as CSSProperties) : undefined}
        >
          {actionIcon ?? <RippleXIcon size={17} />}
        </button>
      </div>

      <div className={styles.addressField} onClick={onOpenWallet} style={{ cursor: "pointer" }}>
        <span className={styles.addressLabel}>Wallet address</span>
        <span className={styles.addressValue}>{address}</span>
      </div>

      <ul className={styles.list}>
        {transactions.map((tx) => (
          <TransactionRow key={tx.id} tx={tx} />
        ))}
      </ul>

      {showBadges && <OverlapBadges delay={badgesDelay} />}
      {cornerButton && (
        <div
          className={styles.cornerButton}
          style={cornerButtonInset ? ({ "--corner-btn-inset": cornerButtonInset } as CSSProperties) : undefined}
        >
          {cornerButton}
        </div>
      )}
    </div>
  );
}