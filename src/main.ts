import "./style.css";
import { IQuestion } from "./interface/IQuestion";

// ^tina====================

//: 1 seite EN DE
const langBtnsDisplay = document.getElementById(
  "lang-buttons-display"
) as HTMLDivElement;
const enBtn = document.getElementById("english") as HTMLButtonElement;
const deBtn = document.getElementById("german") as HTMLButtonElement;

//: 2 seite EASY HARD
const lvlBtnsDisplay = document.getElementById(
  "lvl-buttons-display"
) as HTMLDivElement;
const easyBtn = document.getElementById("easy") as HTMLButtonElement;
const hardBtn = document.getElementById("hard") as HTMLButtonElement;

//: 3 seite START
const startBtnDisplay = document.getElementById(
  "start-button-display"
) as HTMLDivElement;
const startBtn = document.getElementById("start-button") as HTMLButtonElement;

//: 4 seite QUESTION
const quizStartDisplay = document.getElementById(
  "quiz-start-display"
) as HTMLDivElement;
const numberDisplay = document.querySelector(
  "#numberDisplay"
) as HTMLDivElement;
const numberQuiz = document.getElementById(
  "number-quiz"
) as HTMLParagraphElement;
const numberCorrect = document.getElementById(
  "number-correct"
) as HTMLParagraphElement;

const quizBoard = document.getElementById("quiz-board") as HTMLDivElement;

// const selectedRadio = document.querySelector(
//   'input[name="radio"]:checked'
// ) as HTMLInputElement;

const correctOrIncorrectDisplay = document.getElementById(
  "correct-or-incorrect-display"
) as HTMLDivElement;

const previouesBtn = document.getElementById(
  "previoues-btn"
) as HTMLButtonElement;
const nextBtn = document.getElementById("next-btn") as HTMLButtonElement;

//: 5 seite RESULT
const resultDisplay = document.getElementById("result") as HTMLDivElement;
const seeResultBtn = document.querySelector(
  "#seeResult-btn"
) as HTMLButtonElement;
// ^tina====================

// ^minyeong====================
const BASE_URL = "https://vz-wd-24-01.github.io/typescript-quiz/questions/";
const EN_EASY_ROUTE = `${BASE_URL}/easy.json`;
const DE_EASY_ROUTE = `${BASE_URL}/leicht.json`;
const EN_HARD_ROUTE = `${BASE_URL}/hard.json`;
const DE_HARD_ROUTE = `${BASE_URL}/schwer.json`;

let quizArr: IQuestion[] = [];
let arrIndex: number = 0;
let counterCorrect: number = 0;

let selectedAnswers: (number | null)[] = Array(20).fill(null); //! Array zum Speichern der ausgewählten Antworten

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

function displayQuiz(arrIndex: number) {
  quizBoard.innerHTML = `<label class="question">${quizArr[arrIndex].question}</label>
<div id="answerBox">
    <label><input type="radio" name="radio" value="0">${quizArr[arrIndex].answers[0]}</label>
    <label><input type="radio" name="radio" value="1">${quizArr[arrIndex].answers[1]}</label>
    <label><input type="radio" name="radio" value="2">${quizArr[arrIndex].answers[2]}</label>
    <label><input type="radio" name="radio" value="3">${quizArr[arrIndex].answers[3]}</label>
</div>`;
  displayPageNumber();

  //! Wenn eine Auswahl bereits getroffen wurde, wird die entsprechende Radio-Button gesetzt
  const selectedAnswer = selectedAnswers[arrIndex];
  if (selectedAnswer !== null) {
    const radioButton = quizBoard.querySelector(
      `input[name="radio"][value="${selectedAnswer}"]`
    ) as HTMLInputElement;
    if (radioButton) {
      radioButton.checked = true; //! Setzt die Auswahl
      disableRadioButtons(); //! Sperrt die Buttons
    }
  }

  displayPageNumber();
}
// ^minyeong====================

// ^tina====================

//- buttons für Sprache
function langButtonsClick(this: HTMLButtonElement) {
  langBtnsDisplay.style.display = "none";
  lvlBtnsDisplay.style.display = "block";

  if (this === enBtn) {
    easyBtn.textContent = "EASY";
    hardBtn.textContent = "HARD";
    easyBtn.style.marginRight = "2rem";
    previouesBtn.textContent = "Previous";
    nextBtn.textContent = "Next";
    seeResultBtn.textContent = "See Result";
  } else if (this === deBtn) {
    easyBtn.textContent = "LEICHT";
    hardBtn.textContent = "SCHWER";
    easyBtn.style.marginRight = "2rem";
    previouesBtn.textContent = "Zurück";
    nextBtn.textContent = "Weiter";
    seeResultBtn.textContent = "Dein Ergebnis";
  } else {
    console.error("Buttons wurden nicht gefunden");
  }
}
enBtn?.addEventListener("click", langButtonsClick);
deBtn?.addEventListener("click", langButtonsClick);

//- buttons für level
function lvlButtonsClick(this: HTMLButtonElement) {
  const textButton = this.textContent;
  switch (textButton) {
    case "EASY":
    case "LEICHT":
      lvlBtnsDisplay.style.display = "none";
      startBtnDisplay.style.display = "block";

      startBtn?.addEventListener("click", async () => {
        startBtnDisplay.style.display = "none";
        quizStartDisplay.style.display = "flex";

        const url = textButton === "EASY" ? EN_EASY_ROUTE : DE_EASY_ROUTE;
        quizArr = (await fetchQuiz(url)) as IQuestion[];
        console.log(quizArr);

        playQuiz();
      });
      break;

    case "HARD":
    case "SCHWER":
      lvlBtnsDisplay.style.display = "none";
      startBtnDisplay.style.display = "block";

      startBtn?.addEventListener("click", async () => {
        startBtnDisplay.style.display = "none";
        quizStartDisplay.style.display = "flex";

        const url = textButton === "HARD" ? EN_HARD_ROUTE : DE_HARD_ROUTE;
        quizArr = (await fetchQuiz(url)) as IQuestion[];
        console.log(quizArr);

        playQuiz();
      });
      break;

    default:
      if (enBtn.textContent === "English") {
        console.error("Unknown level: ", textButton);
      } else if (deBtn.textContent === "Deutsch") {
        console.error("Unbekannter Schwierigkeitsgrad: ", textButton);
      }
  }
}
easyBtn?.addEventListener("click", lvlButtonsClick);
hardBtn?.addEventListener("click", lvlButtonsClick);
// ^tina====================

// ^minyeong====================

function turnPage() {
  if (arrIndex === 0) {
    previouesBtn.style.display = "none";
  } else if (arrIndex === 19) {
    nextBtn.style.display = "none";
  } else {
    previouesBtn.style.display = "block";
    nextBtn.style.display = "block";
  }
}

function playQuiz() {
  displayQuiz(arrIndex);

  nextBtn.addEventListener("click", () => {
    arrIndex++;
    quizBoard.style.display = "block";
    correctOrIncorrectDisplay.style.display = "none";
    turnPage();
    displayQuiz(arrIndex);
    displayResult();
  });

  previouesBtn.addEventListener("click", () => {
    arrIndex--;
    quizBoard.style.display = "block";
    correctOrIncorrectDisplay.style.display = "none";

    turnPage();
    displayQuiz(arrIndex);
  });

  quizBoard.addEventListener("change", (event) => {
    const target = event.target as HTMLInputElement;
    if (target.name === "radio") {
      const selectedAnswer = Number(target.value);

      selectedAnswers[arrIndex] = selectedAnswer; //! Speichert die Auswahl für die aktuelle Frage

      reviewCheck(arrIndex); //! Überprüft die Antwort

      disableRadioButtons(); //! Sperrt die Radio-Buttons
    }
  });
}

function displayPageNumber() {
  numberQuiz.textContent = `${arrIndex + 1} / 20 Questions`;
}

// ^minyeong====================

// ^tina====================

function reviewCheck(arrIndex: number) {
  const correctAnswers = quizArr[arrIndex].correct;
  console.log("correctAnswser:", correctAnswers);

  const selectedRadio = document.querySelector(
    'input[name="radio"]:checked'
  ) as HTMLInputElement;

  if (selectedRadio) {
    const selectedAnswer = Number(selectedRadio.value);

    quizBoard.style.display = "none";
    correctOrIncorrectDisplay.style.display = "block";

    if (correctAnswers === selectedAnswer) {
      counterCorrect++;
      numberCorrect.textContent = `Score: ${counterCorrect} / 20`;
      correctOrIncorrectDisplay.textContent = "✅";
    } else {
      correctOrIncorrectDisplay.textContent = "❌";
    }
  }
}

//! Funktion zum Sperren der Radio-Buttons nach der Auswahl
function disableRadioButtons() {
  const radioButtons = document.querySelectorAll(
    'input[name="radio"]'
  ) as NodeListOf<HTMLInputElement>;

  radioButtons.forEach((radioButton) => {
    radioButton.disabled = true;
  });
}

// ^tina====================
// *Minyeong====================
function displayResult() {
  quizBoard.addEventListener("change", () => {
    if (arrIndex === 19 && quizBoard.style.display === "none") {
      nextBtn.style.display = "none";
      seeResultBtn.style.display = "block";
    }
    seeResultBtn.addEventListener("click", () => {
      quizStartDisplay.style.display = "none";

      //- Circle
      const percentage = Math.round((counterCorrect / 20) * 100);

      const fillElements = document.querySelectorAll(
        ".fill"
      ) as NodeListOf<HTMLElement>;
      const insideCircle = document.querySelector(
        ".inside-circle"
      ) as HTMLDivElement;

      insideCircle.textContent = `${percentage}%`;

      const angle = (counterCorrect / 20) * 360;

      if (angle <= 180) {
        fillElements[0].style.transform = `rotate(${angle}deg)`;
        fillElements[1].style.transform = `rotate(0deg)`;
      } else {
        fillElements[0].style.transform = "rotate(180deg)";
        fillElements[1].style.transform = `rotate(${angle - 180}deg)`;
      }

      const resultText = document.getElementById(
        "result-text"
      ) as HTMLParagraphElement;
      resultText.textContent = `Your Score is ${counterCorrect} / 20`;

      correctOrIncorrectDisplay.style.display = "none";
      resultDisplay.style.display = "flex";
      numberDisplay.style.display = "none";
      seeResultBtn.style.display = "none";
      previouesBtn.style.display = "none";
    });
  });
}
// *Minyeong====================
