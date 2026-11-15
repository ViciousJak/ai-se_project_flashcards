import { hexToString } from "./colors.js";

const deckView = document.querySelector("#deck-view");
const cardTemplate = document.querySelector("#card-template");
const deckTitle = deckView.querySelector(".gallery__title");
const deckList = deckView.querySelector(".gallery__list");

function renderDeckView(deck) {
  deckTitle.textContent = deck.name;
  deckList.replaceChildren();
  deckView.querySelector(".gallery__practice").disabled =
    deck.cards.length === 0;

  const colorName = hexToString(deck.color);
  deck.cards.forEach((card) => {
    const cardElement = cardTemplate.content
      .querySelector(".card")
      .cloneNode(true);
    const cardTitle = cardElement.querySelector(".card__title");
    const flipButton = cardElement.querySelector(".card__btn_flip");
    const deleteButton = cardElement.querySelector(".card__btn_delete");
    let showingQuestion = true;

    cardTitle.textContent = card.question;
    if (colorName) {
      cardElement.classList.add(`card--${colorName}`);
    }

    flipButton.addEventListener("click", () => {
      showingQuestion = !showingQuestion;
      cardTitle.textContent = showingQuestion ? card.question : card.answer;
      cardElement.classList.toggle("card--flipped", !showingQuestion);
      flipButton.setAttribute(
        "aria-label",
        showingQuestion ? "Show answer" : "Show question",
      );
    });

    deleteButton.addEventListener("click", () => {
      const cardIndex = deck.cards.indexOf(card);
      if (cardIndex !== -1) {
        deck.cards.splice(cardIndex, 1);
      }
      cardElement.remove();
      deckView.querySelector(".gallery__practice").disabled =
        deck.cards.length === 0;
    });

    deckList.append(cardElement);
  });
}

export { renderDeckView };
