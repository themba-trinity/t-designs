 src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"

        const supabaseClient = supabase.createClient('https://YOUR_PROJECT.supabase.co', 'YOUR_ANON_KEY');

        async function checkAuth() {
            const { data } = await supabaseClient.auth.getSession();
            if (!data.session) { location.href = 'admin-login.html'; }
            loadData();
        }
        checkAuth();

        async function loadData() {
            const { data: regs } = await supabaseClient.from('registrations').select('*').order('created_at', { ascending: false });
            const { data: reqs } = await supabaseClient.from('employer_requests').select('*').order('created_at', { ascending: false });
            document.getElementById('regList').innerHTML = regs.map(r => `
    <div class="card"><strong>${r.full_names}</strong> - ${r.position}<br>ID: ${r.id_number} | 📞 ${r.phone}<br>📍 ${r.address} | R${r.salary} fee R${r.fee}<br><small>${new Date(r.created_at).toLocaleString()}</small><br><a href="${r.signature}" target="_blank">View Signature</a></div>
  `).join('') || 'No registrations';
            document.getElementById('reqList').innerHTML = reqs.map(r => `
    <div class="card"><strong>${r.name}</strong> - ${r.service_type}<br>📞 ${r.phone} | 📍 ${r.location}<br>${r.message}<br><small>${new Date(r.created_at).toLocaleString()}</small><br><a href="https://wa.me/${r.phone}" target="_blank" style="background:#25D366;color:white;padding:0.4rem 0.8rem;border-radius:6px;text-decoration:none">WhatsApp Employer</a></div>
  `).join('') || 'No requests';
        }
        document.getElementById('logout').addEventListener('click', async () => {
            await supabaseClient.auth.signOut(); localStorage.clear(); location.href = 'admin-login.html';
        });
        function exportCSV() { /* simple export */ alert('Use Supabase Dashboard -> Export CSV for now'); }
