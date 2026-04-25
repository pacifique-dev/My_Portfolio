/* ============================================================
   main.js — Pacifique NIYISHOBORA Portfolio
   ============================================================
   HOW TO RECEIVE EMAILS AT niyishoborapacifique@gmail.com
   ────────────────────────────────────────────────────────
   Step 1: Go to https://www.emailjs.com → Sign up free
   Step 2: Click "Add New Service" → Choose Gmail
           → Connect your Gmail (niyishoborapacifique@gmail.com)
           → Copy the SERVICE ID (looks like "service_abc123")
   Step 3: Click "Email Templates" → Create Template
           Set the template body to something like:

             New message from: {{from_name}}
             Email: {{from_email}}
             Phone: {{phone}}
             Subject: {{subject}}
             Service: {{service}}

             Message:
             {{message}}

           Set "To Email" = niyishoborapacifique@gmail.com
           → Copy the TEMPLATE ID (looks like "template_xyz789")
   Step 4: Click "Account" tab → copy your PUBLIC KEY
   Step 5: Paste the 3 values below and you're done!
   ────────────────────────────────────────────────────────
============================================================ */

const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';    // e.g. 'abc123XYZ'
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';    // e.g. 'service_xxxxxx'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';   // e.g. 'template_xxxxxx'

emailjs.init(EMAILJS_PUBLIC_KEY);


/* ============================================================
   THEME SWITCHING
============================================================ */

const themeButtons = document.querySelectorAll('.theme-btn');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const buttonMap = { dark: 'themeDark', light: 'themeLight', cyan: 'themeCyan' };
    themeButtons.forEach(btn => btn.classList.remove('active-theme'));
    const activeBtn = document.getElementById(buttonMap[theme]);
    if (activeBtn) activeBtn.classList.add('active-theme');
}

(function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) {
        setTheme(saved);
    } else {
        setTheme(!window.matchMedia('(prefers-color-scheme: light)').matches ? 'dark' : 'light');
    }
})();

window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) setTheme(e.matches ? 'light' : 'dark');
});


/* ============================================================
   TYPING ANIMATION
============================================================ */

const typedEl     = document.querySelector('.typed-text');
const typingWords = ['Web Developer', 'Full Stack Developer', 'UI/UX Enthusiast', 'Problem Solver'];
let wordIndex = 0, charIndex = 0, isDeleting = false, typingDelay = 120;

function runTyper() {
    const currentWord = typingWords[wordIndex];
    if (isDeleting) {
        typedEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 60;
    } else {
        typedEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 120;
    }
    if (!isDeleting && charIndex === currentWord.length) { typingDelay = 2000; isDeleting = true; }
    if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % typingWords.length; typingDelay = 500; }
    setTimeout(runTyper, typingDelay);
}
setTimeout(runTyper, 1800);


/* ============================================================
   MOBILE HAMBURGER MENU
============================================================ */

const hamburger = document.getElementById('hamburger');
const navbar    = document.getElementById('navbar');

hamburger.addEventListener('click', () => { hamburger.classList.toggle('open'); navbar.classList.toggle('open'); });
navbar.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => { hamburger.classList.remove('open'); navbar.classList.remove('open'); }));
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !hamburger.contains(e.target)) { hamburger.classList.remove('open'); navbar.classList.remove('open'); }
});


/* ============================================================
   ACTIVE NAV ON SCROLL
============================================================ */

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightCurrentSection() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const top = section.offsetTop - 120;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
            });
        }
    });
}
window.addEventListener('scroll', highlightCurrentSection);


/* ============================================================
   SCROLL-REVEAL ANIMATION
============================================================ */

const revealObserver = new IntersectionObserver(
    (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => entry.target.classList.add('visible'), delay);
            revealObserver.unobserve(entry.target);
        }
    }),
    { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ============================================================
   SKILL-BAR ANIMATION
============================================================ */

let skillBarsAnimated = false;
const skillBarsSection = document.getElementById('skillBars');

const skillObserver = new IntersectionObserver(
    (entries) => entries.forEach(entry => {
        if (entry.isIntersecting && !skillBarsAnimated) {
            skillBarsAnimated = true;
            document.querySelectorAll('.bar-fill').forEach(bar => {
                setTimeout(() => { bar.style.width = bar.getAttribute('data-width') + '%'; }, 300);
            });
        }
    }),
    { threshold: 0.30 }
);
if (skillBarsSection) skillObserver.observe(skillBarsSection);


/* ============================================================
   PORTFOLIO FILTER
============================================================ */

const filterBtns     = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `@keyframes fadeIn { from { opacity:0; transform:scale(0.96); } to { opacity:1; transform:scale(1); } }`;
document.head.appendChild(fadeInStyle);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');
        portfolioCards.forEach(card => {
            const matches = filterValue === 'all' || card.getAttribute('data-category') === filterValue;
            card.style.display   = matches ? 'block' : 'none';
            if (matches) card.style.animation = 'fadeIn 0.4s ease forwards';
        });
    });
});


/* ============================================================
   CONTACT FORM — EmailJS
   Messages are delivered to: niyishoborapacifique@gmail.com
============================================================ */

const contactForm = document.getElementById('contactForm');
const formStatus  = document.getElementById('formStatus');
const submitBtn   = document.getElementById('submitBtn');

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className   = `form-status ${type}`;
    // Scroll status into view
    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setTimeout(() => { formStatus.className = 'form-status'; }, 7000);
}

function setFieldError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
}

function validateForm() {
    let valid = true;
    const name    = document.getElementById('fname').value.trim();
    const email   = document.getElementById('femail').value.trim();
    const subject = document.getElementById('fsubject').value.trim();
    const message = document.getElementById('fmessage').value.trim();

    ['nameError','emailError','subjectError','messageError'].forEach(id => setFieldError(id, ''));

    if (!name)    { setFieldError('nameError',    'Please enter your name.'); valid = false; }
    if (!email)   { setFieldError('emailError',   'Please enter your email address.'); valid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setFieldError('emailError', 'Please enter a valid email address.'); valid = false; }
    if (!subject) { setFieldError('subjectError', 'Please enter a subject.'); valid = false; }
    if (!message) { setFieldError('messageError', 'Please write your message.'); valid = false; }

    return valid;
}

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    if (!validateForm()) return;

    // Switch button to loading state
    submitBtn.querySelector('.btn-text').hidden    = true;
    submitBtn.querySelector('.btn-loading').hidden = false;
    submitBtn.disabled = true;

    const templateParams = {
        from_name:  document.getElementById('fname').value.trim(),
        from_email: document.getElementById('femail').value.trim(),
        phone:      document.getElementById('fphone').value.trim() || 'Not provided',
        subject:    document.getElementById('fsubject').value.trim(),
        service:    document.getElementById('fservice').value || 'Not specified',
        message:    document.getElementById('fmessage').value.trim(),
        to_email:   'niyishoborapacifique@gmail.com',  // destination
    };

    try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
        showFormStatus(
            `✓ Thank you, ${templateParams.from_name}! Your message has been sent successfully. I'll reply to ${templateParams.from_email} as soon as possible.`,
            'success'
        );
        contactForm.reset();

    } catch (error) {
        console.error('EmailJS error:', error);

        // Check if keys are still placeholder values
        if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
            showFormStatus(
                '⚠ EmailJS is not configured yet. Please open main.js and fill in your Public Key, Service ID, and Template ID from emailjs.com. See the instructions at the top of the file.',
                'error'
            );
        } else {
            showFormStatus(
                '✕ Something went wrong sending your message. Please try emailing me directly at niyishoborapacifique@gmail.com',
                'error'
            );
        }
    } finally {
        submitBtn.querySelector('.btn-text').hidden    = false;
        submitBtn.querySelector('.btn-loading').hidden = true;
        submitBtn.disabled = false;
    }
});


/* ============================================================
   BACK-TO-TOP BUTTON
============================================================ */

const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => backTop.classList.toggle('show', window.pageYOffset > 400));
backTop.addEventListener('click', (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });


/* ============================================================
   HEADER SHADOW ON SCROLL
============================================================ */

const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    header.style.boxShadow = window.pageYOffset > 50 ? '0 4px 28px var(--glow-violet)' : 'none';
});


/* ============================================================
   MOUSE GLOW CURSOR (desktop only)
============================================================ */

if (window.innerWidth > 768) {
    const glowEl = document.createElement('div');
    glowEl.style.cssText = `position:fixed;width:280px;height:280px;background:radial-gradient(circle,var(--glow-violet) 0%,transparent 70%);border-radius:50%;pointer-events:none;z-index:0;transform:translate(-50%,-50%);transition:left 0.15s ease,top 0.15s ease;`;
    document.body.appendChild(glowEl);
    document.addEventListener('mousemove', (e) => { glowEl.style.left = e.clientX + 'px'; glowEl.style.top = e.clientY + 'px'; });
}


/* ============================================================
   DOWNLOAD CV
============================================================ */

const downloadCVBtn = document.getElementById('downloadCV');
if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('My CV will be available for download soon. Check back later!');
    });
}


/* ============================================================
   SETTINGS PANEL
============================================================ */

const settingsToggle   = document.getElementById('settingsToggle');
const settingsPanel    = document.getElementById('settingsPanel');
const closeSettingsBtn = document.getElementById('closeSettings');
const settingsOverlay  = document.getElementById('settingsOverlay');

function openSettingsPanel()  { settingsPanel.classList.add('open'); settingsOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; loadSettingsIntoPanel(); }
function closeSettingsPanel() { settingsPanel.classList.remove('open'); settingsOverlay.classList.remove('open'); document.body.style.overflow = ''; }

settingsToggle.addEventListener('click', openSettingsPanel);
closeSettingsBtn.addEventListener('click', closeSettingsPanel);
settingsOverlay.addEventListener('click', closeSettingsPanel);


/* ============================================================
   GRADIENT BUILDER
============================================================ */

const gradColor1      = document.getElementById('gradColor1');
const gradColor2      = document.getElementById('gradColor2');
const gradColor3      = document.getElementById('gradColor3');
const gradientPreview = document.getElementById('gradientPreview');
const dirBtns         = document.querySelectorAll('.dir-btn');
let currentGradDeg    = 135;

function updateGradientPreview() {
    gradientPreview.style.background = `linear-gradient(${currentGradDeg}deg, ${gradColor1.value}, ${gradColor2.value}, ${gradColor3.value})`;
}
[gradColor1, gradColor2, gradColor3].forEach(input => input.addEventListener('input', updateGradientPreview));
dirBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        dirBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentGradDeg = parseInt(btn.getAttribute('data-deg'));
        updateGradientPreview();
    });
});
updateGradientPreview();

function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1,3), 16), g = parseInt(hex.slice(3,5), 16), b = parseInt(hex.slice(5,7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
}

document.getElementById('applyGradient').addEventListener('click', () => {
    const c1 = gradColor1.value, c2 = gradColor2.value, c3 = gradColor3.value;
    document.documentElement.style.setProperty('--accent-1',    c1);
    document.documentElement.style.setProperty('--accent-2',    c2);
    document.documentElement.style.setProperty('--accent-3',    c3);
    document.documentElement.style.setProperty('--glow-violet', hexToRgba(c1, 0.40));
    document.documentElement.style.setProperty('--glow-purple', hexToRgba(c2, 0.25));
    localStorage.setItem('customGrad', JSON.stringify({ c1, c2, c3, deg: currentGradDeg }));
    const btn = document.getElementById('applyGradient');
    btn.textContent = 'Applied ✓';
    setTimeout(() => { btn.textContent = 'Apply Gradient'; }, 1600);
});

document.getElementById('resetGradient').addEventListener('click', () => {
    localStorage.removeItem('customGrad');
    ['--accent-1','--accent-2','--accent-3','--glow-violet','--glow-purple'].forEach(p => document.documentElement.style.removeProperty(p));
    setTheme(localStorage.getItem('theme') || 'dark');
    gradColor1.value = '#7c3aed'; gradColor2.value = '#a855f7'; gradColor3.value = '#06b6d4';
    currentGradDeg   = 135;
    dirBtns.forEach(b => b.classList.remove('active'));
    document.querySelector('.dir-btn[data-deg="135"]').classList.add('active');
    updateGradientPreview();
});

(function restoreSavedGradient() {
    const raw = localStorage.getItem('customGrad');
    if (!raw) return;
    try {
        const { c1, c2, c3, deg } = JSON.parse(raw);
        gradColor1.value = c1; gradColor2.value = c2; gradColor3.value = c3; currentGradDeg = deg;
        const matchBtn = document.querySelector(`.dir-btn[data-deg="${deg}"]`);
        if (matchBtn) { dirBtns.forEach(b => b.classList.remove('active')); matchBtn.classList.add('active'); }
        updateGradientPreview();
        document.documentElement.style.setProperty('--accent-1',    c1);
        document.documentElement.style.setProperty('--accent-2',    c2);
        document.documentElement.style.setProperty('--accent-3',    c3);
        document.documentElement.style.setProperty('--glow-violet', hexToRgba(c1, 0.40));
        document.documentElement.style.setProperty('--glow-purple', hexToRgba(c2, 0.25));
    } catch(_) {}
})();


/* ============================================================
   FONT SIZE CONTROL
============================================================ */

let currentFontSize = parseInt(localStorage.getItem('fontSize')) || 16;

function applyFontSize(size) {
    document.documentElement.style.setProperty('--font-base', size + 'px');
    document.getElementById('fontSizeDisplay').textContent = size + 'px';
    localStorage.setItem('fontSize', size);
}
applyFontSize(currentFontSize);

document.getElementById('fontIncrease').addEventListener('click', () => { if (currentFontSize < 22) { currentFontSize++; applyFontSize(currentFontSize); } });
document.getElementById('fontDecrease').addEventListener('click', () => { if (currentFontSize > 13) { currentFontSize--; applyFontSize(currentFontSize); } });


/* ============================================================
   PORTFOLIO INFO — SAVE & APPLY
============================================================ */

function loadSettingsIntoPanel() {
    const saved = JSON.parse(localStorage.getItem('portfolioInfo') || '{}');
    document.getElementById('settingName').value      = saved.name      || 'Pacifique NIYISHOBORA';
    document.getElementById('settingNickname').value  = saved.nickname  || 'Paccy';
    document.getElementById('settingRole').value      = saved.role      || 'Full Stack Developer';
    document.getElementById('settingLocation').value  = saved.location  || 'Kayonza, Gahini';
    document.getElementById('settingEmail').value     = saved.email     || 'niyishoborapacifique@gmail.com';
    document.getElementById('settingPhone').value     = saved.phone     || '+250 795 186 081';
    document.getElementById('settingBio').value       = saved.bio       || '';
    document.getElementById('settingInstagram').value = saved.instagram || 'https://www.instagram.com/paccy_ni5/';
    document.getElementById('settingGithub').value    = saved.github    || 'https://github.com/';
    document.getElementById('settingLinkedin').value  = saved.linkedin  || 'https://linkedin.com/';
}

function applyPortfolioInfo(data) {
    if (data.name) {
        const parts = data.name.split(' ');
        document.getElementById('heroName').innerHTML = parts[0] + '<br><span class="name-gradient">' + parts.slice(1).join(' ') + '</span>';
        document.getElementById('infoName').textContent = data.name;
    }
    if (data.nickname) {
        document.getElementById('infoNickname').textContent = data.nickname;
        document.querySelectorAll('.logo, .footer-logo').forEach(el => { el.innerHTML = data.nickname + '<span>.</span>'; });
    }
    if (data.role)     document.getElementById('infoRole').textContent          = data.role;
    if (data.email)    document.getElementById('contactEmail').textContent      = data.email;
    if (data.phone)    document.getElementById('contactPhone').textContent      = data.phone;
    if (data.location) {
        document.getElementById('badgeLocation').textContent  = data.location;
        document.getElementById('contactLocation').textContent = data.location + ' 🇷🇼';
    }
    if (data.bio)      { document.getElementById('heroBio').textContent = data.bio; document.getElementById('aboutBio1').textContent = data.bio; }
    if (data.instagram) document.getElementById('heroInstagram').href = data.instagram;
    if (data.github)    document.getElementById('heroGithub').href    = data.github;
    if (data.linkedin)  document.getElementById('heroLinkedin').href  = data.linkedin;
}

(function restoreSavedInfo() {
    const saved = JSON.parse(localStorage.getItem('portfolioInfo') || '{}');
    if (Object.keys(saved).length > 0) applyPortfolioInfo(saved);
})();

document.getElementById('saveSettings').addEventListener('click', () => {
    const data = {
        name:      document.getElementById('settingName').value.trim(),
        nickname:  document.getElementById('settingNickname').value.trim(),
        role:      document.getElementById('settingRole').value.trim(),
        location:  document.getElementById('settingLocation').value.trim(),
        email:     document.getElementById('settingEmail').value.trim(),
        phone:     document.getElementById('settingPhone').value.trim(),
        bio:       document.getElementById('settingBio').value.trim(),
        instagram: document.getElementById('settingInstagram').value.trim(),
        github:    document.getElementById('settingGithub').value.trim(),
        linkedin:  document.getElementById('settingLinkedin').value.trim(),
    };
    localStorage.setItem('portfolioInfo', JSON.stringify(data));
    applyPortfolioInfo(data);
    const statusEl = document.getElementById('saveStatus');
    statusEl.textContent = '✓ Changes saved and applied!';
    setTimeout(() => { statusEl.textContent = ''; }, 3000);
});