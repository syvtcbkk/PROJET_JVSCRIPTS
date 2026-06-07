const errorHandler = (err, req, res, next) => {
    console.error(' Erreur:', err.stack);
    
    if (err.code === 'ER_BAD_FIELD_ERROR') {
        return res.status(400).json({
            success: false,
            message: 'Requête invalide',
            error: 'Champ inconnu dans la base de données'
        });
    }
    
    // Erreur par défaut
    const status = err.status || 500;
    const message = err.message || 'Erreur interne du serveur';
    
    res.status(status).json({
        success: false,
        message: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorHandler;