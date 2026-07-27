import { SparkleIcon } from "../icons";
import styles from "./TexturedFabButton.module.css";

interface TexturedFabButtonProps {
  label?: string;
  className?: string;
  onClick?: () => void;
}

export function TexturedFabButton({ label = "Quick actions", className, onClick }: TexturedFabButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.fab} ${className ?? ""}`}
      aria-label={label}
      onClick={onClick}
    >
      <SparkleIcon size={22} />
    </button>
  );
}
