const header = document.querySelector(".site-header");
const toggle = document.querySelector("[data-language-toggle]");
const translatable = document.querySelectorAll("[data-hu][data-en]");

const setLanguage = (language) => {
  document.documentElement.lang = language === "en" ? "en" : "hu";
  translatable.forEach((element) => {
    element.textContent = element.dataset[language];
  });
  toggle.textContent = language === "en" ? "HU" : "EN";
  localStorage.setItem("bps-language", language);
};

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
});

toggle.addEventListener("click", () => {
  const nextLanguage = document.documentElement.lang === "en" ? "hu" : "en";
  setLanguage(nextLanguage);
});

setLanguage(localStorage.getItem("bps-language") || "hu");
