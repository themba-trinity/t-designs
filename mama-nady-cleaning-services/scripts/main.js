// Hamburger Menu
document.getElementById('navBtn')?.addEventListener('click', () => {
    document.getElementById('nav')?.classList.toggle('open');
});

// Active Navigation Link
const currentPage =
    location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.navigation a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        document
            .querySelectorAll('.navigation a')
            .forEach(a => a.classList.remove('active'));

        link.classList.add('active');
    }
});