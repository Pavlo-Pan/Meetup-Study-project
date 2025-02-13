import eventsStore from './eventstore.js';

function formatDate(date) {
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC' };
    return date.toLocaleString('en-US', options).replace(',', ' ·').replace('AM', 'AM UTC').replace('PM', 'PM UTC');
}
document.addEventListener("DOMContentLoaded", () => {
    renderEvents2Page(eventsStore);
    setupFilters(eventsStore);

    const languageMenu = document.getElementById("language-menu");
    const languageButton = document.getElementById("header-btn-language");
    
    languageButton.addEventListener("click", () => {
        languageMenu.classList.toggle("visible");
    });
    
    document.addEventListener("click", (event) => {
        if (!languageButton.contains(event.target) && !languageMenu.contains(event.target)) {
            languageMenu.classList.remove("visible");
        }
    });
    
    languageMenu.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            alert(`Выбран язык: ${event.target.textContent}`);
            languageMenu.classList.remove("visible");
        }
    });

    const loginButton = document.getElementById("header-btn-log-in");
    const loginForm = document.getElementById("login");
    const signUpButton = document.getElementById("header-btn-sign-up");
    const registerForm = document.getElementById("register");

    loginButton.addEventListener("click", function () {
        if (loginForm.style.display === "none" || loginForm.style.display === "") {
            loginForm.style.display = "block";
        } else {
            loginForm.style.display = "none";
        }
    });

    signUpButton.addEventListener("click", function () {
        if (registerForm.style.display === "none" || registerForm.style.display === "") {
            registerForm.style.display = "block";
        } else {
            registerForm.style.display = "none";
        }
    });
});

let showAllEvents = false;
let filters = { category: "Any category", distance: "Any distance", type: "Any type", date: "Any" };



function createEventElement2Page(event) {
    const eventElement2Page = document.createElement("div");
    eventElement2Page.classList.add("events-filtration");
    eventElement2Page.innerHTML = `
        <div class="div-events-near-container-content-main-imag"> <img src="${event.image}" alt="${event.title}" class="events-near-container-content-main-imag">
        ${event.type === "online" ? '<div class="online-event"><img src="img/camera.svg" alt=""><span>Online Event</span></div>' : ''}
        </div>
        
        <div>
        <p class="events-date"> ${formatDate(event.date)}</p>
        <h3>${event.title}</h3>
        <p class="events-branch-distance">${event.category}${event.distance ? ` (${event.distance})` : ''}</p>
        <p class="quantity-price"><p class="quantity-price">${event.attendees ? event.attendees + " attendees" : ""}</p> 
        </div>
    `; 
    return eventElement2Page; 
    }

    
    function renderEvents2Page(events) {
        const container2 = document.querySelector("#filtredContent");
        container2.innerHTML = "";
        const sortedEvents = events
        .filter(event => filterEvent(event))
        .sort((a, b) => new Date(a.date) - new Date(b.date));
        const eventsToRender = showAllEvents ? sortedEvents : sortedEvents.slice(0, 5);

        eventsToRender.forEach(event => {
            container2.appendChild(createEventElement2Page(event));
        });
        renderAllEvents(sortedEvents);
    }

    function renderAllEvents(events) {
        const button = document.querySelector("#linkEvents");

        if (!button.dataset.listener) {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                showAllEvents = !showAllEvents;
                renderEvents2Page(events);
            });
            button.dataset.listener = "true";
        }
    }

    // ФИЛЬТРАЦИЯ: Функция фильтрации событий
    function filterEvent(event) {
        return (filters.category === "Any category"    || event.category === filters.category) &&
            (filters.distance === "Any distance" || event.distance === parseInt(filters.distance)) &&
            (filters.type === "Any type" || event.type.toLowerCase() === filters.type.toLowerCase())
    }

    // ФИЛЬТРАЦИЯ: Настройка обработчиков кликов на кнопки фильтрации

    function setupFilters() {
        document.querySelector("#categoryFiltr").addEventListener("click", () => showFilterOptions("category", ["Any category", "Social Activities", "Hobbies and Passions", "Health and Wellbeing", "Business", "Technology"]));
        document.querySelector("#distanceFiltr").addEventListener("click", () => showFilterOptions("distance", ["Any distance", "5km", "10km", "15km", "25km", "50km", "75km", "100km"]));
        document.querySelector("#typeFiltr").addEventListener("click", () => showFilterOptions("type", ["Any type", "Online", "Offline"]));
    }


    // ФИЛЬТРАЦИЯ: Функция отображения выпадающих списков
    function showFilterOptions(filterType, options) {
        let existingMenu = document.querySelector(".filter-menu");
        if (existingMenu) existingMenu.remove();

        const container = document.querySelector("#seite2ContentButtons");

        const menu = document.createElement("div");
        menu.classList.add("filter-menu");

        const button = document.querySelector(`#${filterType}Filtr`);
        const rect = button.getBoundingClientRect();

        // Устанавливаем позицию относительно родителя
        menu.style.position = "absolute";
        menu.style.top = `${button.offsetTop + button.offsetHeight}px`;
        menu.style.left = `${button.offsetLeft}px`;

        options.forEach(option => {
            const btn = document.createElement("button");
            btn.textContent = option;
            btn.addEventListener("click", () => {
                if (filterType === "distance") {
                    filters[filterType] = option === "Any distance" ? "Any distance" : parseInt(option) + "km";
                } else {
                    filters[filterType] = option;
                }
                button.textContent = option;
                renderEvents2Page(eventsStore);
                menu.remove();
            });


            menu.appendChild(btn);
        });

        container.appendChild(menu);

        document.addEventListener("click", (e) => {
            if (!menu.contains(e.target) && !button.contains(e.target)) {
                menu.remove();
            }
        }, { once: true });
    }


    document.addEventListener("DOMContentLoaded", function () {
        const eventMap = document.getElementById("eventMap");
        const btnMap = document.getElementById("btnMap");
        const btnMapClose = document.getElementById("btnMapClose");
        const imgMap = eventMap.querySelector("img");
    
        // Создание iframe элемента
        const iframe = document.createElement("iframe");
        iframe.src = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d96770.39974003103!2d-73.9712408787175!3d40.71636560368423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sde!2sde!4v1738951042147!5m2!1sde!2sde";
        iframe.width = "345";
        iframe.height = "285";
        iframe.style.border = "0";
        iframe.allowFullscreen = true;
        iframe.loading = "lazy";
        iframe.referrerPolicy = "no-referrer-when-downgrade";
        iframe.style.display = "none"; // Изначально скрываем
    
        // Вставка iframe внутрь eventMap
        eventMap.insertBefore(iframe, imgMap.nextSibling);
    
        // Обработчик нажатия на "Browse in map"
        btnMap.addEventListener("click", function () {
            imgMap.style.display = "none"; // Скрываем картинку
            btnMap.style.display = "none"; // Скрываем кнопку
            iframe.style.display = "block"; // Показываем карту
            btnMapClose.style.display = "block"; // Показываем кнопку закрытия
        });
    
        // Обработчик нажатия на кнопку закрытия карты
        btnMapClose.addEventListener("click", function () {
            imgMap.style.display = "block"; // Показываем картинку
            btnMap.style.display = "block"; // Показываем кнопку
            iframe.style.display = "none"; // Скрываем карту
            btnMapClose.style.display = "none"; // Скрываем кнопку закрытия
        });
    
        // Скрываем кнопку закрытия изначально
        btnMapClose.style.display = "none";
    });

    const searchInput = document.querySelector("#header-input-events-search");

searchInput.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase().trim();
    const filteredEvents = eventsStore.filter(e => 
        e.title.toLowerCase().includes(query) || e.category.toLowerCase().includes(query)
    );
    renderEvents2Page(filteredEvents);
});
