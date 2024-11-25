// // ^minyeong====================
// quizArr = (await fetchQuiz(EN_EASY_ROUTE)) as IQuestion[];
// console.log(quizArr);

// function displayQuiz(arrIndex: number) {
//   quizBoard.innerHTML = `<label class="question">${quizArr[arrIndex].question}</label>
// <div id="answerBox">
//     <label><input type="radio" name="radio" value="0">${quizArr[arrIndex].answers[0]}</label>
//     <label><input type="radio" name="radio" value="1">${quizArr[arrIndex].answers[1]}</label>
//     <label><input type="radio" name="radio" value="2">${quizArr[arrIndex].answers[2]}</label>
//     <label><input type="radio" name="radio" value="3">${quizArr[arrIndex].answers[3]}</label>
// </div>`;
// }

// displayQuiz(0);

// const answerBox = document.querySelector("#answerBox") as HTMLDivElement;

// answerBox.addEventListener("click", () => {
//   const selectedRadio = document.querySelector(
//     'input[name="radio"]:checked'
//   ) as HTMLInputElement;
//   const selectedAnswer: number = Number(selectedRadio?.value);
//   console.log(selectedAnswer);
// });

// // ^minyeong====================
