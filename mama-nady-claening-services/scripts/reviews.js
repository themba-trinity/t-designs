let reviews = JSON.parse(localStorage.getItem('cleoReviews')) || [
    { name: "Mrs. Jacobs - Plattekloof", stars: 5, text: "Cleo gave me a wonderful nanny. No phone during work, very respectful." },
    { name: "Mr. Smith - Blouberg", stars: 5, text: "Fast placement. Interviewed 2 ladies, chose one. Honest, no stealing." },
    { name: "Noluthando - Housekeeper", stars: 5, text: "Cleo helped me get a good job in Constantia. Clear rules, fair fee." }
];

function renderReviews() {
    const list = document.getElementById('reviewList');
    if (!list) return;
    list.innerHTML = reviews.map(r => `<div class="card"><span class="stars">${'★'.repeat(r.stars)}</span><br><strong>${r.name}</strong><br>${r.text}</div>`).join('');
}

renderReviews();

const revForm = document.getElementById('revForm');
if (revForm) {
    revForm.addEventListener('submit', e => {
        e.preventDefault();
        const newRev = {
            name: document.getElementById('revName').value,
            stars: parseInt(document.getElementById('revStars').value),
            text: document.getElementById('revText').value
        };
        reviews.unshift(newRev);
        localStorage.setItem('cleoReviews', JSON.stringify(reviews));
        renderReviews();
        e.target.reset();
    });
}