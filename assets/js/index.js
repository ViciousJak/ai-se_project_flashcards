import { hexToString } from "./colors.js";
import { decks, getDeckByID } from "./decks.js";
import { renderCarouselView } from "./carousel.js";
import { renderDeckView } from "./deck-view.js";

const galleryView = document.querySelector("#home");
const deckView = document.querySelector("#deck-view");
const carouselView = document.querySelector("#carousel");
const notFoundView = document.querySelector("#not-found");

const deckTemplate = document.querySelector("#deck-template");
const deckList = galleryView.querySelector(".deck-view__list");
const practiceButton = deckView.querySelector(".gallery__practice");

const page = document.querySelector(".page");

let currentDeck = null;

practiceButton.addEventListener("click", () => {
  if (currentDeck && currentDeck.cards.length > 0) {
    window.location.hash = `#carousel/${currentDeck.id}`;
  }
});

function createDeckEl(item) {
  const deckElement = deckTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  deckElement.dataset.deckId = item.id;
  const deckLink = deckElement.querySelector(".card__link");
  deckLink.href = `#deck/${item.id}`;

  const colorName = hexToString(item.color);
  if (colorName) {
    deckElement.classList.add(`card--${colorName}`);
  }

  const cardCount = item.cards.length;
  deckElement.querySelector(".card__count").textContent =
    `${cardCount} ${cardCount === 1 ? "card" : "cards"}`;

  deckElement.querySelector(".card__title").textContent = item.name;
  deckElement
    .querySelector(".card__btn_delete")
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
    updateDeckCounts();
    showView(galleryView);
    return;
  }
  const [route, currentDeckId] = hash.slice(1).split("/");
  if (route === "deck" && currentDeckId) {
    const deck = getDeckByID(currentDeckId);
    if (deck) {
      currentDeck = deck;
      renderDeckView(deck);
      showView(deckView);
      return;
    }
  }

  if (route === "carousel" && currentDeckId) {
    const deck = getDeckByID(currentDeckId);
    if (deck && deck.cards.length > 0) {
      currentDeck = deck;
      renderCarouselView(deck);
      showView(carouselView);
      return;
    }
  }

  showView(notFoundView);
}

function updateDeckCounts() {
  decks.forEach((deck) => {
    const deckElement = deckList.querySelector(`[data-deck-id="${deck.id}"]`);
    if (!deckElement) {
      return;
    }

    const cardCount = deck.cards.length;
    deckElement.querySelector(".card__count").textContent =
      `${cardCount} ${cardCount === 1 ? "card" : "cards"}`;
  });
}

function showView(viewToShow) {
  [galleryView, deckView, carouselView, notFoundView].forEach((view) => {
    view.hidden = view !== viewToShow;
  });
  page.classList.toggle(
    "page_no-mobile-bar",
    viewToShow === carouselView || viewToShow === notFoundView,
  );
}

decks.forEach(renderDeckEl);

window.addEventListener("hashchange", router);
router();
