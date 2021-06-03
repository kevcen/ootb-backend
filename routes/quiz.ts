import express from "express";
import Answer from "../interfaces/Answer";
import QuizEngine from "../models/QuizEngine";
var router = express.Router();

/* POST quiz answers and get recommendations*/
router.post("/", function (req, res, next) {
  var quizData: Map<string, Answer> = req.body.quiz;
  var engine = new QuizEngine(quizData);
  res.send([])
  engine
    .predict()
    .then((recommendations) => res.send(recommendations))
    .catch((error) =>
      res.send({
        error,
        message: "Sorry an error occured... try again later",
      })
    );
});

export default router;
