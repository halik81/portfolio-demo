const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const filterStatus = document.querySelector(".filter-status");

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    let visibleCount = 0;

    for (const card of projectCards) {
      const categories = card.dataset.categories.split(" ");
      const isVisible = selectedFilter === "all" || categories.includes(selectedFilter);
      card.hidden = !isVisible;
      visibleCount += Number(isVisible);
    }

    for (const filterButton of filterButtons) {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("is-active", isSelected);
      filterButton.setAttribute("aria-pressed", String(isSelected));
    }

    filterStatus.textContent = `${visibleCount} ${visibleCount === 1 ? "projet affiché" : "projets affichés"}`;
  });
}

const themeToggle = document.querySelector(".theme-toggle");

function getCurrentTheme() {
  return document.documentElement.dataset.theme
    || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}

function updateThemeButton() {
  const isDarkTheme = getCurrentTheme() === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDarkTheme));
  themeToggle.setAttribute(
    "aria-label",
    isDarkTheme ? "Activer le thème clair" : "Activer le thème sombre",
  );
}

themeToggle.addEventListener("click", () => {
  const nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  updateThemeButton();

  try {
    localStorage.setItem("portfolio-theme", nextTheme);
  } catch (error) {
    console.warn("Le thème ne peut pas être mémorisé dans ce navigateur.", error);
  }
});

updateThemeButton();

const menuToggle = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector(".site-nav");

function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  siteNavigation.classList.toggle("is-open", isOpen);
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

siteNavigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const contactFields = [
  {
    input: document.querySelector("#contact-name"),
    error: document.querySelector("#name-error"),
    message: "Indiquez votre nom (au moins 2 caractères).",
    isValid: (value) => value.trim().length >= 2,
  },
  {
    input: document.querySelector("#contact-email"),
    error: document.querySelector("#email-error"),
    message: "Indiquez une adresse e-mail valide.",
    isValid: (value, input) => input.validity.valid && value.trim().length > 0,
  },
  {
    input: document.querySelector("#contact-message"),
    error: document.querySelector("#message-error"),
    message: "Votre message doit contenir au moins 10 caractères.",
    isValid: (value) => value.trim().length >= 10,
  },
];

function validateField(field) {
  const value = field.input.value;
  const isValid = field.isValid(value, field.input);
  field.input.setAttribute("aria-invalid", String(!isValid));
  field.error.textContent = isValid ? "" : field.message;
  return isValid;
}

for (const field of contactFields) {
  field.input.addEventListener("input", () => {
    if (field.input.hasAttribute("aria-invalid")) {
      validateField(field);
    }
    formStatus.textContent = "";
    formStatus.classList.remove("is-error");
  });
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const isFormValid = contactFields.map(validateField).every(Boolean);

  if (!isFormValid) {
    formStatus.textContent = "Vérifiez les champs signalés pour préparer votre message.";
    formStatus.classList.add("is-error");
    contactFields.find((field) => field.input.getAttribute("aria-invalid") === "true").input.focus();
    return;
  }

  const name = document.querySelector("#contact-name").value.trim();
  const email = document.querySelector("#contact-email").value.trim();
  const subject = document.querySelector("#contact-subject").value.trim() || "Prise de contact";
  const message = document.querySelector("#contact-message").value.trim();
  const emailBody = `Bonjour Alex,\n\n${message}\n\n— ${name}\n${email}`;
  const mailtoUrl = `mailto:bonjour@example.invalid?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

  formStatus.textContent = "Démo : votre logiciel de messagerie va s’ouvrir, mais cette adresse fictive ne reçoit aucun message.";
  formStatus.classList.remove("is-error");
  window.location.href = mailtoUrl;
});

document.querySelector("#current-year").textContent = String(new Date().getFullYear());