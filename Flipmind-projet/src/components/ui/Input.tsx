import styles from './Input.module.css';

type InputProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  placeholder?: string;
  multiline?: boolean;
};

const Input = ({ label, value, onChange, placeholder, multiline = false }: InputProps) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      {multiline ? (
        <textarea
          className={styles.input}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
        />
      ) : (
        <input
          className={styles.input}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default Input;