// hamburger
document.getElementById('menu')?.addEventListener('click', () => {
    document.getElementById('nav')?.classList.toggle('open');
});

// active nav link
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        document.querySelectorAll('.nav a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
    }
});