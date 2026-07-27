import { ChevronRightIcon } from "../icons";
import styles from "./OrbitNavButton.module.css";

interface NavArrowProps {
  direction: "prev" | "next";
  className?: string;
  onClick?: () => void;
}

export function OrbitNavButton({ direction, className, onClick }: NavArrowProps) {
  return (
    <button
      type="button"
      className={`${className ?? ""} ${styles.btn}`}
      aria-label={direction === "prev" ? "Previous" : "Next"}
      onClick={onClick}
    >
      <ChevronRightIcon size={16} className={direction === "prev" ? styles.flip : undefined} />
    </button>
  );
}