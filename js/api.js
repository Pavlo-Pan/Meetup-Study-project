
/*---------------------------------------------------
----------------language--------------------------------
----------------------------------------------------------*/
const API_KEY = "c8081e63-a33d-4cb3-840d-b581e82ba19d:fx";
// Убедитесь, что ключ корректный

const selectedLanguageElement = document.getElementById("selected-language");
const languageMenu = document.getElementById("language-menu");
const languageButton = document.getElementById("header-btn-language");

// Открытие и закрытие меню выбора языка
languageButton.addEventListener("click", () => {
    console.log("Клик по кнопке языка");
    languageMenu.style.display = languageMenu.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", (event) => {
    if (!languageButton.contains(event.target) && !languageMenu.contains(event.target)) {
        languageMenu.style.display = "none";
    }
});

// Функция запроса к DeepL API
async function translateText(text, targetLang) {
    const url = "https://api-free.deepl.com/v2/translate";

    try {
        const params = new URLSearchParams();
        params.append("auth_key", API_KEY);
        params.append("text", text);
        params.append("target_lang", targetLang.toUpperCase());

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });

        const data = await response.json();

        if (data.translations && data.translations.length > 0) {
            return data.translations[0].text;
        } else {
            console.error("Ошибка перевода:", data);
            return text;
        }
    } catch (error) {
        console.error("Ошибка запроса к DeepL API:", error);
        return text;
    }
}

// Перевод всего контента страницы
async function translatePage(targetLang) {
    const selectedButton = document.querySelector(`button[data-lang="${targetLang}"]`);
    if (selectedButton) {
        selectedLanguageElement.textContent = selectedButton.textContent;
    } else {
        console.error(`Кнопка с data-lang="${targetLang}" не найдена.`);
    }
    selectedLanguageElement.textContent = document.querySelector(`button[data-lang="${targetLang}"]`).textContent;

    const elementsToTranslate = document.querySelectorAll("h1, h2, h3, p, button, a");
    const translations = {};

    console.log(`Перевод страницы на: ${targetLang}`);
    for (let element of elementsToTranslate) {
        const originalText = element.textContent.trim();

        // Проверяем, есть ли перевод в кешe (localStorage)
        if (localStorage.getItem(`${originalText}_${targetLang}`)) {
            element.textContent = localStorage.getItem(`${originalText}_${targetLang}`);
        } else {
            const translatedText = await translateText(originalText, targetLang);
            element.textContent = translatedText;
            localStorage.setItem(`${originalText}_${targetLang}`, translatedText); // Кешируем перевод
        }
    }
}

// Добавление обработчика для кнопок выбора языка
document.querySelectorAll("#language-menu button").forEach(button => {
    console.log(`Добавляется обработчик для ${button.dataset.lang}`);
    button.addEventListener("click", async () => {
        const selectedLang = button.dataset.lang;
        await translatePage(selectedLang);
        languageMenu.style.display = "none";
    });
});
