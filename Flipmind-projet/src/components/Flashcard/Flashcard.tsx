import React from "react";
import styles from "./Flashcard.module.css";

interface FlashcardProps {
  question: string;
  answer: string;
  isFlipped: boolean;
  onFlip: () => void;
}

const Flashcard: React.FC<FlashcardProps> = (props: FlashcardProps) => {
  const { question, answer, isFlipped, onFlip } = props;
  return (
    <div
      className={styles.scene}
      onClick={onFlip}
      role="button"
      aria-label={isFlipped ? "Cliquer pour voir la question" : "Cliquer pour voir la réponse"}
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => e.key === "Enter" && onFlip()}
    >
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}>
        <div className={`${styles.face} ${styles.front}`}>
          <span className={styles.label}>Question</span>
          <p className={styles.text}>{question}</p>
          <span className={styles.flipHint}>↩ retourner</span>
        </div>

        <div className={`${styles.face} ${styles.back}`}>
          <span className={styles.label}>Réponse</span>
          <p className={styles.text}>{answer}</p>
          <span className={styles.flipHint}>↩ retourner</span>
        </div>

      </div>
    </div>
  );
};

export default Flashcard;