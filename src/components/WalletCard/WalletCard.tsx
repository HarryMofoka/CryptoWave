import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { BalanceCard } from "./BalanceCard";
import { CardStageBackground } from "./CardStageBackground";
import { CardStarField } from "./CardStarField";
import { MiniTokenBar } from "./MiniTokenBar";
import { PaginationDots } from "./PaginationDots";
import { WalletCardHeader } from "./WalletCardHeader";
import styles from "./WalletCard.module.css";

interface WalletCardProps {
  balance?: string;
  showCursor?: boolean;
  address?: string;
  actionIcon?: ReactNode;
  actionLabel?: string;
  actionButtonSize?: string;
  showBadges?: boolean;
  showPagination?: boolean;
  showHeader?: boolean;
  showStageBackground?: boolean;
  cornerButton?: ReactNode;
  cornerButtonInset?: string;
  onOpenSwap?: () => void;
  onOpenWallet?: () => void;
}

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

const STAR_COUNT = 42;
const STAR_STAGGER = 0.012;
const STAR_DURATION = 0.35;

function useRevealTiming({ showHeader, showStageBackground }: { showHeader: boolean; showStageBackground: boolean }) {
  const panelFadeDuration = 0.45;
  let t = panelFadeDuration;

  let stageBgDelay: number | undefined;
  if (showStageBackground) {
    stageBgDelay = t;
    t += 0.5 * 0.4;
  }

  const starsDelay = t;
  t = starsDelay + STAR_DURATION + STAR_COUNT * STAR_STAGGER;

  let headerDelay: number | undefined;
  if (showHeader) {
    headerDelay = t;
    t += 0.4;
  }

  const miniBarDelay = t;
  const miniBarDuration = 0.55;
  t = miniBarDelay + miniBarDuration * 0.5;

  const balanceDelay = t;
  const balanceDuration = 0.65;
  t = balanceDelay + balanceDuration * 0.7;

  const badgesDelay = t;

  return { panelFadeDuration, stageBgDelay, starsDelay, headerDelay, miniBarDelay, miniBarDuration, balanceDelay, balanceDuration, badgesDelay };
}

export function WalletCard({
  balance,
  showCursor,
  address,
  actionIcon,
  actionLabel,
  actionButtonSize,
  showBadges = true,
  showPagination = true,
  showHeader = true,
  showStageBackground = true,
  cornerButton,
  cornerButtonInset,
  onOpenSwap,
  onOpenWallet,
}: WalletCardProps = {}) {
  const timing = useRevealTiming({ showHeader, showStageBackground });

  return (
    <motion.div
      className={styles.panel}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -4, scale: 1.01 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: SMOOTH_EASE }}
    >
      <CardStarField delay={timing.starsDelay} />
      {showStageBackground && <CardStageBackground delay={timing.stageBgDelay} />}
      {showHeader && <WalletCardHeader delay={timing.headerDelay} />}

      <div className={`${styles.stage} ${!showHeader ? styles.stageCompact : ""}`}>
        <motion.div
          style={{ transformOrigin: "top", width: "100%" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: timing.miniBarDuration, ease: SMOOTH_EASE, delay: timing.miniBarDelay }}
        >
          <MiniTokenBar />
        </motion.div>
        <motion.div
          style={{ transformOrigin: "top", width: "100%" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: timing.balanceDuration, ease: SMOOTH_EASE, delay: timing.balanceDelay }}
        >
          <BalanceCard
            balance={balance}
            showCursor={showCursor}
            address={address}
            actionIcon={actionIcon}
            actionLabel={actionLabel}
            actionButtonSize={actionButtonSize}
            showBadges={showBadges}
            badgesDelay={timing.badgesDelay}
            cornerButton={cornerButton}
            cornerButtonInset={cornerButtonInset}
            onOpenSwap={onOpenSwap}
            onOpenWallet={onOpenWallet}
          />
        </motion.div>
      </div>

      {showPagination && <PaginationDots />}
    </motion.div>
  );
}
