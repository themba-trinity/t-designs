// Protect Admin Page
if (
    location.pathname.includes("admin.html") &&
    localStorage.getItem("mamanady_admin_auth") !== "true"
) {
    location.href = "admin-login.html";
}

// Display Admin Email
const emailDisplay = document.getElementById("adminEmailDisplay");

if (emailDisplay) {
    emailDisplay.textContent =
        localStorage.getItem("mamanady_admin_email") || "Agent";
}

// Load All Data
function loadAll() {
    const registrations = JSON.parse(
        localStorage.getItem("mamanadyRegistrations") || "[]"
    ).reverse();

    const employerRequests = JSON.parse(
        localStorage.getItem("employerRequests") || "[]"
    ).reverse();

    const reviews = JSON.parse(
        localStorage.getItem("mamanadyReviews") || "[]"
    );

    // Counters
    const regCount = document.getElementById("regCount");
    const reqCount = document.getElementById("reqCount");

    if (regCount) regCount.textContent = `(${registrations.length})`;
    if (reqCount) reqCount.textContent = `(${employerRequests.length})`;

    // Registration List
    const regList = document.getElementById("regList");

    if (regList) {
        regList.innerHTML = registrations.length
            ? registrations.map(r => `
                <div class="card">
                    <strong>${r.fullNames}</strong> - ${r.position}
                    <br>Salary: R${r.salary}
                    <br>ID: ${r.id}
                    <br>📞 ${r.phone}
                    <br>📍 ${r.address}
                    <br>Fee: R${r.fee}
                    <br>Signed By: ${r.empName}
                    <br><small>${new Date(r.timestamp).toLocaleString()}</small>

                    ${r.signature
                    ? `<br><a href="${r.signature}" target="_blank">🖊️ View Signature</a>`
                    : ""
                }

                    <br><button
                        class="btn"
                        onclick="deleteOne('mamanadyRegistrations', ${r.id_key})"
                        style="margin-top:10px;background:#ddd;">
                        Delete
                    </button>
                </div>
            `).join("")
            : "<p>No registrations found.</p>";
    }

    // Employer Requests
    const reqList = document.getElementById("reqList");

    if (reqList) {
        reqList.innerHTML = employerRequests.length
            ? employerRequests.map(r => `
                <div class="card">
                    <strong>${r.empName}</strong>
                    <br>📞 ${r.empPhone}
                    <br>📍 ${r.empLocation}
                    <br>Service: ${r.empServices}
                    <br>Salary: R${r.empSalary}
                    <br>Days: ${r.empDays}
                    <br>${r.empMsg || ""}
                    <br><small>${new Date(r.timestamp).toLocaleString()}</small>

                    <br>
                    <a
                        href="https://wa.me/${r.empPhone.replace(/\D/g, "")}"
                        target="_blank"
                        class="whatsapp-btn">
                        WhatsApp Employer
                    </a>

                    <button
                        class="btn"
                        onclick="deleteOne('employerRequests', ${r.id_key})"
                        style="margin-left:10px;background:#ddd;">
                        Delete
                    </button>
                </div>
            `).join("")
            : "<p>No employer requests found.</p>";
    }

    // Reviews
    const adminReviewList = document.getElementById("adminReviewList");

    if (adminReviewList) {
        adminReviewList.innerHTML = reviews.length
            ? reviews.map(r => `
                <div class="card">
                    <div class="stars">${"★".repeat(r.stars)}</div>
                    <strong>${r.name}</strong>
                    <p>${r.text}</p>
                </div>
            `).join("")
            : "<p>No reviews available.</p>";
    }
}

// Delete One Entry
function deleteOne(storageKey, id_key) {
    if (!confirm("Delete this record?")) return;

    let data = JSON.parse(
        localStorage.getItem(storageKey) || "[]"
    );

    data = data.filter(item => item.id_key !== id_key);

    localStorage.setItem(
        storageKey,
        JSON.stringify(data)
    );

    loadAll();
}

// Clear All Entries
function clearAll(storageKey) {
    if (!confirm(`Delete ALL data from ${storageKey}?`)) return;

    localStorage.removeItem(storageKey);
    loadAll();
}

// Logout
const logoutBtn = document.getElementById("logout");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("mamanady_admin_auth");
        location.href = "admin-login.html";
    });
}

// Make functions available to inline buttons
window.deleteOne = deleteOne;
window.clearAll = clearAll;

// Load Dashboard
if (document.getElementById("regList")) {
    loadAll();
}