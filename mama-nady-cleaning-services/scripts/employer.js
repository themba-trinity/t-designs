const employerForm = document.getElementById('employerForm');

if (employerForm) {
    employerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const fd = Object.fromEntries(
            new FormData(e.target)
        );

        fd.timestamp = new Date().toISOString();
        fd.id_key = Date.now();

        const all = JSON.parse(
            localStorage.getItem('employerRequest') || '[]'
        );

        all.push(fd);

        localStorage.setItem(
            'employerRequest',
            JSON.stringify(all)
        );

        const text = `🔔 NEW EMPLOYER REQUEST

Name: ${fd.empName}
Phone: ${fd.empPhone}
Location: ${fd.empLocation}
Services: ${fd.empServices}
Salary: R${fd.empSalary}
Days: ${fd.empDays}
Message: ${fd.empMsg}`;

        window.open(
            `https://wa.me/27718358666?text=${encodeURIComponent(text)}`,
            '_blank'
        );

        const status = document.getElementById('empMsgStatus');

        if (status) {
            status.textContent =
                '✅ Request sent! Agent will contact you within 2 hours.';
        }

        e.target.reset();
    });
}