import Answer, { SingleAnswer } from "../interfaces/Answer";
import Quiz from "../interfaces/Quiz";
import Product from "../db_models/Product";

export default class QuizEngine implements Quiz {
  results: Map<string, Answer>;

  constructor(results: Map<string, Answer>) {
    this.results = results;
  }

  predict(): Promise<Product[]> {
    if (this.results.has("gender")) {
      var answer = this.results.get("gender") as SingleAnswer | undefined;
    }
    return new Promise((resolve, reject) => resolve([]));
  }
}
