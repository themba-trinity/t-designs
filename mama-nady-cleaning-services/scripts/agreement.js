// canvas signature
const canvas = document.getElementById('canvas');
let ctx, drawing = false;

if (canvas) {
    ctx = canvas.getContext('2d');
    function resize() { canvas.width = canvas.offsetWidth; canvas.height = 150; ctx.lineWidth = 2; ctx.lineCap = 'round'; }
    resize(); window.addEventListener('resize', resize);
    function getPos(e) { const r = canvas.getBoundingClientRect(); const t = e.touches ? e.touches[0] : e; return { x: t.clientX - r.left, y: t.clientY - r.top }; }
    canvas.addEventListener('mousedown', e => { drawing = true; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); });
    canvas.addEventListener('mousemove', e => { if (!drawing) return; const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); });
    window.addEventListener('mouseup', () => drawing = false);
    canvas.addEventListener('touchstart', e => { drawing = true; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); e.preventDefault(); }, { passive: false });
    canvas.addEventListener('touchmove', e => { if (!drawing) return; const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); e.preventDefault(); }, { passive: false });
    canvas.addEventListener('touchend', () => drawing = false);
    window.clearCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

    // auto fee
    const salaryInput = document.getElementById('salary');
    if (salaryInput) {
        salaryInput.addEventListener('input', e => {
            const sal = parseFloat(e.target.value) || 0;
            document.getElementById('fee').value = sal;
            const disp = document.getElementById('feeDisplay');
            if (disp) disp.textContent = sal;
        });
    }

    // submit
    const agreementForm = document.getElementById('agreementForm');
    if (agreementForm) {
        agreementForm.addEventListener('submit', e => {
            e.preventDefault();
            const btn = e.target.querySelector('button[type="submit"]');
            btn.textContent = 'Saving...'; btn.disabled = true;

            const formData = Object.fromEntries(new FormData(e.target));
            formData.signature = canvas.toDataURL();
            formData.timestamp = new Date().toISOString();
            formData.id_key = Date.now();

            // 1. SAVE TO LOCAL STORAGE - HIDDEN
            const all = JSON.parse(localStorage.getItem('mamanadyRegistrations') || '[]');
            all.push(formData);
            localStorage.setItem('mamnadyRegistrations', JSON.stringify(all));

            // 2. AUTOMATED NOTIFICATION TO AGENT
            const text = `🔔 NEW REGISTRATION\nName: ${formData.fullNames}\nID: ${formData.id}\nPhone: ${formData.phone}\nPosition: ${formData.position}\nSalary: R${formData.salary} Fee: R${formData.fee}\nCheck admin panel: admin-login.html`;
            window.open(`https://wa.me/27846587782?text=${encodeURIComponent(text)}`, '_blank');

            document.getElementById('msg').textContent = `✅ Thank you ${formData.fullNames}! Your registration was sent to Agent.`;
            e.target.reset(); clearCanvas();
            btn.textContent = 'Submit & Save Agreement'; btn.disabled = false;
        });
    }
}