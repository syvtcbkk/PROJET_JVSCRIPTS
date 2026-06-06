import { useState } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import styles from './CreateCardPage.module.css';

const CreateCardPage = () => {
  const [question, setQuestion] = useState('');
  const [reponse, setReponse] = useState('');
  const [paquet, setPaquet] = useState('');

  const handleSubmit = () => {
    if (!question || !reponse || !paquet) {
      alert('Remplis tous les champs !');
      return;
    }
    alert('Carte créée avec succès ! 🎉');
    setQuestion('');
    setReponse('');
    setPaquet('');
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>✏️ Créer une nouvelle carte</h1>
      <div className={styles.form}>
        <Input
          label="Nom du paquet"
          value={paquet}
          onChange={(e) => setPaquet(e.target.value)}
          placeholder="Ex: Bases HTML"
        />
        <Input
          label="Question (recto)"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ex: Qu'est-ce qu'une balise HTML ?"
          multiline
        />
        <Input
          label="Réponse (verso)"
          value={reponse}
          onChange={(e) => setReponse(e.target.value)}
          placeholder="Ex: Une balise est un élément..."
          multiline
        />
        <Button label="Créer la carte " onClick={handleSubmit} type="button" />
      </div>
    </div>
  );
};

export default CreateCardPage;