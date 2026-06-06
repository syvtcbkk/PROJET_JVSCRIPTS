import React from 'react';
import type { User } from '../../types';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  navigate: (page: string) => void;
  onLogout: () => void;
}

export default function Layout({ children, user, navigate, onLogout }: LayoutProps) {
  return (
    <div className={styles.container}>

      <header className={styles.header}>

        <div className={styles.logo} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          Flip<span>Mind</span>
        </div>

        <nav className={styles.nav}>
          <button className={styles.navLink} onClick={() => navigate('/')}>
            Accueil
          </button>

          {user.role === 'admin' && (
            <button className={styles.navLink} onClick={() => navigate('/creer-carte')}>
              Créer une carte
            </button>
          )}
        </nav>

        <div className={styles.zoneUtilisateur}>
          <span className={styles.nomUtilisateur}>{user.nom}</span>
          <span className={`${styles.badge} ${user.role === 'admin' ? styles.badgeAdmin : styles.badgeEtudiant}`}>
            {user.role === 'admin' ? 'Admin' : 'Étudiant'}
          </span>
          <button className={styles.boutonDeconnexion} onClick={onLogout}>
            Déconnexion
          </button>
        </div>

      </header>

      <main className={styles.mainContent}>
        {children}
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2026 FlipMind - Tous droits réservés.</p>
      </footer>

    </div>
  );
}