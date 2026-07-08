const form = document.getElementById('loginForm');
const errorEl = document.getElementById('formError');
const successEl = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

function hide(el){ el.classList.remove('error','success'); el.style.display='none'; el.textContent=''; }
function showError(msg){ hide(successEl); errorEl.textContent = msg; errorEl.classList.add('error'); errorEl.style.display='block'; }
function showSuccess(msg){ hide(errorEl); successEl.textContent = msg; successEl.classList.add('success'); successEl.style.display='block'; }

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  hide(errorEl); hide(successEl);

  const fd = new FormData(form);
  const payload = { email: fd.get('email'), password: fd.get('password') };

  submitBtn.disabled = true;
  submitBtn.textContent = 'Logging in…';

  try {
    const res = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.success) {
      throw new Error(data.message || `Login failed (${res.status})`);
    }

    // same keys app.js reads on the homepage, so state carries over
    localStorage.setItem('trial_token', data.token);
    localStorage.setItem('trial_email', data.user.email);

    showSuccess('Logged in — taking you home…');
    setTimeout(() => { window.location.href = '/'; }, 700);

  } catch (err) {
    showError(err.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Log in →';
  }
});