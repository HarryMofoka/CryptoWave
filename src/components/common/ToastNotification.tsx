import { motion, AnimatePresence } from "framer-motion";
import styles from "./ToastNotification.module.css";

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export function ToastNotification({ message, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className={styles.toast}
        >
          <span className={styles.toastDot} />
          <span>{message}</span>
          <button type="button" onClick={onClose} className={styles.closeBtn}>
            &times;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
