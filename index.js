let properties = [
  {
    id: 1, type: 'vente', cat: 'villa', featured: true,
    title: 'Villa contemporaine avec vue montagne',
    location: 'Laboule 12, Pétion-Ville',
    price: '580 000 USD', priceNote: 'prix de vente',
    beds: 5, baths: 4, area: 420,
    lat: 18.5025, lng: -72.2922,
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    desc: 'Somptueuse villa contemporaine offrant une vue panoramique sur Port-au-Prince. Finitions haut de gamme, piscine à débordement, cuisine équipée et sécurité 24h/24.'
  },
  {
    id: 2, type: 'location', cat: 'appartement',
    title: 'Appartement moderne meublé',
    location: 'Pacot, Port-au-Prince',
    price: '1 800 USD', priceNote: '/ mois',
    beds: 3, baths: 2, area: 180,
    lat: 18.5466, lng: -72.3364,
    img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    desc: 'Bel appartement entièrement meublé au 4ème étage avec balcon. Climatisation dans chaque pièce, parking sécurisé, eau et courant inclus. Idéal expatriés.'
  },
  {
    id: 3, type: 'vente', cat: 'maison',
    title: 'Maison familiale avec jardin',
    location: 'Delmas 60, Port-au-Prince',
    price: '195 000 USD', priceNote: 'prix de vente',
    beds: 4, baths: 3, area: 280,
    lat: 18.5590, lng: -72.3022,
    img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
    desc: 'Grande maison familiale avec jardin arborisé de 600 m². Cuisine moderne, salon spacieux, générateur inclus. Quartier calme et sécurisé à Delmas.'
  },
  {
    id: 4, type: 'location', cat: 'villa',
    title: 'Villa avec piscine — Montagne Noire',
    location: 'Montagne Noire, Pétion-Ville',
    price: '4 500 USD', priceNote: '/ mois',
    beds: 6, baths: 5, area: 550,
    lat: 18.4980, lng: -72.2800,
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    desc: "Villa de standing avec piscine privée, salle de sport, bureau, et magnifique terrasse. Idéale pour famille ou entreprise cherchant un cadre d'exception."
  },
  {
    id: 5, type: 'vente', cat: 'terrain',
    title: 'Terrain constructible — vue mer',
    location: 'Jacmel, Sud-Est',
    price: '85 000 USD', priceNote: 'prix de vente',
    beds: 0, baths: 0, area: 1200,
    lat: 18.2341, lng: -72.5354,
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    desc: 'Rare terrain constructible avec vue imprenable sur la mer des Caraïbes à Jacmel. Titres fonciers clairs, accès eau et électricité. Opportunité unique.'
  },
  {
    id: 6, type: 'location', cat: 'appartement',
    title: 'Studio moderne — centre-ville',
    location: 'Champs de Mars, Port-au-Prince',
    price: '750 USD', priceNote: '/ mois',
    beds: 1, baths: 1, area: 55,
    lat: 18.5432, lng: -72.3384,
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    desc: 'Studio moderne entièrement rénové, idéal pour professionnel. Accès wifi haut débit, eau chaude, voisinage calme. Transport en commun à 5 minutes.'
  }
];
 
// ===== USERS (demo) =====
const USERS = [
  { email: 'admin@immohaiti.ht', pwd: 'admin123', role: 'admin', name: 'Michaëlle Joseph', initials: 'MJ' },
  { email: 'agent@immohaiti.ht', pwd: 'agent123', role: 'agent', name: 'Jean-Paul Dupont', initials: 'JD' }
];
 
let currentUser = null;
let currentFilter = 'all';
let currentSearchQuery = '';
let currentLoginRole = 'agent';
let favorites = new Set();
let mapInstance = null;
let mapMarkers = [];
let imgFiles = [];
 
// ===== AMENITIES =====
const AMENITIES = [
  { id: 'piscine', label: '🏊 Piscine' },
  { id: 'generateur', label: '⚡ Générateur' },
  { id: 'citerne', label: '💧 Citerne d\'eau' },
  { id: 'parking', label: '🚗 Parking' },
  { id: 'jardin', label: '🌿 Jardin' },
  { id: 'securite', label: '🔐 Sécurité 24h' },
  { id: 'clim', label: '❄️ Climatisation' },
  { id: 'meuble', label: '🛋️ Meublé' },
  { id: 'ascenseur', label: '🛗 Ascenseur' },
  { id: 'terrasse', label: '☀️ Terrasse' },
  { id: 'sport', label: '🏋️ Salle de sport' },
  { id: 'internet', label: '📡 Internet fibre' }
];
 
// ===== PAGE ROUTING =====
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  window.scrollTo(0, 0);
  if (name === 'home') setTimeout(initMap, 200);
}
 
function showPublishPage() {
  showPage('publish');
  if (!currentUser) {
    document.getElementById('access-denied-section').style.display = 'block';
    document.getElementById('publish-form-section').style.display = 'none';
  } else {
    document.getElementById('access-denied-section').style.display = 'none';
    document.getElementById('publish-form-section').style.display = 'block';
    // Show admin options only for admin
    document.getElementById('admin-only-section').style.display =
      currentUser.role === 'admin' ? 'block' : 'none';
    // Badge
    const badge = document.getElementById('pub-role-badge');
    if (currentUser.role === 'admin') {
      badge.textContent = '⚙️ Administrateur';
      badge.className = 'publish-badge admin';
    } else {
      badge.textContent = '🏢 Agent immobilier';
      badge.className = 'publish-badge agent';
    }
    buildAmenityGrid();
    document.getElementById('success-banner').classList.remove('show');
  }
}
 
// ===== RENDER CARDS =====
function renderCards() {
  const grid = document.getElementById('listings-grid');
  const filtered = properties.filter(p => {
    let match = true;
    if (currentFilter !== 'all') {
      if (currentFilter === 'vente' || currentFilter === 'location') match = p.type === currentFilter;
      else match = p.cat === currentFilter;
    }
    if (currentSearchQuery) {
      const q = currentSearchQuery.toLowerCase();
      match = match && (
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.cat.toLowerCase().includes(q)
      );
    }
    return match;
  });
 
  document.getElementById('stat-total').textContent = properties.length;
 
  if (filtered.length === 0) {
    grid.innerHTML = `<div class="no-results" style="grid-column:1/-1">
      <div class="no-results-icon">🔍</div>
      <h3 style="margin-bottom:8px;">Aucun résultat</h3>
      <p>Essayez d'élargir vos critères de recherche.</p>
    </div>`;
    return;
  }
 
  grid.innerHTML = filtered.map((p, i) => {
    const isFeatured = p.featured && i === 0 && currentFilter === 'all' && !currentSearchQuery;
    const fav = favorites.has(p.id);
    const featHtml = p.area > 0 ? `
      <div class="card-features">
        ${p.beds > 0 ? `<div class="feature">🛏 ${p.beds} ch.</div>` : ''}
        ${p.baths > 0 ? `<div class="feature">🚿 ${p.baths} SdB</div>` : ''}
        <div class="feature">📐 ${p.area} m²</div>
      </div>` : '';
 
    return `<div class="card ${isFeatured ? 'featured-card' : ''}" onclick="openDetailModal(${p.id})">
      <div class="card-img">
        <img src="${p.img}" alt="${p.title}" loading="lazy">
        <div class="card-badge badge-${p.type}">${p.type === 'vente' ? 'Vente' : 'Location'}</div>
        <button class="card-fav ${fav ? 'liked' : ''}" onclick="toggleFav(event,${p.id})">${fav ? '❤️' : '♡'}</button>
        ${isFeatured ? '<div style="position:absolute;bottom:12px;right:12px;background:rgba(192,154,91,0.95);color:#fff;padding:4px 12px;border-radius:50px;font-size:11px;font-weight:600;letter-spacing:1px;">COUP DE CŒUR</div>' : ''}
      </div>
      <div class="card-body">
        ${isFeatured ? '<div class="featured-label">Bien d\'exception</div>' : ''}
        <div class="card-price">${p.price} <span>${p.priceNote}</span></div>
        <div class="card-title">${p.title}</div>
        <div class="card-location">📍 ${p.location}</div>
        ${featHtml}
      </div>
    </div>`;
  }).join('');
}
 
function toggleFav(e, id) {
  e.stopPropagation();
  favorites.has(id) ? favorites.delete(id) : favorites.add(id);
  renderCards();
}
 
// ===== FILTERS =====
function setFilter(f, btn) {
  currentFilter = f;
  currentSearchQuery = '';
  if (btn) {
    document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  renderCards();
  updateMapMarkers();
}
 
function doSearch() {
  currentSearchQuery = document.getElementById('search-input').value;
  const typeVal = document.getElementById('type-filter').value;
  const catVal = document.getElementById('cat-filter').value;
  if (typeVal !== 'all') currentFilter = typeVal;
  else if (catVal !== 'all') currentFilter = catVal;
  else currentFilter = 'all';
  document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
  renderCards();
}
 
// ===== DETAIL MODAL =====
function openDetailModal(id) {
  const p = properties.find(x => x.id === id);
  if (!p) return;
  document.getElementById('modal-img').src = p.img;
  document.getElementById('modal-badge').textContent = p.type === 'vente' ? '🏷 À vendre' : '🔑 À louer';
  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-location').textContent = '📍 ' + p.location;
  document.getElementById('modal-price').textContent = p.price + (p.priceNote !== 'prix de vente' ? ' ' + p.priceNote : '');
  document.getElementById('modal-desc').textContent = p.desc;
  document.getElementById('modal-feats').innerHTML = [
    p.beds > 0 ? `<div class="modal-feat"><div class="modal-feat-num">${p.beds}</div><div class="modal-feat-label">Chambres</div></div>` : '',
    p.baths > 0 ? `<div class="modal-feat"><div class="modal-feat-num">${p.baths}</div><div class="modal-feat-label">Salles de bain</div></div>` : '',
    p.area > 0 ? `<div class="modal-feat"><div class="modal-feat-num">${p.area}</div><div class="modal-feat-label">m² surface</div></div>` : ''
  ].filter(Boolean).join('');
  document.getElementById('detail-modal').classList.add('open');
}
 
function closeDetailModal(e) {
  if (e.target === document.getElementById('detail-modal'))
    document.getElementById('detail-modal').classList.remove('open');
}
 
// ===== MAP =====
function initMap() {
  if (mapInstance) { updateMapMarkers(); return; }
  mapInstance = L.map('map').setView([18.5425, -72.3386], 10);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(mapInstance);
  updateMapMarkers();
}
 
function makeIcon(type) {
  return L.divIcon({
    className: '',
    html: `<div style="
      background:${type === 'vente' ? '#1A1A1A' : '#C09A5B'};
      width:28px;height:28px;border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);border:3px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -30]
  });
}
 
function updateMapMarkers() {
  if (!mapInstance) return;
  mapMarkers.forEach(m => m.remove());
  mapMarkers = [];
 
  properties.forEach(p => {
    if (!p.lat || !p.lng) return;
    const marker = L.marker([p.lat, p.lng], { icon: makeIcon(p.type) }).addTo(mapInstance);
    marker.bindPopup(`
      <div class="map-popup">
        <div class="map-popup-price">${p.price}</div>
        <div class="map-popup-title">${p.title}</div>
        <div class="map-popup-loc">📍 ${p.location}</div>
        <button class="map-popup-btn" onclick="openDetailModal(${p.id})">
          Voir l'annonce →
        </button>
      </div>
    `);
    mapMarkers.push(marker);
  });
}
 
// ===== LOGIN =====
function openLogin() {
  document.getElementById('login-modal').classList.add('open');
  document.getElementById('login-error').classList.remove('show');
  document.getElementById('login-email').value = '';
  document.getElementById('login-pwd').value = '';
}
 
function closeLoginModal(e) {
  if (e.target === document.getElementById('login-modal'))
    document.getElementById('login-modal').classList.remove('open');
}
 
function setLoginRole(role, btn) {
  currentLoginRole = role;
  document.querySelectorAll('.role-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // Prefill hint
  if (role === 'admin') {
    document.getElementById('login-email').placeholder = 'example@gmail.com';
  } else {
    document.getElementById('login-email').placeholder = 'example@gmail.com';
  }
}
 
function doLogin() {
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const pwd = document.getElementById('login-pwd').value;
  const errEl = document.getElementById('login-error');
 
  const user = USERS.find(u => u.email === email && u.pwd === pwd && u.role === currentLoginRole);
  if (!user) {
    errEl.textContent = 'Email, mot de passe ou rôle incorrect. Vérifiez vos informations.';
    errEl.classList.add('show');
    return;
  }
 
  currentUser = user;
  document.getElementById('login-modal').classList.remove('open');
  updateNavForUser();
}
 
function updateNavForUser() {
  if (currentUser) {
    document.getElementById('nav-guest').style.display = 'none';
    document.getElementById('nav-logged').style.display = 'flex';
    document.getElementById('nav-avatar-initials').textContent = currentUser.initials;
    document.getElementById('nav-user-name').textContent = currentUser.name;
    const badge = document.getElementById('nav-role-badge');
    badge.textContent = currentUser.role === 'admin' ? '⚙️ Admin' : '🏢 Agent';
    badge.className = 'nav-role-badge ' + (currentUser.role === 'admin' ? 'role-admin' : 'role-agent');
    document.getElementById('nav-publish-link').style.display = 'inline';
  } else {
    document.getElementById('nav-guest').style.display = 'flex';
    document.getElementById('nav-logged').style.display = 'none';
    document.getElementById('nav-publish-link').style.display = 'none';
  }
}
 
function logout() {
  currentUser = null;
  updateNavForUser();
  showPage('home');
}
 
// ===== PUBLISH FORM =====
function buildAmenityGrid() {
  document.getElementById('amenity-grid').innerHTML = AMENITIES.map(a => `
    <label class="amenity-item" id="am-${a.id}" onclick="toggleAmenity('${a.id}')">
      <input type="checkbox" id="chk-${a.id}" style="display:none">
      ${a.label}
    </label>
  `).join('');
}
 
function toggleAmenity(id) {
  const el = document.getElementById('am-' + id);
  const chk = document.getElementById('chk-' + id);
  chk.checked = !chk.checked;
  el.classList.toggle('checked', chk.checked);
}
 
function updateCharCount(el, countId, max) {
  document.getElementById(countId).textContent = el.value.length;
}
 
function handleImgUpload(e) {
  const files = Array.from(e.target.files).slice(0, 10 - imgFiles.length);
  files.forEach(file => {
    if (imgFiles.length >= 10) return;
    imgFiles.push(file);
    const reader = new FileReader();
    reader.onload = ev => addImgPreview(ev.target.result, imgFiles.length - 1);
    reader.readAsDataURL(file);
  });
}
 
function addImgPreview(src, idx) {
  const grid = document.getElementById('img-preview');
  const div = document.createElement('div');
  div.className = 'img-preview-item';
  div.id = 'prev-' + idx;
  div.innerHTML = `<img src="${src}" alt=""><button class="img-preview-remove" onclick="removeImg(${idx})">✕</button>`;
  grid.appendChild(div);
}
 
function removeImg(idx) {
  imgFiles.splice(idx, 1);
  const el = document.getElementById('prev-' + idx);
  if (el) el.remove();
}
 
function submitPublish() {
  // Validation
  const required = {
    'pub-type': 'Type d\'annonce',
    'pub-cat': 'Catégorie',
    'pub-title': 'Titre',
    'pub-desc': 'Description',
    'pub-dept': 'Département',
    'pub-city': 'Ville',
    'pub-area': 'Surface',
    'pub-price': 'Prix',
    'pub-agent-name': 'Nom de l\'agent',
    'pub-phone': 'Téléphone'
  };
 
  for (const [id, label] of Object.entries(required)) {
    const val = document.getElementById(id).value.trim();
    if (!val) {
      alert(`Le champ "${label}" est obligatoire.`);
      document.getElementById(id).focus();
      return;
    }
  }
 
  // Build new property
  const type = document.getElementById('pub-type').value;
  const cat = document.getElementById('pub-cat').value;
  const title = document.getElementById('pub-title').value.trim();
  const desc = document.getElementById('pub-desc').value.trim();
  const city = document.getElementById('pub-city').value.trim();
  const address = document.getElementById('pub-address').value.trim();
  const lat = parseFloat(document.getElementById('pub-lat').value) || 18.5425;
  const lng = parseFloat(document.getElementById('pub-lng').value) || -72.3386;
  const area = parseInt(document.getElementById('pub-area').value) || 0;
  const beds = parseInt(document.getElementById('pub-beds').value) || 0;
  const baths = parseInt(document.getElementById('pub-baths').value) || 0;
  const price = document.getElementById('pub-price').value;
  const currency = document.getElementById('pub-currency').value;
  const period = document.getElementById('pub-period').value;
  const featured = currentUser.role === 'admin' &&
    document.getElementById('pub-featured').value === 'oui';
 
  const priceNote = type === 'vente'
    ? 'prix de vente'
    : `/ ${period}`;
  const priceDisplay = `${parseInt(price).toLocaleString('fr-FR')} ${currency}`;
 
  const newProp = {
    id: Date.now(),
    type, cat, featured,
    title,
    location: address ? `${address}, ${city}` : city,
    price: priceDisplay,
    priceNote,
    beds, baths, area,
    lat, lng,
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    desc
  };
 
  properties.unshift(newProp);
 
  // Show success
  document.getElementById('success-banner').classList.add('show');
  window.scrollTo(0, 0);
 
  // Reset form
  document.querySelectorAll('#publish-form-section input, #publish-form-section select, #publish-form-section textarea')
    .forEach(el => { if (el.type !== 'checkbox') el.value = ''; });
  document.getElementById('img-preview').innerHTML = '';
  imgFiles = [];
  document.querySelectorAll('.amenity-item').forEach(el => el.classList.remove('checked'));
  document.querySelectorAll('.amenity-item input').forEach(el => el.checked = false);
  document.getElementById('title-count').textContent = '0';
  document.getElementById('desc-count').textContent = '0';
 
  // Update stat
  document.getElementById('stat-total').textContent = properties.length;
}
 
// ===== INIT =====
renderCards();
setTimeout(initMap, 300);