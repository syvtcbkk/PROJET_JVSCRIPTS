import React from 'react';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      
      <header className={styles.header}>
        <div className={styles.logo}>
          Flip<span>Mind</span>
        </div>
        <nav className={styles.nav}>
          <a href="/" className={styles.navLink}>Accueil</a>
          <a href="/creer-carte" className={styles.navLink}>Créer une carte</a>
        </nav>
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