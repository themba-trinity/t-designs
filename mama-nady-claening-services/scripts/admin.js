// protect page
if (localStorage.getItem('mamanady_admin_auth') !== 'true' && location.pathname.includes('admin.html')) {
    location.href = 'admin-login.html';
}

const emailDisplay = document.getElementById('adminEmailDisplay');
if (emailDisplay) emailDisplay.textContent = localStorage.getItem('mamnady_admin_email') || 'Agent';

function loadAll() {
    const regs = JSON.parse(localStorage.getItem('cleoRegistrations') || '[]').slice().reverse();
    const reqs = JSON.parse(localStorage.getItem('employerRequests') || '[]').slice().reverse();
    const revs = JSON.parse(localStorage.getItem('mamnadyReviews') || '[]');

    const regCount = document.getElementById('regCount');
    const reqCount = document.getElementById('reqCount');
    if (regCount) regCount.textContent = `(${regs.length})`;
    if (reqCount) reqCount.textContent = `(${reqs.length})`;

    const regList = document.getElementById('regList');
    if (regList) {
        regList.innerHTML = regs.length ? regs.map(r => `
      <div class="card"><strong>${r.fullNames}</strong> - ${r.position} - R${r.salary}
      <br>ID: ${r.id} | 📞 ${r.phone} | 📍 ${r.address}
      <br>Fee R${r.fee} | Signed: ${r.empName} | ${new Date(r.timestamp).toLocaleString()}
      <br><a href="${r.signature}" target="_blank">🖊️ View Signature</a> | <a href="https://wa.me/${r.phone.replace(/[^0-9]/g, '')}" target="_blank">WhatsApp</a>
      <br><button class="btn" style="background:#eee;margin-top:0.5rem" onclick="deleteOne('mamanadyRegistrations',${r.id_key})">Delete</button></div>
    `).join('') : '<p>No registrations yet</p>';
    }

    const reqList = document.getElementById('reqList');
    if (reqList) {
        reqList.innerHTML = reqs.length ? reqs.map(r => `
      <div class="card"><strong>${r.empName}</strong> - ${r.empService}
      <br>📞 ${r.empPhone} | 📍 ${r.empLocation} | R${r.empSalary} | ${r.empDays}
      <br>${r.empMsg}<br><small>${new Date(r.timestamp).toLocaleString()}</small>
      <br><a href="https://wa.me/${r.empPhone.replace(/[^0-9]/g, '')}" target="_blank" style="background:#25D366;color:white;padding:0.4rem 0.8rem;border-radius:6px;text-decoration:none">WhatsApp Employer</a>
      <button class="btn" style="background:#eee;margin-left:0.5rem" onclick="deleteOne('employerRequests',${r.id_key})">Delete</button></div>
    `).join('') : '<p>No employer requests yet</p>';
    }

    const adminReviewList = document.getElementById('adminReviewList');
    if (adminReviewList) {
        adminReviewList.innerHTML = revs.map(r => `<div class="card"><span class="stars">${'★'.repeat(r.stars)}</span> <strong>${r.name}</strong><br>${r.text}</div>`).join('');
    }
}

function deleteOne(key, id_key) {
    if (!confirm('Delete this entry?')) return;
    let all = JSON.parse(localStorage.getItem(key) || '[]');
    all = all.filter(x => x.id_key !== id_key);
    localStorage.setItem(key, JSON.stringify(all));
    loadAll();
}
function clearAll(key) {
    if (!confirm(`Clear ALL ${key}? Cannot be undone!`)) return;
    localStorage.removeItem(key);
    loadAll();
}

const logoutBtn = document.getElementById('logout');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('mamanady_admin_auth');
        location.href = 'admin-login.html';
    });
}

// load on admin page
if (document.getElementById('regList')) loadAll();