const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quiz.controller');

router.get('/start/:paq_Id', quizController.startQuiz);

module.exports = router;