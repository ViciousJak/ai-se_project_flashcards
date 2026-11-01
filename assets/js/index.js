import { hexToString } from "./colors.js";
import { decks, getDeckByID } from "./decks.js";
import { renderCarouselView } from "./carousel.js";

const decksView = document.querySelector("#decks");
const carouselView = document.querySelector("#carousel");
const notFoundView = document.querySelector("#not-found");

const deckTemplate = document.querySelector("#deck-template");
const deckList = document.querySelector(".wrapping__row__display-contents");
function createDeckEl(item) {
  const deckElement = deckTemplate.content
    .querySelector(".deck")
    .cloneNode(true);
  deckElement.querySelector(".deck__link").href = `#carousel/${item.id}`;

  const colorName = hexToString(item.color);
  if (colorName) {
    deckElement.classList.add(`deck--${colorName}`);
  }

  const cardCount = item.cards.length;
  deckElement.querySelector(".deck__count").textContent =
    `${cardCount} ${cardCount === 1 ? "card" : "cards"}`;

  deckElement.querySelector(".deck__title").textContent = item.name;
  deckElement
    .querySelector(".deck__btn_delete")
    .addEventListener("click", (event) => {
      deckElement.remove();
    });

  return deckElement;
}
function renderDeckEl(item) {
  const deckElement = createDeckEl(item);
  deckList.prepend(deckElement);
}

function router() {
  const hash = window.location.hash;

  if (!hash || hash === "#" || hash === "#home") {
    showView(decksView);
    return;
  }
  const [route, currentDeckId] = hash.slice(1).split("/");
  if (route === "carousel" && currentDeckId) {
    const deck = getDeckByID(currentDeckId);
    if (deck) {
      renderCarouselView(deck);
      showView(carouselView);
      return;
    }
  }

  showView(notFoundView);
}
function showView(viewToShow) {
  [decksView, carouselView, notFoundView].forEach((view) => {
    view.hidden = view !== viewToShow;
  });
}

decks.forEach(renderDeckEl);

window.addEventListener("hashchange", router);
router();
