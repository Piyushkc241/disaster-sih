// Run only after the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // ===== TEXT TO SPEECH =====
  const ttsBtn = document.getElementById("ttsBtn");
  if (ttsBtn && "speechSynthesis" in window) {
    ttsBtn.addEventListener("click", () => {
      const text = document.body.innerText;
      const speech = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(speech);
    });
  }

  // ===== STOP TEXT TO SPEECH =====
const ttsStopBtn = document.getElementById("ttsStopBtn");
if (ttsStopBtn && "speechSynthesis" in window) {
    ttsStopBtn.addEventListener("click", () => {
        speechSynthesis.cancel();   // stops immediately
    });
}


  // ===== LARGE TEXT TOGGLE =====
  const largeTextBtn = document.getElementById("largeTextBtn");
  if (largeTextBtn) {
    largeTextBtn.addEventListener("click", () => {
      document.body.classList.toggle("large-text");
    });
  }

  // ===== HIGH CONTRAST TOGGLE =====
  const contrastBtn = document.getElementById("contrastBtn");
  if (contrastBtn) {
    contrastBtn.addEventListener("click", () => {
      document.body.classList.toggle("high-contrast");
    });
  }

  // ===== QUIZ EVALUATION =====
  const quizForm = document.getElementById("quizForm");
  if (quizForm) {
    quizForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let score = 0;

      if (document.querySelector("input[name='q1']:checked")?.value === "b") score++;
      if (document.querySelector("input[name='q2']:checked")?.value === "a") score++;
      if (document.querySelector("input[name='q3']:checked")?.value === "a") score++;

      const resultEl = document.getElementById("quizResult");
      if (resultEl) {
        resultEl.innerText = "Your Score: " + score + "/3";
      }
    });
  }
});

