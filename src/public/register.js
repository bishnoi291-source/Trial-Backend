const form = document.getElementById('registerForm');
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
  const payload = {
    name: fd.get('name'),
    email: fd.get('email'),
    password: fd.get('password')
  };

  submitBtn.disabled = true;
  submitBtn.textContent = 'Creating account…';

  try {
    const res = await fetch('/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.success) {
      throw new Error(data.message || `Registration failed (${res.status})`);
    }

    showSuccess('Account created. Redirecting you to log in…');
    form.reset();
    setTimeout(() => { window.location.href = '/login'; }, 1200);

  } catch (err) {
    showError(err.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Create account →';
  }
});