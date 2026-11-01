// Auto fee calculation
const salaryInput = document.getElementById("salary");

if (salaryInput) {
    salaryInput.addEventListener("input", (e) => {
        const salary = parseFloat(e.target.value) || 0;

        // Current fee = 100% of salary
        // Change this formula if needed
        const fee = salary;

        const feeInput = document.getElementById("fee");
        const feeDisplay = document.getElementById("feeDisplay");

        if (feeInput) feeInput.value = fee.toFixed(2);
        if (feeDisplay) feeDisplay.textContent = `R${fee.toFixed(2)}`;
    });
}

// Signature Canvas
const canvas = document.getElementById("canvas");

if (canvas) {
    const ctx = canvas.getContext("2d");
    let drawing = false;

    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = 150;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#000";
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function getPosition(e) {
        const rect = canvas.getBoundingClientRect();
        const point = e.touches ? e.touches[0] : e;

        return {
            x: point.clientX - rect.left,
            y: point.clientY - rect.top
        };
    }

    // Mouse Events
    canvas.addEventListener("mousedown", (e) => {
        drawing = true;
        const pos = getPosition(e);

        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    });

    canvas.addEventListener("mousemove", (e) => {
        if (!drawing) return;

        const pos = getPosition(e);

        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    });

    window.addEventListener("mouseup", () => {
        drawing = false;
    });

    // Touch Events
    canvas.addEventListener("touchstart", (e) => {
        drawing = true;
        const pos = getPosition(e);

        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);

        e.preventDefault();
    });

    canvas.addEventListener("touchmove", (e) => {
        if (!drawing) return;

        const pos = getPosition(e);

        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();

        e.preventDefault();
    });

    canvas.addEventListener("touchend", () => {
        drawing = false;
    });

    // Clear Signature Button
    window.clearCanvas = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    // Form Submission
    const agreementForm = document.getElementById("agreementForm");

    if (agreementForm) {
        agreementForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const data = Object.fromEntries(
                new FormData(agreementForm)
            );

            data.signature = canvas.toDataURL();
            data.timestamp = new Date().toISOString();

            // Save locally
            const agreements = JSON.parse(
                localStorage.getItem("MamaNadyAgreements") || "[]"
            );

            agreements.push(data);

            localStorage.setItem(
                "MamaNadyAgreements",
                JSON.stringify(agreements)
            );

            // Success Message
            const msg = document.getElementById("msg");

            if (msg) {
                msg.textContent =
                    `✅ Agreement saved for ${data.fullNames}.`;
            }

            // WhatsApp Message
            const whatsappText = `
New Agreement

Name: ${data.fullNames}
ID: ${data.id}
Phone: ${data.phone}
Position: ${data.position}
Salary: R${data.salary}
Fee: R${data.fee}
            `.trim();

            // South African number format
            const whatsappNumber = "27718358666";

            window.open(
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`,
                "_blank"
            );

            // Optional reset
            agreementForm.reset();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
    }
}