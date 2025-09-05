// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile quand on clique sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navigation smooth scroll
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Mise à jour de la navigation active au scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Animation des barres de compétences
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Animation d'apparition des éléments
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Appliquer l'animation aux cartes de projet
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    fadeInObserver.observe(card);
});

// Validation et soumission du formulaire de contact
const contactForm = document.getElementById('contactForm');
const formInputs = contactForm.querySelectorAll('input, textarea');

// Validation en temps réel
formInputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearError);
});

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Supprimer les messages d'erreur existants
    clearError(e);
    
    let isValid = true;
    let errorMessage = '';
    
    // Validation selon le type de champ
    switch(field.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Veuillez entrer une adresse email valide';
            }
            break;
        case 'text':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Ce champ doit contenir au moins 2 caractères';
            }
            break;
        default:
            if (field.tagName === 'TEXTAREA' && value.length < 10) {
                isValid = false;
                errorMessage = 'Le message doit contenir au moins 10 caractères';
            }
    }
    
    if (!isValid) {
        showError(field, errorMessage);
    }
    
    return isValid;
}

function showError(field, message) {
    field.style.borderColor = '#e74c3c';
    field.style.backgroundColor = 'rgba(231, 76, 60, 0.1)';
    
    // Créer le message d'erreur
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '0.5rem';
    
    field.parentNode.appendChild(errorDiv);
}

function clearError(e) {
    const field = e.target;
    field.style.borderColor = '';
    field.style.backgroundColor = '';
    
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Soumission du formulaire
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Valider tous les champs
    let isFormValid = true;
    formInputs.forEach(input => {
        const fieldEvent = { target: input };
        if (!validateField(fieldEvent)) {
            isFormValid = false;
        }
    });
    
    if (isFormValid) {
        // Simuler l'envoi du formulaire
        showSuccessMessage();
        contactForm.reset();
    } else {
        showFormError();
    }
});

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #1dd1a1, #00d2d3);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            margin-bottom: 1rem;
            text-align: center;
            animation: slideIn 0.5s ease;
        ">
            <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
            Merci ! Votre message a été envoyé avec succès.
        </div>
    `;
    
    contactForm.insertBefore(successDiv, contactForm.firstChild);
    
    // Supprimer le message après 5 secondes
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

function showFormError() {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error-message';
    errorDiv.innerHTML = `
        <div style="
            background: rgba(231, 76, 60, 0.1);
            color: #e74c3c;
            padding: 1rem 2rem;
            border-radius: 10px;
            margin-bottom: 1rem;
            text-align: center;
            border: 1px solid rgba(231, 76, 60, 0.3);
        ">
            <i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>
            Veuillez corriger les erreurs dans le formulaire.
        </div>
    `;
    
    contactForm.insertBefore(errorDiv, contactForm.firstChild);
    
    // Supprimer le message après 3 secondes
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Effet de parallaxe léger sur le hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroIllustration = document.querySelector('.hero-illustration');
    
    if (heroIllustration) {
        heroIllustration.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Animation du texte au chargement
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 200);
    }
    
    if (heroDescription) {
        heroDescription.style.opacity = '0';
        heroDescription.style.transform = 'translateY(30px)';
        heroDescription.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
        
        setTimeout(() => {
            heroDescription.style.opacity = '1';
            heroDescription.style.transform = 'translateY(0)';
        }, 500);
    }
    
    if (heroButtons) {
        heroButtons.style.opacity = '0';
        heroButtons.style.transform = 'translateY(30px)';
        heroButtons.style.transition = 'opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s';
        
        setTimeout(() => {
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0)';
        }, 800);
    }
});

// Effet hover sur les cartes de projet
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Compteur animé pour les compétences (optionnel)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start) + '%';
        
        if (start >= target) {
            element.textContent = target + '%';
            clearInterval(timer);
        }
    }, 16);
}

// Gestion du thème sombre (bonus)
const themeToggle = document.createElement('button');
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
themeToggle.className = 'theme-toggle';
themeToggle.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    background: linear-gradient(135deg, #1dd1a1, #00d2d3);
    color: white;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(29, 209, 161, 0.3);
    z-index: 1000;
    transition: all 0.3s ease;
`;

document.body.appendChild(themeToggle);

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    
    if (document.body.classList.contains('dark-theme')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
});

// Styles pour le thème sombre améliorés
const darkThemeStyles = `
    .dark-theme {
        --light-color: #1a1a2e;
        --white: #16213e;
        --text-color: #ffffff;
        --text-light: #b8b8b8;
        --dark-color: #0f0f23;
    }
    
    .dark-theme .nav {
        background: rgba(15, 15, 35, 0.95);
    }
    
    .dark-theme .hero {
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    }
    
    .dark-theme .btn-primary {
        background: var(--gradient);
        color: var(--white);
    }
    
    .dark-theme .btn-secondary {
        background: transparent;
        color: var(--primary-color);
        border: 2px solid var(--primary-color);
    }
    
    .dark-theme .btn-secondary:hover {
        background: var(--primary-color);
        color: var(--white);
    }
    
    .dark-theme .contact-form input,
    .dark-theme .contact-form textarea {
        background: var(--white);
        border: 1px solid #333;
        color: var(--text-color);
    }
    
    .dark-theme .contact-form input::placeholder,
    .dark-theme .contact-form textarea::placeholder {
        color: var(--text-light);
    }
    
    .dark-theme .skill-category,
    .dark-theme .experience-item-summary,
    .dark-theme .learning-item-summary,
    .dark-theme .cert-card {
        background: var(--white);
        border: 1px solid #333;
    }
    
    .dark-theme .cv-reference {
        background: rgba(29, 209, 161, 0.15);
        border-color: var(--primary-color);
    }
    
    .dark-theme .timeline-item,
    .dark-theme .education-item {
        background: var(--white);
        border: 1px solid #333;
    }
    
    .dark-theme .timeline-item::before {
        background: var(--primary-color);
    }
    
    .dark-theme .project-card {
        background: var(--white);
        border: 1px solid #333;
    }
    
    .dark-theme .hero-title {
        color: #ffffff !important;
    }
    
    .dark-theme .hero-description {
        color: #b8b8b8 !important;
    }
    
    .dark-theme .highlight {
        color: var(--primary-color) !important;
    }
    
    .dark-theme .profile-photo {
        border: 4px solid var(--primary-color);
        box-shadow: 0 0 30px rgba(29, 209, 161, 0.3);
    }
    
    .dark-theme .tech-icon {
        background: rgba(29, 209, 161, 0.1);
        border: 2px solid var(--primary-color);
        color: var(--primary-color) !important;
    }
    
    .dark-theme .section-title {
        color: #ffffff !important;
    }
    
    .dark-theme .about h3 {
        color: #ffffff !important;
    }
    
    .dark-theme .about p {
        color: #b8b8b8 !important;
    }
    
    .dark-theme .nav-link {
        color: #ffffff !important;
    }
    
    .dark-theme .nav-link:hover {
        color: var(--primary-color) !important;
    }
    
    .dark-theme .cv-reference p {
        color: #ffffff !important;
    }
    
    .dark-theme .learning-year {
        background: var(--primary-color);
        color: #ffffff;
    }
    
    .dark-theme .learning-info h4 {
        color: #ffffff !important;
    }
    
    .dark-theme .learning-info p {
        color: #b8b8b8 !important;
    }
    
    .dark-theme .contact-info h3 {
        color: #ffffff !important;
    }
    
    .dark-theme .contact-info p {
        color: #b8b8b8 !important;
    }
    
    .dark-theme .contact-item i {
        color: var(--primary-color) !important;
    }
    
    .dark-theme .social-links a {
        color: var(--primary-color) !important;
        border-color: var(--primary-color) !important;
    }
    
    .dark-theme .social-links a:hover {
        background: var(--primary-color) !important;
        color: #ffffff !important;
    }
    
    .dark-theme .footer {
        background: var(--dark-color);
        border-top: 1px solid #333;
    }
    
    .dark-theme .footer p {
        color: #b8b8b8 !important;
    }
    
    .dark-theme .footer i {
        color: var(--primary-color) !important;
    }
    
    .dark-theme .profile-card h3 {
        color: #ffffff;
    }
    
    .dark-theme .profile-card p {
        color: #b8b8b8;
    }
    
    .dark-theme .detail-item span {
        color: #b8b8b8;
    }
    
    .dark-theme .skills-category h3 {
        color: #ffffff;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = darkThemeStyles;
document.head.appendChild(styleSheet);
