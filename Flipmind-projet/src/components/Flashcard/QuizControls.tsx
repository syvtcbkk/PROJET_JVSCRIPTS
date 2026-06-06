import React from "react";
import styles from "./QuizControls.module.css";

interface QuizControlsProps {
  onNext: () => void;
  isLast: boolean;
  isFlipped: boolean;
}

const QuizControls: React.FC<QuizControlsProps> = (props: QuizControlsProps) => {
  const { onNext, isLast, isFlipped } = props;

  return (
    <div className={styles.controls}>
      <button
        className={`${styles.nextBtn} ${!isFlipped ? styles.disabled : ""}`}
        onClick={onNext}
        disabled={!isFlipped}
        aria-label={isLast ? "Terminer le quiz" : "Carte suivante"}
      >
        <span className={styles.btnText}>
          {isLast ? "Terminer" : "Suivant"}
        </span>
        <span className={styles.btnIcon} aria-hidden="true">
          {isLast ? "✓" : "→"}
        </span>
      </button>
    </div>
  );
};

export default QuizControls;