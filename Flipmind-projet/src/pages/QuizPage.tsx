import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import Flashcard from "../components/Flashcard/Flashcard";
import QuizControls from "../components/Flashcard/QuizControls";
import type { User } from "../types";

interface Card {
  question: string;
  answer: string;
}

interface QuizPageProps {
  quizData?: { packTitle: string; packId: number } | null;
  user: User;
  navigate: (page: string) => void;
  onLogout: () => void;
}

const cardsData: Record<number, Card[]> = {
  1: [
    { question: "Qu'est-ce qu'une balise HTML ?", answer: "Un élément de structure qui encadre le contenu avec des marqueurs." },
    { question: "À quoi sert la balise <div> ?", answer: "À créer un conteneur générique pour grouper et mettre en page du contenu." },
    { question: "Quelle est la différence entre <span> et <div> ?", answer: "<div> est block (occupe toute la largeur), <span> est inline (occupe la place nécessaire)." },
    { question: "À quoi sert l'attribut id ?", answer: "À identifier de manière unique un élément dans la page." },
    { question: "À quoi sert l'attribut class ?", answer: "À appliquer des styles CSS à plusieurs éléments." },
    { question: "Qu'est-ce que la sémantique HTML ?", answer: "L'utilisation de balises qui décrivent le sens du contenu (ex: <article>, <nav>)." },
  ],
  2: [
    { question: "Qu'est-ce que TypeScript ?", answer: "Un sur-ensemble de JavaScript qui ajoute le typage statique." },
    { question: "Quel est l'avantage du typage ?", answer: "Détecter les erreurs avant l'exécution et améliorer l'autocomplétion." },
  ],
  3: [
    { question: "Qu'est-ce que Flexbox ?", answer: "Un système de mise en page 1D pour aligner et distribuer les éléments." },
    { question: "À quoi sert justify-content ?", answer: "À aligner les éléments le long de l'axe principal (horizontal)." },
    { question: "À quoi sert align-items ?", answer: "À aligner les éléments le long de l'axe secondaire (vertical)." },
  ],
};

const ensureMinimumCards = (cards: Card[]): Card[] => {
  const minimumCards = 12;
  const result = [...cards];
  
  if (result.length < minimumCards) {
    const cardsToAdd = minimumCards - result.length;
    for (let i = 0; i < cardsToAdd; i++) {
      result.push({
        question: `Question bonus ${i + 1}`,
        answer: "À compléter avec le vrai contenu...",
      });
    }
  }
  
  return result;
};

const QuizPage: React.FC<QuizPageProps> = ({ quizData, user, navigate, onLogout }) => {
  const packId = quizData?.packId || 1;
  const packTitle = quizData?.packTitle || "Révision";
  
  const rawCards = cardsData[packId] || cardsData[1];
  const cards = ensureMinimumCards(rawCards);
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);

  const total = cards.length;
  const current = cards[currentIndex];

  const handleFlip = (): void => setIsFlipped((prev: boolean) => !prev);

  const handleNext = (): void => {
    if (currentIndex < total - 1) {
      setCurrentIndex((i: number) => i + 1);
      setIsFlipped(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = (): void => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setFinished(false);
  };

  const handleBackToDashboard = (): void => {
    navigate('/');
  };

  if (finished) {
    return (
      <Layout user={user} navigate={navigate} onLogout={onLogout}>
        <div style={styles.finishedContainer}>
          <div style={styles.finishedBox}>
            <span style={styles.trophy}>🏆</span>
            <h2 style={styles.finishedTitle}>Quiz terminé !</h2>
            <p style={styles.finishedSub}>Tu as revu toutes les cartes de "{packTitle}".</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button style={styles.restartBtn} onClick={handleRestart}>
                Recommencer
              </button>
              <button 
                style={{ ...styles.restartBtn, background: '#6b7280' } as React.CSSProperties} 
                onClick={handleBackToDashboard}
              >
                Retour au tableau de bord
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }


  return (
    <Layout user={user} navigate={navigate} onLogout={onLogout}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div>
            <button 
              style={styles.backButton}
              onClick={handleBackToDashboard}
              aria-label="Retour au tableau de bord"
            >
              ← Retour
            </button>
            <h1 style={styles.title}>{packTitle}</h1>
          </div>
          <span style={styles.counter}>
            {currentIndex + 1} / {total}
          </span>
        </header>

        <div style={styles.progressBar}>
          <div
            style={{
              ...styles.progressFill,
              width: `${((currentIndex + 1) / total) * 100}%`,
            } as React.CSSProperties}
          />
        </div>

        <div style={styles.cardsContainer}>
          {currentIndex < total - 2 && (
            <div style={{ ...styles.stackedCard, ...styles.stackedCard2 } as React.CSSProperties} />
          )}
          {currentIndex < total - 1 && (
            <div style={{ ...styles.stackedCard, ...styles.stackedCard1 } as React.CSSProperties} />
          )}
          
          <div style={styles.mainCardWrapper}>
            <Flashcard
              question={current.question}
              answer={current.answer}
              isFlipped={isFlipped}
              onFlip={handleFlip}
            />
          </div>
        </div>

        <QuizControls
          onNext={handleNext}
          isLast={currentIndex === total - 1}
          isFlipped={isFlipped}
        />
      </div>
    </Layout>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '100vh',
    paddingBottom: '2rem',
  },
  
  header: {
    width: '100%',
    maxWidth: '600px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    paddingTop: '1.5rem',
  },
  
  backButton: {
    background: 'none',
    border: 'none',
    color: '#4f46e5',
    fontSize: '0.95rem',
    fontWeight: 500,
    cursor: 'pointer',
    marginBottom: '0.5rem',
    transition: 'color 0.2s ease',
    padding: '0.5rem 0',
  },
  
  title: {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: '#111827',
    margin: 0,
  },
  
  counter: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    padding: '0.5rem 1rem',
    borderRadius: '9999px',
  },
  
  progressBar: {
    width: '100%',
    maxWidth: '600px',
    height: '4px',
    backgroundColor: '#e5e7eb',
    borderRadius: '9999px',
    overflow: 'hidden',
    marginBottom: '3rem',
  },
  
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #4f46e5 0%, #6366f1 100%)',
    transition: 'width 0.5s ease',
  },
  
  cardsContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '600px',
    height: '380px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3rem',
  },
  
  stackedCard: {
    position: 'absolute',
    width: '100%',
    height: '280px',
    background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
    border: '1px solid #e5e7eb',
    borderRadius: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
  },
  
  stackedCard1: {
    transform: 'translateY(16px) translateX(12px) scale(0.95)',
    zIndex: 1,
    opacity: 0.6,
  },
  
  stackedCard2: {
    transform: 'translateY(32px) translateX(24px) scale(0.90)',
    zIndex: 0,
    opacity: 0.3,
  },
  
  mainCardWrapper: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
  },

  finishedContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },

  finishedBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    background: '#f9fafb',
    border: '2px solid #e5e7eb',
    borderRadius: '16px',
    padding: '3rem 2.5rem',
    maxWidth: '500px',
    textAlign: 'center',
  },

  trophy: {
    fontSize: '3.5rem',
  },

  finishedTitle: {
    color: '#111827',
    fontSize: '1.8rem',
    margin: '1rem 0 0 0',
    fontWeight: 700,
  },

  finishedSub: {
    color: '#6b7280',
    margin: '0.5rem 0 1.5rem 0',
    fontSize: '1rem',
  },

  restartBtn: {
    marginTop: '0.5rem',
    padding: '0.75rem 2rem',
    background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
};

export default QuizPage;