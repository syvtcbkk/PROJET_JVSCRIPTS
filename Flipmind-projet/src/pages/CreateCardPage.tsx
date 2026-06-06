import { useState } from 'react';
import Layout from '../components/Layout/Layout';
import type { User } from '../types';
import styles from './CreateCardPage.module.css';

interface CreateCardPageProps {
  user: User;
  navigate: (page: string) => void;
  onLogout: () => void;
}

const CreateCardPage = ({ user, navigate, onLogout }: CreateCardPageProps) => {
  const [question, setQuestion] = useState('');
  const [reponse, setReponse]   = useState('');
  const [paquet, setPaquet]     = useState('');

  const handleSubmit = () => {
    if (!question || !reponse || !paquet) {
      alert('Remplis tous les champs !');
      return;
    }
    alert('Carte créée avec succès !');
    setQuestion('');
    setReponse('');
    setPaquet('');
  };

  return (
    <Layout user={user} navigate={navigate} onLogout={onLogout}>
      <div className={styles.page}>
        <h1 className={styles.title}>Créer une nouvelle carte</h1>
        <div className={styles.form}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label htmlFor="paquet" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Nom du paquet</label>
            <input
              id="paquet"
              type="text"
              value={paquet}
              onChange={(e) => setPaquet(e.target.value)}
              placeholder="Ex : Bases HTML"
              style={{ padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '0.95rem' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label htmlFor="question" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Question (recto)</label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ex : Qu'est-ce qu'une balise HTML ?"
              rows={3}
              style={{ padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '0.95rem', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label htmlFor="reponse" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Réponse (verso)</label>
            <textarea
              id="reponse"
              value={reponse}
              onChange={(e) => setReponse(e.target.value)}
              placeholder="Ex : Une balise est un élément..."
              rows={3}
              style={{ padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '0.95rem', resize: 'vertical' }}
            />
          </div>

          <button
            onClick={handleSubmit}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Créer la carte
          </button>

        </div>
      </div>
    </Layout>
  );
};

export default CreateCardPage;