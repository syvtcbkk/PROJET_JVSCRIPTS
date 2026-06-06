import React, { useState } from 'react';
import type { User, UserRole } from '../types';
import styles from './LoginPage.module.css';

const UTILISATEURS_DEMO: (User & { motDePasse: string })[] = [
  { id: '1', nom: 'Admin FlipMind', email: 'admin@flipmind.fr', motDePasse: 'admin123', role: 'admin' },
  { id: '2', nom: 'Alice Martin',   email: 'alice@etudiant.fr', motDePasse: 'alice123', role: 'etudiant' },
];

interface LoginPageProps {
  onLogin: (user: User) => void;
}

function FormulaireConnexion({ onLogin }: LoginPageProps) {
  const [email, setEmail]       = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur]     = useState('');
  const [chargement, setChargement] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !motDePasse) {
      setErreur('Veuillez remplir tous les champs.');
      return;
    }
    setChargement(true);
    setErreur('');

    setTimeout(() => {
      const trouve = UTILISATEURS_DEMO.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.motDePasse === motDePasse
      );
      setChargement(false);
      if (trouve) {
        const userConnecte: User = { id: trouve.id, nom: trouve.nom, email: trouve.email, role: trouve.role };
        onLogin(userConnecte);
      } else {
        setErreur('Email ou mot de passe incorrect.');
      }
    }, 500);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {erreur && <div className={styles.error}>{erreur}</div>}

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="connexion-email">Adresse email</label>
        <div className={styles.inputWrap}>
          <span className={styles.inputIcon}>@</span>
          <input
            id="connexion-email"
            type="email"
            className={styles.input}
            placeholder="ex : alice@etudiant.fr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="connexion-mdp">Mot de passe</label>
        <div className={styles.inputWrap}>
          <span className={styles.inputIcon}>*</span>
          <input
            id="connexion-mdp"
            type="password"
            className={styles.input}
            placeholder="Votre mot de passe"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className={styles.submitBtn} disabled={chargement}>
        {chargement ? 'Connexion en cours…' : 'Se connecter'}
      </button>

      <div className={styles.hint}>
        <strong>Comptes de test :</strong><br />
        Admin → <strong>admin@flipmind.fr</strong> / <strong>admin123</strong><br />
        Étudiant → <strong>alice@etudiant.fr</strong> / <strong>alice123</strong>
      </div>
    </form>
  );
}

const nouveauxUtilisateurs: (User & { motDePasse: string })[] = [];

function FormulaireInscription({ onLogin }: LoginPageProps) {
  const [nom, setNom]             = useState('');
  const [email, setEmail]         = useState('');
  const [motDePasse, setMotDePasse]   = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [role, setRole]           = useState<UserRole>('etudiant');
  const [erreur, setErreur]       = useState('');
  const [chargement, setChargement]   = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nom || !email || !motDePasse || !confirmation) {
      setErreur('Veuillez remplir tous les champs.');
      return;
    }
    if (motDePasse !== confirmation) {
      setErreur('Les mots de passe ne correspondent pas.');
      return;
    }
    if (motDePasse.length < 6) {
      setErreur('Le mot de passe doit faire au moins 6 caractères.');
      return;
    }

    setChargement(true);
    setErreur('');

    setTimeout(() => {
      const tousLesUtilisateurs = [...UTILISATEURS_DEMO, ...nouveauxUtilisateurs];
      const dejaPris = tousLesUtilisateurs.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      setChargement(false);

      if (dejaPris) {
        setErreur('Un compte existe déjà avec cet email.');
        return;
      }

      const nouveauUser: User & { motDePasse: string } = {
        id: Date.now().toString(),
        nom,
        email,
        motDePasse,
        role,
      };

      nouveauxUtilisateurs.push(nouveauUser);

      const userConnecte: User = { id: nouveauUser.id, nom: nouveauUser.nom, email: nouveauUser.email, role: nouveauUser.role };
      onLogin(userConnecte);
    }, 500);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {erreur && <div className={styles.error}>{erreur}</div>}

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="inscription-nom">Nom complet</label>
        <div className={styles.inputWrap}>
          <span className={styles.inputIcon}>#</span>
          <input
            id="inscription-nom"
            type="text"
            className={styles.input}
            placeholder="Prénom Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="inscription-email">Adresse email</label>
        <div className={styles.inputWrap}>
          <span className={styles.inputIcon}>@</span>
          <input
            id="inscription-email"
            type="email"
            className={styles.input}
            placeholder="ex : prenom@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="inscription-mdp">Mot de passe</label>
        <div className={styles.inputWrap}>
          <span className={styles.inputIcon}>*</span>
          <input
            id="inscription-mdp"
            type="password"
            className={styles.input}
            placeholder="Minimum 6 caractères"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="inscription-confirm">Confirmer le mot de passe</label>
        <div className={styles.inputWrap}>
          <span className={styles.inputIcon}>*</span>
          <input
            id="inscription-confirm"
            type="password"
            className={styles.input}
            placeholder="Répétez le mot de passe"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Je suis…</label>
        <div className={styles.roleSelector}>
          <button
            type="button"
            className={`${styles.roleBtn} ${role === 'etudiant' ? styles.roleBtnActive : ''}`}
            onClick={() => setRole('etudiant')}
          >
            Étudiant
          </button>
          <button
            type="button"
            className={`${styles.roleBtn} ${role === 'admin' ? styles.roleBtnActive : ''}`}
            onClick={() => setRole('admin')}
          >
            Administrateur
          </button>
        </div>
      </div>

      <button type="submit" className={styles.submitBtn} disabled={chargement}>
        {chargement ? 'Création en cours…' : 'Créer mon compte'}
      </button>
    </form>
  );
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [onglet, setOnglet] = useState<'connexion' | 'inscription'>('connexion');

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        <div className={styles.logoWrap}>
          <div className={styles.logo}>Flip<span>Mind</span></div>
          <p className={styles.subtitle}>Révisez mieux, retenez plus</p>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${onglet === 'connexion' ? styles.tabActive : ''}`}
            onClick={() => setOnglet('connexion')}
            id="onglet-connexion"
          >
            Connexion
          </button>
          <button
            className={`${styles.tab} ${onglet === 'inscription' ? styles.tabActive : ''}`}
            onClick={() => setOnglet('inscription')}
            id="onglet-inscription"
          >
            Inscription
          </button>
        </div>

        <h1 className={styles.title}>
          {onglet === 'connexion' ? 'Bienvenue !' : 'Créer un compte'}
        </h1>

        {onglet === 'connexion'
          ? <FormulaireConnexion onLogin={onLogin} />
          : <FormulaireInscription onLogin={onLogin} />
        }
      </div>
    </div>
  );
}
