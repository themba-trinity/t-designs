const navBtn = document.querySelector("#navBtn");
const navMenu = document.querySelector("#navMenu");

if (navBtn && navMenu) {
    navBtn.addEventListener("click", () => {
        navMenu.classList.toggle("open");

        if (navMenu.classList.contains("open")) {
            navBtn.textContent = "✖";
            navBtn.style.transform = "rotate(180deg)";
        } else {
            navBtn.textContent = "☰";
            navBtn.style.transform = "rotate(0deg)";
        }
    });
}
    const year = document.getElementById('currentyear');
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    const Im = document.getElementById('lastModified');
    if (Im) {
        Im.textContent = `Last Modified: ${document.lastModified}`;
    }

    const ts = document.getElementById('timestamp');
    if (ts) {
        ts.value = new Date().toISOString();
    }

