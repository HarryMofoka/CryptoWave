import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SafeBrowserIcon } from "../../icons";

interface SecurityAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AUDIT_STEPS = [
  "Auditing AES-256 Cloud Vault Keys...",
  "Scanning Smart Contract Permissions...",
  "Verifying Zero-Knowledge Proof Shields...",
  "Checking Multi-Sig Transaction Signatures...",
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
    }, 800);
    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: "absolute", inset: 0, background: "rgba(0, 0, 0, 0.75)", backdropFilter: "blur(12px)" }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "460px",
              background: "rgba(18, 20, 26, 0.95)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "24px",
              padding: "26px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
              zIndex: 10,
              color: "#fff",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "12px", background: "linear-gradient(135deg, #10b981, #059669)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <SafeBrowserIcon size={22} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600 }}>Proactive Security Scanner</h3>
                  <span style={{ fontSize: "0.78rem", color: "#9ca3af" }}>Encrypted On-Chain Diagnostics</span>
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

            {/* Score Display */}
            <div style={{ textAlign: "center", padding: "20px", background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "18px", marginBottom: "18px" }}>
              <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "#10b981", letterSpacing: "-1px" }}>
                {isDone ? "100 / 100" : `${Math.round(((currentStep + 1) / AUDIT_STEPS.length) * 100)}%`}
              </div>
              <div style={{ fontSize: "0.82rem", color: "#d1d5db", marginTop: "4px" }}>
                {isDone ? "Shield Status: Fully Protected" : "Running Deep Cryptographic Inspection..."}
              </div>
            </div>

            {/* Audit Checklist */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {AUDIT_STEPS.map((stepText, idx) => {
                const isPassed = idx <= currentStep;
                const isCurrent = idx === currentStep && !isDone;
                return (
                  <div
                    key={stepText}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "0.85rem",
                      color: isPassed ? "#fff" : "#4b5563",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <span
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: isPassed ? (isCurrent ? "#f59e0b" : "#10b981") : "rgba(255, 255, 255, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: isPassed ? "#000" : "#9ca3af",
                      }}
                    >
                      {isPassed ? (isCurrent ? "⏳" : "✓") : idx + 1}
                    </span>
                    <span>{stepText}</span>
                  </div>
                );
              })}
            </div>

            {/* Action Button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              style={{
                marginTop: "20px",
                width: "100%",
                padding: "12px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #10b981, #059669)",
                border: "none",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {isDone ? "Close Security Report" : "Inspecting Vault..."}
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
