const defaultLocale = "en_US";
let locale;

let translations = {};

// When the page content is ready...
document.addEventListener("DOMContentLoaded", () => {
    // Translate the page to the default locale
    setLocale(defaultLocale);
});

async function setLocale(newLocale) {
    if (newLocale === locale) return;
    const newTranslations =
        await fetchTranslationsFor(newLocale);
    locale = newLocale;
    translations = newTranslations;
    translatePage();
}

async function fetchTranslationsFor(newLocale) {
    const response = await fetch(`/lang/${newLocale}.json`);
    return await response.json();
}

function translatePage() {
    document
        .querySelectorAll("[data-i18n-key]")
        .forEach(translateElement);
}

function getTranslation(key) {
    if (key.length === 1) return translations[key];
    let translation = translations[key[0]];
    for (let i = 1; i < key.length; i++) {
        translation = translation[key[i]];
    }
    return translation;
}

function translateElement(element) {
    const key = element.getAttribute("data-i18n-key").split(".");
    const translation = getTranslation(key);
    element.innerText = translation;
}

document.addEventListener("DOMContentLoaded", () => {
    setLocale(defaultLocale);
    bindLocaleSwitcher(defaultLocale);
});

function bindLocaleSwitcher(initialValue) {
    const switcher =
        document.querySelector("[data-i18n-switcher]");
    switcher.value = initialValue;
    switcher.onchange = (e) => {
        // Set the locale to the selected option[value]
        setLocale(e.target.value);
    };
}