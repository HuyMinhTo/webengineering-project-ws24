document.addEventListener("DOMContentLoaded", () => {
    console.log("Website geladen");
});

window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.classList.add("small");
    } else {
        header.classList.remove("small");
    }
});

