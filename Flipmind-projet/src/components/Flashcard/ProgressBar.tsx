import styles from './ProgressBar.module.css';

type ProgressBarProps = {
  current: number;
  total: number;
};

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${percentage}%` }} />
      </div>
      <span className={styles.text}>Carte {current} / {total}</span>
    </div>
  );
};

export default ProgressBar;