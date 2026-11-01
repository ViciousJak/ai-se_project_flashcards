import { hexToString } from "./colors.js";
import { removeColorClasses } from "./colors.js";
function renderCarouselView(deck) {
  let currentIndex = 0;
  let showingQuestion = true;

  const carouselEl = document.querySelector(".carousel");
  const leftBtn = carouselEl.querySelector(".carousel__btn_left");
  const rightBtn = carouselEl.querySelector(".carousel__btn_right");
  const flipBtn = carouselEl.querySelector(".carousel__btn_flip");
  const carouselTitle = carouselEl.querySelector(".carousel__title");
  const carouselCard = carouselEl.querySelector(".carousel__card");
  const carouselCardText = carouselEl.querySelector(".carousel__card-text");

  function disableButton(buttonEl, disabledClass) {
    buttonEl.classList.add(disabledClass);
    buttonEl.disabled = true;
  }
  function enableButton(buttonEl, disabledClass) {
    buttonEl.classList.remove(disabledClass);
    buttonEl.removeAttribute("disabled");
  }

  function updateArrows() {
    if (currentIndex === 0) {
      disableButton(leftBtn, "carousel__btn_left_disabled");
    } else {
      enableButton(leftBtn, "carousel__btn_left_disabled");
    }

    if (currentIndex === deck.cards.length - 1) {
      disableButton(rightBtn, "carousel__btn_right_disabled");
    } else {
      enableButton(rightBtn, "carousel__btn_right_disabled");
    }
  }

  function updateDisplay() {
    if (showingQuestion) {
      carouselCardText.textContent = deck.cards[currentIndex].question;
      carouselCard.classList.remove("carousel__card_color_white");
    } else {
      carouselCardText.textContent = deck.cards[currentIndex].answer;
      carouselCard.classList.add("carousel__card_color_white");
    }

    carouselTitle.textContent = `${deck.name} · ${currentIndex + 1} /${deck.cards.length}`;
    updateArrows();
  }

  flipBtn.addEventListener("click", () => {
    showingQuestion = !showingQuestion;
    updateDisplay();
  });

  rightBtn.addEventListener("click", () => {
    if (currentIndex < deck.cards.length - 1) {
      currentIndex++;
      showingQuestion = true;
      updateDisplay();
    }
  });

  leftBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      showingQuestion = true;
      updateDisplay();
    }
  });

  removeColorClasses(carouselCard);
  const colorName = hexToString(deck.color);

  if (colorName) {
    carouselCard.classList.add(`card__carousel_color_${colorName}`);
  }

  updateDisplay();
}
export { renderCarouselView };
