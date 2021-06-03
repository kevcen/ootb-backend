import request from "supertest";
import app from "../../app";
import Answer from "../../interfaces/Answer";

describe("Quiz", function () {
  it("Attempts to get a recommendation from the quiz engine, with no data given", function (done) {
    request(app)
      .post("/quiz")
      .send(new Map<String, Answer>())
      .expect([], done);
  });
});
