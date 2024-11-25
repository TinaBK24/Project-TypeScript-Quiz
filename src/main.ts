import "./style.css";
import { IQuestion } from "./interface/IQuestion";

//: 1 seite EN DE
const langBtns = document.getElementById("lang-buttons") as HTMLDivElement;
const enBtn = document.getElementById("english") as HTMLButtonElement;
const deBtn = document.getElementById("german") as HTMLButtonElement;

//: 2 seite EASY HARD
const lvlBtns = document.getElementById("lvl-buttons") as HTMLDivElement;
const easyBtn = document.getElementById("easy") as HTMLButtonElement;
const hardBtn = document.getElementById("hard") as HTMLButtonElement;

//: 3 seite START
const startBtnDisplay = document.getElementById(
  "start-button-display"
) as HTMLDivElement;
const startBtn = document.getElementById("start-button") as HTMLButtonElement;

//: 4 seite QUESTION
const quizStart = document.getElementById("quiz-start") as HTMLDivElement;

const numberQuiz = document.getElementById(
  "number-quiz"
) as HTMLParagraphElement;
const numberCorrect = document.getElementById(
  "number-correct"
) as HTMLParagraphElement;

const quizBoard = document.getElementById("quiz-board") as HTMLDivElement;

const correctOrIncorrectDisplay = document.getElementById(
  "correct-or-incorrect-display"
) as HTMLDivElement;

const previouesBtn = document.getElementById(
  "previoues-btn"
) as HTMLButtonElement;
const nextBtn = document.getElementById("next-btn") as HTMLButtonElement;

//: 5 seite RESULT
const resultDisplay = document.getElementById("result") as HTMLDivElement;
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

    return quizArr;
  } catch (error) {
    console.error(error);
  }
}
