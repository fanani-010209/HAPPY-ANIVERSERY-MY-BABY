// ============================================================
// 🔐 CONFIGURATION
// ============================================================
const CORRECT_PASSWORD = "060620";

const fotoKoleksi = [
    "./assets/gambar2.png", "./assets/gambar3.png", "./assets/gambar1.jpg", 
    "./assets/gambar4.png", "./assets/gambar5.jpg", "./assets/gambar7.png", "./assets/gambar8.png"
];

const romanticWordsList = [
    { emoji: "💖", text: "Kamu adalah cinta dalam hidupku" },
    { emoji: "🌟", text: "Setiap hari bersamamu adalah anugerah" },
    { emoji: "🌹", text: "Hatiku berdetak hanya untukmu" },
    { emoji: "☀️", text: "Kamu membuat hariku lebih cerah" },
    { emoji: "🏡", text: "Bersamamu, aku merasa dirumah" },
    { emoji: "💫", text: "Kamu adalah bintang dalam hidupku" },
    { emoji: "🎁", text: "Kamu adalah hadiah terindah" },
    { emoji: "💌", text: "Aku mencintaimu lebih dari kata-kata" },
    { emoji: "🌸", text: "Cintaku padamu mekar setiap hari" },
    { emoji: "💕", text: "Kamu dan aku selamanya" }
];

const loveZoneLongText = `
    Selamat anniversary ke-6, sayang ❤️ Enam tahun bukan waktu yang sebentar, dan aku bersyukur karena kita masih di sini—bersama, saling menggenggam, melewati semua hal yang datang dalam perjalanan kita.<br><br>
    Terima kasih sudah tetap bertahan, sudah tetap memilih aku di setiap keadaan, bahkan saat semuanya tidak selalu mudah. Kamu adalah alasan kenapa aku percaya bahwa cinta itu tentang usaha, kesabaran, dan kesetiaan yang nyata.<br><br>
    Selama 6 tahun ini, kamu sudah jadi rumah untukku—tempat aku pulang, tempat aku merasa tenang, dan tempat aku ingin terus kembali.<br><br>
    Semoga hubungan kita ke depan semakin kuat, semakin dewasa, dan tetap penuh dengan cinta yang sederhana tapi tulus. Aku ingin terus berjalan bersamamu, menciptakan lebih banyak kenangan, dan melewati banyak anniversary lainnya bareng kamu.<br><br>
    I LOVE YOU MORE THAN WORDS CAN SAY. 💖💖💖
`;

const happyAnniversaryText = `
    <div class="happy-anniv">
        <div class="heart-icon">💖</div>
        <h1>Happy Anniversary! 🎉</h1>
        <p style="color: var(--text-muted); font-size: 0.95rem;">Selamat hari jadi untuk kita sayang 💑</p>
        <p style="font-size: 0.85rem; margin-top: 30px; color: var(--primary); font-weight:600;">✨ Pilih menu di atas untuk melihat kejutan dariku ✨</p>
    </div>
`;

// ============================================================
// 🛠️ ENGINE & NAVIGATION
// ============================================================
const pages = {
    password: document.getElementById('passwordPage'),
    welcome: document.getElementById('welcomePage'),
    mainmenu: document.getElementById('mainMenuPage'),
    finalstory: document.getElementById('finalStoryPage')
};
const dynamicDiv = document.getElementById('dynamicContent');

function showPage(pageId) {
    Object.values(pages).forEach(page => page.classList.remove('active-page'));
    if(pages[pageId]) pages[pageId].classList.add('active-page');
    
    if (pageId === 'mainmenu' && !window._menuInited) {
        dynamicDiv.innerHTML = happyAnniversaryText;
        window._menuInited = true;
        setActiveNav('none');
    }
}

function setActiveNav(menuId) {
    document.querySelectorAll('.menu-item').forEach(item => {
        if(item.getAttribute('data-menu') === menuId) {
            item.classList.add('active-nav');
        } else {
            item.classList.remove('active-nav');
        }
    });
}

function showLoveZone() {
    dynamicDiv.innerHTML = `
        <div class="lovezone-block">
            <div class="i-love-you">💖 I LOVE YOU 💖</div>
            <div id="loveTooTrigger" class="love-too-btn">💗 I LOVE YOU TOO 💗</div>
            <div id="hiddenLongText" class="long-romantic-text">${loveZoneLongText}</div>
        </div>
    `;
    const btn = document.getElementById('loveTooTrigger');
    const txt = document.getElementById('hiddenLongText');
    if (btn) {
        btn.onclick = () => {
            txt.classList.toggle('show');
            if (txt.classList.contains('show')) {
                setTimeout(() => {
                    txt.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        };
    }
}

function showGallery() {
    let html = `<div class="gallery-grid">`;
    fotoKoleksi.forEach((file, i) => {
        const fallbackSVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23fff0f3'/%3E%3Ctext x='100' y='100' text-anchor='middle' dy='.3em' fill='%23ff6b8b' font-size='12' font-family='sans-serif'%3E📷 Foto ${i + 1}%3C/text%3E%3C/svg%3E`;
        
        html += `
            <div class="card">
                <img src="${file}" 
                     alt="Kenangan ${i + 1}" 
                     loading="lazy" 
                     onload="this.classList.add('loaded')"
                     onerror="this.src='${fallbackSVG}'; this.classList.add('loaded');">
            </div>
        `;
    });
    html += `</div>
        <div style="text-align: center; margin-top: 25px; padding: 12px; background: var(--primary-light); border-radius: 16px;">
            <p style="font-size: 13px; color: var(--secondary); font-weight: 500;">
                🙏 Maaf Yaa Kalo Fotonya Pakai AI 🙏
            </p>
        </div>
    `;
    dynamicDiv.innerHTML = html;
}

function showRomanticList() {
    let items = '';
    romanticWordsList.forEach(item => {
        items += `
            <div class="romantic-item">
                <div class="romantic-emoji">${item.emoji}</div>
                <div class="romantic-text">${item.text}</div>
            </div>`;
    });
    dynamicDiv.innerHTML = `<div class="romantic-list"><h3>💗 Kata Cinta Untukmu 💗</h3>${items}</div>`;
}

function handleMenuClick(menuId) {
    setActiveNav(menuId);
    if (menuId === 'lovezone') showLoveZone();
    else if (menuId === 'gallery') showGallery();
    else if (menuId === 'words') showRomanticList();
    else if (menuId === 'next') showPage('finalstory');
}

// ============================================================
// 📑 SLIDER SYSTEM (CARD SLIDE LOGIC)
// ============================================================
let currentSlide = 0;
const storyWrapper = document.getElementById('storyWrapper');
const slides = document.querySelectorAll('.story-slide');
const totalSlides = slides.length;

const prevBtn = document.getElementById('prevSlideBtn');
const nextBtn = document.getElementById('nextSlideBtn');
const dotsContainer = document.getElementById('sliderDots');

function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active-dot');
        dotsContainer.appendChild(dot);
    }
}

function updateSlider() {
    if (!storyWrapper) return;
    storyWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    if (prevBtn) prevBtn.disabled = currentSlide === 0;
    
    if (nextBtn) {
        if (currentSlide === totalSlides - 1) {
            nextBtn.innerText = "Selesai ✨";
        } else {
            nextBtn.innerText = "Lanjut ▶";
        }
    }

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active-dot');
        } else {
            dot.classList.remove('active-dot');
        }
    });
}

if (nextBtn) {
    nextBtn.onclick = () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlider();
        } else {
            document.getElementById('backToMainFromFinal').click();
            resetSlider();
        }
    };
}

if (prevBtn) {
    prevBtn.onclick = () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    };
}

function resetSlider() {
    currentSlide = 0;
    updateSlider();
}

// ============================================================
// 🎙️ LISTENERS
// ============================================================
document.querySelectorAll('.menu-item').forEach(item => {
    item.onclick = () => handleMenuClick(item.getAttribute('data-menu'));
});

document.getElementById('submitPassword').onclick = () => {
    if (document.getElementById('passwordInput').value === CORRECT_PASSWORD) {
        document.getElementById('errorMsg').style.display = 'none';
        showPage('welcome');
    } else {
        document.getElementById('errorMsg').style.display = 'block';
    }
};

document.getElementById('passwordInput').onkeypress = (e) => {
    if (e.key === 'Enter') document.getElementById('submitPassword').click();
};

document.getElementById('startExploringBtn').onclick = () => showPage('mainmenu');

document.getElementById('backToMainFromFinal').onclick = () => {
    showPage('mainmenu');
    dynamicDiv.innerHTML = happyAnniversaryText;
    setActiveNav('none');
    resetSlider();
};

// Inisialisasi awal sistem slider & jalankan aplikasi
createDots();
updateSlider();
showPage('password');