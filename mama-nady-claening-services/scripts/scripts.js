
                // Auto fee calculation - example: 1 week salary
                document.getElementById('salary').addEventListener('input', e => {
                    const sal = parseFloat(e.target.value) || 0;
    const fee = sal; // change formula as you charge - e.g. 50% or 100%
    document.getElementById('fee').value = fee;
    document.getElementById('feeDisplay').textContent = fee;
                });

    // Signature canvas
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let drawing = false;
    function resize() {canvas.width = canvas.offsetWidth; canvas.height = 150; ctx.lineWidth = 2; ctx.lineCap = 'round'; }
    resize(); window.addEventListener('resize', resize);
    function pos(e) { const r = canvas.getBoundingClientRect(); const t = e.touches ? e.touches[0] : e; return {x: t.clientX - r.left, y: t.clientY - r.top }; }
                canvas.addEventListener('mousedown', e => {drawing = true; const p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); });
                canvas.addEventListener('mousemove', e => { if (!drawing) return; const p = pos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); });
                window.addEventListener('mouseup', () => drawing = false);
                canvas.addEventListener('touchstart', e => {drawing = true; const p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); e.preventDefault(); });
                canvas.addEventListener('touchmove', e => { if (!drawing) return; const p = pos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); e.preventDefault(); });
                canvas.addEventListener('touchend', () => drawing = false);
                window.clearCanvas = () => {ctx.clearRect(0, 0, canvas.width, canvas.height); };

                document.getElementById('agreementForm').addEventListener('submit', e => {
        e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.signature = canvas.toDataURL();
    data.timestamp = new Date().toISOString();
    const all = JSON.parse(localStorage.getItem('MamaNadyAgreements') || '[]');
    all.push(data);
    localStorage.setItem('MamaNadyAgreements', JSON.stringify(all));
                    document.getElementById('msg').textContent = `✅ Agreement saved for ${data.fullNames}. Sent to 071 835 8666.`;
    // optional: send to WhatsApp
    const text = `New Agreement: ${data.fullNames}, ID: ${data.id}, Phone: ${data.phone}, Position: ${data.position}, Salary: R${data.salary}, Fee: R${data.fee}`;
                    window.open(`https://wa.me/071 835 8666?text=${encodeURIComponent(text)}`, '_blank');
                });
