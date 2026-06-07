const quizService = require('../services/quiz.service');
const QuizService = require('../services/quiz.service');
 class QuizController {
    async startQuiz(req,res,next) {
        try{
            const {paqId} = req.params;
            const cards = await quizService.getquizCards(paqIdId);

            res.json({
                success: true,
                data: {
                    paqId: parseInt(paqId),
                    TotalCards: cards.length,
                    cards: cards
                }
            });
        }catch (err) {
            next(err);
        }
    }

     
 }
 module.exports() = new QuizController();