import React, { useState } from "react";
import Flashcard from "../components/Flashcard/Flashcard";
import QuizControls from "../components/Flashcard/QuizControls";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Card {
  question: string;
  answer: string;
}

// ─── Exemple de cartes (à remplacer par les vraies données du projet) ─────────
const SAMPLE_CARDS: Card[] = [
  { question: "Qu'est-ce qu'une variable ?", answer: "Un espace mémoire nommé qui stocke une valeur." },
  { question: "Qu'est-ce qu'une fonction ?", answer: "Un bloc de code réutilisable qui effectue une tâche précise." },
  { question: "Qu'est-ce que le DOM ?", answer: "Document Object Model : la représentation en arbre d'une page HTML." },
  { question: "Qu'est-ce qu'un tableau (array) ?", answer: "Une structure de données ordonnée qui contient plusieurs valeurs." },
  { question: "Qu'est-ce que l'asynchronisme ?", answer: "La capacité d'exécuter du code sans bloquer le fil d'exécution principal." },
];

// ─── Page principale ──────────────────────────────────────────────────────────
const QuizPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);

  const cards = SAMPLE_CARDS;
  const total = cards.length;
  const current = cards[currentIndex];

  // Retourner / dé-retourner la carte courante
  const handleFlip = (): void => setIsFlipped((prev: boolean) => !prev);

  // Passer à la carte suivante
  const handleNext = (): void => {
    if (currentIndex < total - 1) {
      setCurrentIndex((i: number) => i + 1);
      setIsFlipped(false);
    } else {
      setFinished(true);
    }
  };

  // Recommencer depuis le début
  const handleRestart = (): void => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setFinished(false);
  };

  // ── Rendu fin de quiz ──────────────────────────────────────────────────────
  if (finished) {
    return (
      <div style={styles.page}>
        <div style={styles.finishedBox}>
          <span style={styles.trophy}>🏆</span>
          <h2 style={styles.finishedTitle}>Quiz terminé !</h2>
          <p style={styles.finishedSub}>Tu as revu toutes les cartes.</p>
          <button style={styles.restartBtn} onClick={handleRestart}>
            Recommencer
          </button>
        </div>
      </div>
    );
  }

  // ── Rendu principal ────────────────────────────────────────────────────────
  return (
    <div style={styles.page}>
      {/* En-tête avec progression */}
      <header style={styles.header}>
        <h1 style={styles.title}>Mode Révision</h1>
        <span style={styles.counter}>
          {currentIndex + 1} / {total}
        </span>
      </header>

      {/* Barre de progression */}
      <div style={styles.progressBar}>
        <div
          style={{
            ...styles.progressFill,
            width: `${((currentIndex + 1) / total) * 100}%`,
          }}
        />
      </div>

      {/* Carte flashcard cliquable */}
      <Flashcard
        question={current.question}
        answer={current.answer}
        isFlipped={isFlipped}
        onFlip={handleFlip}
      />

      {/* Bouton Suivant */}
      <QuizControls
        onNext={handleNext}
        isLast={currentIndex === total - 1}
        isFlipped={isFlipped}
      />

      {/* Indication pour l'utilisateur */}
      {!isFlipped && (
        <p style={styles.hint}>Clique sur la carte pour voir la réponse</p>
      )}
    </div>
  );
};

// ─── Styles inline (compatibles sans build-step) ──────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    padding: "2rem 1rem",
    fontFamily: "'Segoe UI', sans-serif",
    gap: "1.5rem",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "520px",
  },
  title: {
    color: "#e2e8f0",
    fontSize: "1.4rem",
    fontWeight: 700,
    margin: 0,
    letterSpacing: "0.05em",
  },
  counter: {
    color: "#94a3b8",
    fontSize: "0.95rem",
    fontWeight: 500,
  },
  progressBar: {
    width: "100%",
    maxWidth: "520px",
    height: "6px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "99px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #6366f1, #818cf8)",
    borderRadius: "99px",
    transition: "width 0.4s ease",
  },
  hint: {
    color: "#64748b",
    fontSize: "0.85rem",
    margin: 0,
    fontStyle: "italic",
  },
  // ── Écran de fin ────────────────────────────────────────────────────────────
  finishedBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "20px",
    padding: "3rem 2.5rem",
    backdropFilter: "blur(10px)",
  },
  trophy: {
    fontSize: "3.5rem",
  },
  finishedTitle: {
    color: "#e2e8f0",
    fontSize: "1.8rem",
    margin: 0,
    fontWeight: 700,
  },
  finishedSub: {
    color: "#94a3b8",
    margin: 0,
    fontSize: "1rem",
  },
  restartBtn: {
    marginTop: "0.5rem",
    padding: "0.75rem 2rem",
    background: "linear-gradient(135deg, #6366f1, #818cf8)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
};

export default QuizPage;