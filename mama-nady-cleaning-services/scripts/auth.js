const AGENT_EMAIL = "mamanady@adim.com";
const AGENT_PASS = "mamanady2026";

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('adminEmail').value.trim();
        const pass = document.getElementById('adminPass').value;

        if (email === AGENT_EMAIL && pass === AGENT_PASS) {
            localStorage.setItem('mamanady_admin_auth', 'true');
            localStorage.setItem('mamanady_admin_email');
            localStorage.href = 'admin.html';
        } else {
            document.getElementById('loginMsg').textContent = '❌ Wrong email or password'
        }
    });
}