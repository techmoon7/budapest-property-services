const header = document.querySelector(".site-header");
const toggle = document.querySelector("[data-language-toggle]");
const translatable = document.querySelectorAll("[data-hu][data-en]");
const cards = document.querySelectorAll(".work-card");
const modal = document.querySelector("[data-work-modal]");
const modalImage = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");

let currentLanguage = "hu";

const setLanguage = (language) => {
  currentLanguage = language;
  document.documentElement.lang = language === "en" ? "en" : "hu";
  translatable.forEach((element) => {
    element.textContent = element.dataset[language];
  });
  toggle.textContent = language === "en" ? "HU" : "EN";
  localStorage.setItem("bps-language", language);
};

const openModal = (card) => {
  modalImage.src = card.dataset.modalImage;
  modalImage.alt = card.dataset[`title${currentLanguage === "en" ? "En" : "Hu"}`];
  modalTitle.textContent = card.dataset[`title${currentLanguage === "en" ? "En" : "Hu"}`];
  modalText.textContent = card.dataset[`text${currentLanguage === "en" ? "En" : "Hu"}`];
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
};

const closeModal = () => {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
};

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
});

toggle.addEventListener("click", () => {
  const nextLanguage = document.documentElement.lang === "en" ? "hu" : "en";
  setLanguage(nextLanguage);
});

cards.forEach((card) => {
  card.addEventListener("click", () => openModal(card));
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

setLanguage(localStorage.getItem("bps-language") || "hu");
