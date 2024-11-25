import "./style.css";
import { IQuestion } from "./interface/IQuestion";

const BASE_URL = "https://vz-wd-24-01.github.io/typescript-quiz/questions/";
const EN_EASY_ROUTE = `${BASE_URL}/easy.json`;
const DE_EASY_ROUTE = `${BASE_URL}/leicht.json`;
const EN_HARD_ROUTE = `${BASE_URL}/hard.json`;
const DE_HARD_ROUTE = `${BASE_URL}/schwer.json`;

let quizArr: IQuestion[] = [];

async function fetchQuiz(URL: string) {
  try {
    const response: Response = await fetch(URL);
    const data = await response.json();
    // random questions
    quizArr = data.sort(() => Math.random() - 0.5);
    console.log("quizArr: ", quizArr);
    return quizArr;
  } catch (error) {
    console.error(error);
  }
}
// test
fetchQuiz(EN_EASY_ROUTE);
// test
