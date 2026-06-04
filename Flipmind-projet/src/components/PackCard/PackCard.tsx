import styles from './PackCard.module.css';

interface PackCardProps {
  title: string;
  description: string;
  cardCount: number;
  onStartQuiz: () => void;
}

export default function PackCard({ title, description, cardCount, onStartQuiz }: PackCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.badge}>
          {cardCount} {cardCount > 1 ? 'cartes' : 'carte'}
        </span>
      </div>
      
      <p className={styles.description}>{description}</p>
      
      <button className={styles.button} onClick={onStartQuiz}>
        Démarrer la révision
      </button>
    </div>
  );
}