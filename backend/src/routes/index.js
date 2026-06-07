const express = require('express');
const router = express.Router();

const deckRoutes = require('./paquet.routes');
const cardRoutes = require('./card.routes');
const quizRoutes = require('./quiz.routes');

router.use('/paquet', PaquetRoutes);
router.use('/cards', cardRoutes);
router.use('/quiz', quizRoutes);

// Route de santé (health check)
router.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

module.exports = router;