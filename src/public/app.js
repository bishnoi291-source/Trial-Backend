// scattered stars
  const starsEl = document.getElementById('stars');
  for(let i=0;i<70;i++){
    const s = document.createElement('div');
    s.className='star';
    s.style.left = Math.random()*100+'%';
    s.style.top = Math.random()*55+'%';
    s.style.animationDelay = (Math.random()*4)+'s';
    starsEl.appendChild(s);
  }

  // glowing mall windows
  const winsEl = document.getElementById('windows');
  const winRects = [[70,60,26,26],[70,96,26,26],[70,132,26,26],[110,60,26,26],[110,96,26,26],
                     [1000,80,26,26],[1000,116,26,26],[1040,80,26,26],[1040,116,26,26],[1080,150,26,26]];
  winRects.forEach(([x,y,w,h],i)=>{
    const r = document.createElementNS('http://www.w3.org/2000/svg','rect');
    r.setAttribute('x',x); r.setAttribute('y',y);
    r.setAttribute('width',w); r.setAttribute('height',h);
    r.setAttribute('fill', Math.random()>0.3 ? '#ffd9a0' : '#3d2c6b');
    r.setAttribute('opacity', 0.5+Math.random()*0.5);
    r.style.animation = `twinkle ${3+Math.random()*3}s ease-in-out infinite`;
    r.style.animationDelay = (Math.random()*3)+'s';
    winsEl.appendChild(r);
  });

  // 3D parallax tilt on the storefront composition (mouse) + gentle auto-drift (touch/no-mouse)
  const wrap = document.getElementById('storefrontWrap');
  const panes = wrap.querySelectorAll('.pane');
  const scene = document.getElementById('scene');
  let mx=0, my=0;
  scene.addEventListener('mousemove', (e)=>{
    const r = wrap.getBoundingClientRect();
    mx = ((e.clientX - r.left)/r.width - 0.5);
    my = ((e.clientY - r.top)/r.height - 0.5);
    panes.forEach((p,i)=>{
      const depth = (i+1)*8;
      const base = p.style.getPropertyValue('--base') || '';
      p.style.transform = `${getBase(p)} rotateY(${mx*depth}deg) rotateX(${-my*depth}deg) translateZ(${(i+1)*10}px)`;
    });
  });
  function getBase(p){
    const map = {pane1:'translateZ(40px) rotateY(6deg)', pane2:'translateZ(90px) rotateY(-4deg)', pane3:'translateZ(140px) rotateY(-10deg) rotateX(4deg)'};
    return map[p.id] || '';
  }

  // tilt on feature cards
  document.querySelectorAll('[data-tilt]').forEach(card=>{
    card.addEventListener('mousemove', (e)=>{
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left)/r.width;
      const py = (e.clientY - r.top)/r.height;
      const rx = (py-0.5)*-10;
      const ry = (px-0.5)*10;
      card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      card.style.setProperty('--mx', (px*100)+'%');
      card.style.setProperty('--my', (py*100)+'%');
    });
    card.addEventListener('mouseleave', ()=>{
      card.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  /* =====================================================
     API WIRING
     Same-origin app (server.js serves this file AND /api/*),
     so plain relative fetch('/api/...') works with no base URL.
  ===================================================== */
  const api = (path, opts={}) => fetch(path, {
    ...opts,
    headers: { 'Content-Type':'application/json', ...(opts.headers||{}) }
  }).then(async r => {
    const data = await r.json().catch(()=>({}));
    if(!r.ok) throw new Error(data.message || `Request failed (${r.status})`);
    return data;
  });

  const auth = {
    get token(){ return localStorage.getItem('trial_token'); },
    get email(){ return localStorage.getItem('trial_email'); },
    set(token, email){ localStorage.setItem('trial_token', token); localStorage.setItem('trial_email', email); },
    clear(){ localStorage.removeItem('trial_token'); localStorage.removeItem('trial_email'); }
  };
  const authHeader = () => ({ Authorization: `Bearer ${auth.token}` });

  function refreshNav(){
    const loginLink = document.getElementById('loginNavLink');
    const bookingsLink = document.getElementById('myBookingsLink');
    const registerLink = document.getElementById('registerNavLink');
    if(auth.token){
      loginLink.textContent = `Log out (${auth.email})`;
      loginLink.href = '#';
      bookingsLink.style.display = 'inline';
      registerLink.style.display = 'none';
    } else {
      loginLink.textContent = 'Log in';
      loginLink.href = '/login';
      bookingsLink.style.display = 'none';
      registerLink.style.display = 'inline';
    }
  }
  refreshNav();

  document.getElementById('loginNavLink').addEventListener('click', (e)=>{
    if(auth.token){
      e.preventDefault();
      auth.clear();
      refreshNav();
    }
    // else: let the link navigate to /login normally
  });
  ['heroLoginBtn','closingLoginBtn'].forEach(id=>{
    document.getElementById(id).addEventListener('click', (e)=>{
      if(auth.token) e.preventDefault(); // already logged in, do nothing
      // else: let the link navigate to /login normally
    });
  });

  function openModal(id){ document.getElementById(id).classList.add('open'); }
  function closeModal(id){ document.getElementById(id).classList.remove('open'); }
  document.querySelectorAll('.modal-backdrop').forEach(bd=>{
    bd.addEventListener('click', (e)=>{ if(e.target === bd) closeModal(bd.id); });
    bd.querySelector('[data-close]').addEventListener('click', ()=> closeModal(bd.id));
  });

  function showError(id, msg){ const el=document.getElementById(id); el.textContent=msg; el.classList.add('show'); }
  function hideMsg(id){ const el=document.getElementById(id); el.classList.remove('show'); el.textContent=''; }

  // ---- malls ----
  const mallsGrid = document.getElementById('mallsGrid');
  function renderMalls(malls){
    if(!malls.length){ mallsGrid.innerHTML = '<p style="color:var(--cream-dim);">No malls match that filter.</p>'; return; }
    mallsGrid.innerHTML = malls.map(m => `
      <div class="card mall-card">
        <div class="icon">🏬</div>
        <h3>${escapeHtml(m.name)}</h3>
        <span class="rating">★ ${m.rating}</span>
        <p class="desc">${escapeHtml(m.description || '')} — ${escapeHtml(m.location || '')}</p>
        <button class="btn btn-primary" type="button" data-book-id="${m.id}" data-book-name="${escapeHtml(m.name)}">Book here</button>
      </div>
    `).join('');
    mallsGrid.querySelectorAll('[data-book-id]').forEach(btn=>{
      btn.addEventListener('click', ()=> openBooking(btn.dataset.bookId, btn.dataset.bookName));
    });
  }
  function escapeHtml(str=''){ return str.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  async function loadMalls(){
    try{
      const data = await api('/api/malls');
      renderMalls(data.data);
    }catch(err){
      mallsGrid.innerHTML = `<p style="color:#ff9b9b;">Couldn't load malls: ${err.message}</p>`;
    }
  }
  loadMalls();

  document.getElementById('filterMallsBtn').addEventListener('click', async ()=>{
    const min = document.getElementById('minRatingInput').value;
    if(!min){ return; }
    try{
      const data = await api(`/api/malls/search?minRating=${encodeURIComponent(min)}`);
      renderMalls(data.data);
    }catch(err){
      mallsGrid.innerHTML = `<p style="color:#ff9b9b;">${err.message}</p>`;
    }
  });
  document.getElementById('resetMallsBtn').addEventListener('click', ()=>{
    document.getElementById('minRatingInput').value = '';
    loadMalls();
  });

  // ---- booking ----
  function openBooking(mallId, mallName){
    if(!auth.token){ window.location.href = '/login'; return; }
    const form = document.getElementById('bookingForm');
    form.mallId.value = mallId;
    form.mallName.value = mallName;
    document.getElementById('bookingMallName').textContent = `Book at ${mallName}`;
    hideMsg('bookingError'); hideMsg('bookingSuccess');
    openModal('bookingModal');
  }
  document.getElementById('bookingForm').addEventListener('submit', async (e)=>{
    e.preventDefault();
    hideMsg('bookingError'); hideMsg('bookingSuccess');
    const fd = new FormData(e.target);
    try{
      await api('/api/bookings', {
        method:'POST',
        headers: authHeader(),
        body: JSON.stringify({
          mallId: fd.get('mallId'),
          mallName: fd.get('mallName'),
          ProductName: fd.get('ProductName'),
          quantity: fd.get('quantity'),
          TotalPrice: fd.get('TotalPrice')
        })
      });
      const successEl = document.getElementById('bookingSuccess');
      successEl.textContent = 'Booking confirmed!';
      successEl.classList.add('show');
      setTimeout(()=> closeModal('bookingModal'), 900);
    }catch(err){ showError('bookingError', err.message); }
  });

  // ---- my bookings ----
  document.getElementById('myBookingsLink').addEventListener('click', async (e)=>{
    e.preventDefault();
    const list = document.getElementById('bookingsList');
    list.innerHTML = 'Loading…';
    openModal('bookingsModal');
    try{
      const data = await api('/api/bookings/my-bookings', { headers: authHeader() });
      list.innerHTML = data.data.length
        ? data.data.map(b => `
            <div class="booking-item">
              <b>${escapeHtml(b.mallName)}</b>
              ${escapeHtml(b.ProductName)} × ${b.quantity} — ₹${b.TotalPrice}
              <div style="margin-top:4px; opacity:.7;">${new Date(b.date).toLocaleString()} · ${b.status}</div>
            </div>`).join('')
        : '<p style="color:var(--cream-dim);">No bookings yet.</p>';
    }catch(err){
      list.innerHTML = `<p style="color:#ff9b9b;">${err.message}</p>`;
    }
  });