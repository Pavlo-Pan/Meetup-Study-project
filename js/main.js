import eventsStore from './eventstore.js';

function formatDate(date) {
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC' };
    return date.toLocaleString('en-US', options).replace(',', ' ·').replace('AM', 'AM UTC').replace('PM', 'PM UTC');
}

let showAllEvents = false;
let showAllOnline = false;

function createEventElement(event) {
    const eventElement = document.createElement("div");
    eventElement.classList.add("events-near-container-content");

    eventElement.innerHTML = `
        <div class="div-events-near-container-content-main-imag"> <img src="${event.image}" alt="${event.title}" class="events-near-container-content-main-imag">
        ${event.type === "online" ? '<div class="online-event"><img src="img/camera.svg" alt=""><span>Online Event</span></div>' : ''}
        </div>
        <div><h3>${event.title}</h3>
        <p class="events-branch-distance">${event.category}${event.distance ? ` (${event.distance})` : ''}</p>
        <p class="events-date"><img src="img/calender.svg" alt=""> ${formatDate(event.date)}</p>
        <p class="quantity-price">
        </p></div>
    `;
    function updateQuantityPrice() {
        const quantityPriceElement = eventElement.querySelector(".quantity-price");
        if (!event.attendees) {
            quantityPriceElement.innerHTML = "";
            return;
        }
        else if (window.matchMedia("(max-width: 426px)").matches) {
            quantityPriceElement.innerHTML =
                `${event.attendees} attendees`;
        } else {
            
            //
            quantityPriceElement.innerHTML = `<svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0003 17.0837C13.9123 17.0837 17.0837 13.9123 17.0837 10.0003C17.0837 6.08831 13.9123 2.91699 10.0003 2.91699C6.08831 2.91699 2.91699 6.08831 2.91699 10.0003C2.91699 13.9123 6.08831 17.0837 10.0003 17.0837ZM10.0003 18.3337C14.6027 18.3337 18.3337 14.6027 18.3337 10.0003C18.3337 5.39795 14.6027 1.66699 10.0003 1.66699C5.39795 1.66699 1.66699 5.39795 1.66699 10.0003C1.66699 14.6027 5.39795 18.3337 10.0003 18.3337Z" fill="#707070"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4419 7.05806C15.686 7.30213 15.686 7.69786 15.4419 7.94194L9.65916 13.7247C8.92691 14.4569 7.73974 14.457 7.00751 13.7247L4.55806 11.2752C4.31398 11.0312 4.31398 10.6355 4.55806 10.3914C4.80213 10.1473 5.19786 10.1473 5.44194 10.3914L7.89139 12.8408C8.13546 13.0849 8.53116 13.0849 8.77525 12.8408L14.5581 7.05806C14.8022 6.81398 15.1978 6.81398 15.4419 7.05806Z" fill="#707070"/>
            </svg>${event.attendees} going
                        <span><svg width="16" height="16" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4938 4.99967C14.1107 4.99967 14.6493 4.66451 14.9375 4.16634H16.8271C17.2874 4.16634 17.6605 4.53944 17.6605 4.99967V6.77136C16.2228 7.14139 15.1605 8.44651 15.1605 9.99967C15.1605 11.5528 16.2228 12.8579 17.6605 13.228V14.9997C17.6605 15.4599 17.2874 15.833 16.8271 15.833H14.9375C14.6493 15.3348 14.1107 14.9997 13.4938 14.9997C12.8769 14.9997 12.3383 15.3348 12.0501 15.833H3.49382C3.03358 15.833 2.66048 15.4599 2.66048 14.9997V13.228C4.09817 12.8579 5.16048 11.5528 5.16048 9.99967C5.16048 8.44651 4.09817 7.14139 2.66048 6.77136V4.99967C2.66048 4.53944 3.03358 4.16634 3.49382 4.16634H12.0501C12.3383 4.66451 12.8769 4.99967 13.4938 4.99967ZM15.9938 9.99967C15.9938 8.61892 17.1131 7.49967 18.4938 7.49967V4.99967C18.4938 4.0792 17.7476 3.33301 16.8271 3.33301H14.3271C14.3271 3.79324 13.9541 4.16634 13.4938 4.16634C13.0336 4.16634 12.6605 3.79324 12.6605 3.33301H3.49382C2.57334 3.33301 1.82715 4.0792 1.82715 4.99967V7.49967C3.20786 7.49967 4.32715 8.61892 4.32715 9.99967C4.32715 11.3804 3.20786 12.4997 1.82715 12.4997V14.9997C1.82715 15.9202 2.57334 16.6663 3.49382 16.6663H12.6605C12.6605 16.2061 13.0336 15.833 13.4938 15.833C13.9541 15.833 14.3271 16.2061 14.3271 16.6663H16.8271C17.7476 16.6663 18.4938 15.9202 18.4938 14.9997V12.4997C17.1131 12.4997 15.9938 11.3804 15.9938 9.99967ZM13.4938 7.49967C13.9541 7.49967 14.3271 7.12658 14.3271 6.66634C14.3271 6.20611 13.9541 5.83301 13.4938 5.83301C13.0336 5.83301 12.6605 6.20611 12.6605 6.66634C12.6605 7.12658 13.0336 7.49967 13.4938 7.49967ZM13.4938 10.833C13.9541 10.833 14.3271 10.4599 14.3271 9.99967C14.3271 9.53942 13.9541 9.16634 13.4938 9.16634C13.0336 9.16634 12.6605 9.53942 12.6605 9.99967C12.6605 10.4599 13.0336 10.833 13.4938 10.833ZM14.3271 13.333C14.3271 13.7933 13.9541 14.1663 13.4938 14.1663C13.0336 14.1663 12.6605 13.7933 12.6605 13.333C12.6605 12.8728 13.0336 12.4997 13.4938 12.4997C13.9541 12.4997 14.3271 12.8728 14.3271 13.333Z" fill="#707070"/>
            </svg> Free </span>`;
        }
        
    }

    updateQuantityPrice();
    return eventElement;
}

function renderEvents(events) {
    const container = document.querySelector(".events-near-container");
    container.innerHTML = "";
    (showAllEvents ? events : events.slice(0, 8)).forEach(event => {
        container.appendChild(createEventElement(event));
    });
    renderSeeAllNear(events);
}

function renderSeeAllNear(events) {
    const button = document.querySelector("#see-all-near");
    if (!button.dataset.listener) {
        button.addEventListener("click", () => {
            showAllEvents = !showAllEvents;
            renderEvents(events);
        });
        button.dataset.listener = "true";
    }
}

function renderOnlineEvents(events) {
    const container = document.querySelector(".online-events");
    container.innerHTML = "";

    const onlineEvents = events.filter(event => event.type === "online");
    const displayedEvents = showAllOnline ? onlineEvents : onlineEvents.slice(0, 4)

    displayedEvents.forEach(event => {
        container.appendChild(createEventElement(event));
    });
    renderSeeAllOnline(events)
}

function renderSeeAllOnline(events) {
    const button = document.querySelector("#see-all-online");

    if (!button.dataset.listener) {
        button.addEventListener("click", () => {
            showAllOnline = !showAllOnline;
            renderOnlineEvents(events);
        });
        button.dataset.listener = "true";
    }
}

const searchInput = document.querySelector("#header-input-events-search");

searchInput.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase().trim();
    const filteredEvents = eventsStore.filter(e =>
        e.title.toLowerCase().includes(query) || e.category.toLowerCase().includes(query)
    );
    renderEvents(filteredEvents);
});

document.addEventListener("DOMContentLoaded", () => {
    renderEvents(eventsStore);
    renderOnlineEvents(eventsStore)

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
    document.addEventListener("click", function (event) {
        document.querySelectorAll(".form-block").forEach(form => {
            if (!form.contains(event.target) && !event.target.closest("button")) {
                form.style.display = "none";
            }
        });
    });

    const cookieConsent = document.getElementById("cookieConsent");
    const acceptButton = document.querySelector(".accept");
    const rejectButton = document.querySelector(".reject");

    function hideCookieConsent() {
        cookieConsent.style.display = "none";
    }

    acceptButton.addEventListener("click", hideCookieConsent);
    rejectButton.addEventListener("click", hideCookieConsent);

});

