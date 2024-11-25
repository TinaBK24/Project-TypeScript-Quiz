let arrIndex: number = 0;

function turnPage() {
  if (arrIndex === 0) {
    previouesBtn.style.display = "none";
  } else if (arrIndex === 19) {
    nextBtn.style.display = "none";
  } else {
    previouesBtn.style.display = "block";
    nextBtn.style.display = "block";
  }
  //   ==============================
}

nextBtn.addEventListener("click", () => {
  arrIndex++;
  displayQuiz(arrIndex);
  turnPage();
});
previouesBtn.addEventListener("click", () => {
  arrIndex--;
  displayQuiz(arrIndex);
  turnPage();
});
