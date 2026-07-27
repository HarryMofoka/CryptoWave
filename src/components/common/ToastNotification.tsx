import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export function ToastNotification({ message, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 2000,
            background: "rgba(16, 185, 129, 0.95)",
            color: "#fff",
            padding: "14px 20px",
            borderRadius: "16px",
            boxShadow: "0 12px 35px rgba(0, 0, 0, 0.4)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontWeight: 600,
            fontSize: "0.9rem",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <span>✨</span>
          <span>{message}</span>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              borderRadius: "50%",
              width: "22px",
              height: "22px",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "8px",
            }}
          >
            &times;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
