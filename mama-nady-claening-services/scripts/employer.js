const employerForm = document.getElementById('employerForm');
if (employerForm) {
    employerForm.addEventListener('submit', e => {
        e.preventDefault();
        const fd = Object.fromEntries(new FormData(e.target));
        fd.timestamp = new Date().toISOString();
        fd.id_key = Date.now();

        const all = JSON.parse(localStorage.getItem('employerRequest') || '[]');
        all.push(fd);

        localStorage.setItem('employerRequest', JSON.stringify(all));

        const text = '🔔 NEW EMPLOYER REQUEST\nName: ${fd.empName}\nPhone: ${fd.empPhone}\nLocation: ${fd.empLocation}\nServices: ${fd.empServices} R${fd.empSalary}\nDays: ${fd.empDays}\nMsg: ${fd.empMsg}';

        window.open('https://wa.me/27846587782?text=${encodeURIComponent(text)}', '_blank');

            document.getElementById('empMsgStatus').textContent = "✅ Request sent! Agent will contact you within 2 hours.";
        e.target.reset();
    });
}