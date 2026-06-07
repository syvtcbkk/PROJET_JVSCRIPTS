const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { initializeDatabase } = require('./src/config/database');
const routes = require('./src/routes');
const errorHandler = require('./src/middlewares/error.middleware');
const config = require('./src/config/env');

const app = express();

app.use(helmet()); // Sécurité
app.use(cors());   // Permet les requêtes cross-origin
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true }));

// Logger pour les requêtes (optionnel)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api', routes);

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route non trouvée'
    });
});

// Gestionnaire d'erreurs global
app.use(errorHandler);

// Démarrage du serveur
const startServer = async () => {
    try {
        // Initialiser la base de données
        await initializeDatabase();
        
        // Démarrer le serveur
        app.listen(config.port, () => {
            console.log(`
             Serveur démarré sur http://localhost:${config.port}
             API Flipmind prête !
             Routes disponibles:
               GET    /api/paquets
               POST   /api/paquets
               GET    /api/paquets/:id
               PUT    /api/paquets/:id
               DELETE /api/paquets/:id
               GET    /api/quiz/start/:deckId
            `);
        });
    } catch (error) {
        console.error(' Impossible de démarrer le serveur:', error);
        process.exit(1);
    }
};

startServer();