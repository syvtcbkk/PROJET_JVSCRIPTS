import Layout from '../components/Layout/Layout';
import PackCard from '../components/PackCard/PackCard';

export default function Dashboard() {
  const handleStartQuiz = (packTitle: string) => {
    console.log(`Navigation vers le module de révision : ${packTitle}`);
    
  };

  
  const cardPacks = [
    {
      id: 1,
      title: "Introduction au HTML",
      description: "Maîtriser les balises fondamentales, les attributs essentiels et la structure sémantique d'un document web.",
      cardCount: 12
    },
    {
      id: 2,
      title: "Bases de TypeScript",
      description: "Comprendre le typage statique, la définition des interfaces, les types optionnels et la sécurisation du code JavaScript.",
      cardCount: 8
    },
    {
      id: 3,
      title: "飞 Connaissances CSS Flexbox",
      description: "Maîtriser l'alignement des éléments, la gestion des espaces et la création de mises en page responsives complexes.",
      cardCount: 15
    }
  ];

  return (
    <Layout>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', margin: '0 0 0.5rem 0' }}>
          Tableau de bord
        </h1>
        <p style={{ color: '#6b7280', margin: 0, fontSize: '0.95rem' }}>
          Bienvenue sur FlipMind. Sélectionnez un paquet ci-dessous pour débuter votre session de révision.
        </p>
      </div>

      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {cardPacks.map((pack) => (
          <PackCard
            key={pack.id}
            title={pack.title}
            description={pack.description}
            cardCount={pack.cardCount}
            onStartQuiz={() => handleStartQuiz(pack.title)}
          />
        ))}
      </div>
    </Layout>
  );
}