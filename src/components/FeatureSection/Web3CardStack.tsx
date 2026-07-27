import { motion } from "framer-motion";
import styles from "./Web3CardStack.module.css";

export interface StackCardItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  iconBg: string;
  badges: string[];
  actionLabel: string;
}

export const STACK_CARDS: StackCardItem[] = [
  {
    id: "swap",
    title: "Instant Cross-Chain Swaps",
    subtitle: "Swap 1,000+ assets across Bitcoin, Solana, Ethereum & Polygon with zero price slippage.",
    icon: "⚡",
    iconBg: "linear-gradient(135deg, #f59e0b, #d97706)",
    badges: ["0.05% Fee", "15+ Chains", "Instant"],
    actionLabel: "Launch Swap",
  },
  {
    id: "vault",
    title: "Self-Custodial Multi-Sig Vault",
    subtitle: "AES-256 cloud key recovery with biometric passkey & hardware security authorization.",
    icon: "🛡️",
    iconBg: "linear-gradient(135deg, #10b981, #059669)",
    badges: ["AES-256", "Multi-Sig", "0 Gas"],
    actionLabel: "Security Audit",
  },
  {
    id: "dapps",
    title: "5,000+ Integrated Web3 dApps",
    subtitle: "1-tap connection to top audited liquidity pools, NFTs, and decentralized governance DAOs.",
    icon: "🌐",
    iconBg: "linear-gradient(135deg, #ec4899, #8b5cf6)",
    badges: ["DeFi", "NFTs", "1-Click"],
    actionLabel: "Explore dApps",
  },
];

interface Web3CardStackProps {
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onActionClick: (cardId: string) => void;
}

export function Web3CardStack({ activeIndex, onSelectIndex, onActionClick }: Web3CardStackProps) {
  return (
    <div className={styles.container}>
      <div className={styles.stackWrapper}>
        {STACK_CARDS.map((card, index) => {
          // Calculate offset position relative to active index
          const offset = (index - activeIndex + STACK_CARDS.length) % STACK_CARDS.length;
          const isActive = offset === 0;

          // Compute 3D transformation properties based on stack depth
          const translateY = offset * 14;
          const scale = 1 - offset * 0.05;
          const zIndex = STACK_CARDS.length - offset;
          const opacity = offset === 0 ? 1 : offset === 1 ? 0.75 : 0.45;

          return (
            <motion.div
              key={card.id}
              className={`${styles.card} ${isActive ? styles.cardActive : ""}`}
              style={{ zIndex }}
              initial={false}
              animate={{
                y: translateY,
                scale: scale,
                opacity: opacity,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 26,
              }}
              onClick={() => onSelectIndex(index)}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleWrap}>
                  <div className={styles.cardIcon} style={{ background: card.iconBg }}>
                    {card.icon}
                  </div>
                  <h4 className={styles.cardTitle}>{card.title}</h4>
                </div>

                {isActive && (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={styles.actionBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      onActionClick(card.id);
                    }}
                  >
                    <span>{card.actionLabel}</span>
                    <span>&rarr;</span>
                  </motion.button>
                )}
              </div>

              <p className={styles.cardSubtitle}>{card.subtitle}</p>

              <div className={styles.badgeRow}>
                {card.badges.map((badge, bIdx) => (
                  <span
                    key={badge}
                    className={`${styles.badge} ${bIdx === 0 ? styles.badgeGold : ""}`}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
