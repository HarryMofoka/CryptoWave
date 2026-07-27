import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SafeBrowserIcon } from "../../icons";
import styles from "./SecurityAuditModal.module.css";

interface SecurityAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AUDIT_STEPS = [
  "Auditing AES-256 Cloud Vault Keys...",
  "Scanning Smart Contract Permissions...",
  "Verifying Zero-Knowledge Proof Shields...",
  "Checking Multi-Sig Signatures...",
  "Audit Complete: 100% Secure & Compliant",
];

export function SecurityAuditModal({ isOpen, onClose }: SecurityAuditModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setIsDone(false);
      return;
    }
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < AUDIT_STEPS.length - 1) {
          return prev + 1;
        } else {
          setIsDone(true);
          clearInterval(interval);
          return prev;
        }
      });
    }, 700);
    return () => clearInterval(interval);
  }, [isOpen]);

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
                  <SafeBrowserIcon size={22} />
                </div>
                <div>
                  <h3 className={styles.title}>Security Diagnostics</h3>
                  <span className={styles.subtitle}>On-Chain Contract & Vault Audit</span>
                </div>
              </div>
              <button type="button" onClick={onClose} className={styles.closeBtn}>
                &times;
              </button>
            </div>

            <div className={styles.scoreCard}>
              <div className={styles.scoreNumber}>
                {isDone ? "100 / 100" : `${Math.round(((currentStep + 1) / AUDIT_STEPS.length) * 100)}%`}
              </div>
              <div className={styles.scoreStatus}>
                {isDone ? "Shield Status: Fully Protected" : "Running Deep Security Inspection..."}
              </div>
            </div>

            <div className={styles.stepList}>
              {AUDIT_STEPS.map((stepText, idx) => {
                const isPassed = idx <= currentStep;
                return (
                  <div
                    key={stepText}
                    className={`${styles.stepItem} ${isPassed ? styles.stepActive : ""}`}
                  >
                    <span className={`${styles.stepBadge} ${isPassed ? styles.stepBadgePassed : ""}`}>
                      {isPassed ? "✓" : idx + 1}
                    </span>
                    <span>{stepText}</span>
                  </div>
                );
              })}
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className={styles.actionBtn}
            >
              {isDone ? "Close Security Report" : "Inspecting Vault..."}
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
