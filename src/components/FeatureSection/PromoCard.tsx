import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRightIcon, GrayBitcoinIcon, LightningLogoMark } from "../icons";
import { Reveal } from "../common/motion";
import { TextScramble } from "../common/TextScramble";
import { SIGNATURE_EASE } from "../common/motionConfig";
import { SquiggleConnectorIcon } from "./SquiggleConnectorIcon";
import { Web3CardStack } from "./Web3CardStack";
import styles from "./PromoCard.module.css";

const footerReveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay: 0.75, ease: SIGNATURE_EASE },
};

interface PromoCardProps {
  onOpenSwap?: () => void;
  onOpenAudit?: () => void;
  onOpenDApps?: () => void;
}

export function PromoCard({ onOpenSwap, onOpenAudit, onOpenDApps }: PromoCardProps) {
  const [activeStackIndex, setActiveStackIndex] = useState(0);

  const handleNextStack = () => {
    setActiveStackIndex((prev) => (prev + 1) % 3);
  };

  const handleActionClick = (cardId: string) => {
    if (cardId === "swap" && onOpenSwap) onOpenSwap();
    else if (cardId === "vault" && onOpenAudit) onOpenAudit();
    else if (cardId === "dapps" && onOpenDApps) onOpenDApps();
  };

  return (
    <motion.div
      className={styles.root}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: SIGNATURE_EASE }}
    >
      <Reveal variant="fade-up" duration={0.5} delay={0.25}>
        <div className={styles.badgeRow}>
          <GrayBitcoinIcon size={34} className={styles.badgeIcon} />
          <span className={styles.badgeLabel}>Swap Assets</span>
        </div>
      </Reveal>

      <h2 className={styles.heading}>
        <TextScramble text="Powerful Web3 Experiences" whileInView delay={0.35} duration={1.2} />
      </h2>

      <Reveal variant="fade-up" duration={0.5} delay={0.55}>
        <p className={styles.lede}>Leading self-custody multi-chain platform assets</p>
      </Reveal>

      {/* Interactive 3D Card Stack */}
      <Reveal variant="fade-up" duration={0.5} delay={0.6}>
        <Web3CardStack
          activeIndex={activeStackIndex}
          onSelectIndex={(idx) => setActiveStackIndex(idx)}
          onActionClick={handleActionClick}
        />
      </Reveal>

      {/* Progress Bar Segments */}
      <Reveal variant="fade-up" duration={0.5} delay={0.65}>
        <div className={styles.progress} role="tablist" aria-label="Feature card pagination">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={activeStackIndex === idx}
              onClick={() => setActiveStackIndex(idx)}
              className={`${styles.progressSegment} ${activeStackIndex === idx ? styles.progressActive : ""}`}
              style={{ cursor: "pointer", border: "none", outline: "none" }}
            />
          ))}
        </div>
      </Reveal>

      {/* Footer Navigation */}
      <motion.div className={styles.footer} {...footerReveal}>
        <div className={styles.chain}>
          <SquiggleConnectorIcon className={styles.squiggle} />
          <LightningLogoMark size={42} />
        </div>

        <button
          type="button"
          className={styles.next}
          aria-label="Next feature card"
          onClick={handleNextStack}
        >
          <ChevronRightIcon size={16} />
        </button>
      </motion.div>
    </motion.div>
  );
}