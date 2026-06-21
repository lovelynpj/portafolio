/* ============================================================
   main.js — Pedro Pimentel Portfolio
   ============================================================ */

/* ===== NAVBAR: efecto al hacer scroll ===== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});


/* ===== MENÚ MOBILE ===== */
const navToggle  = document.getElementById('navToggle');
const navMobile  = document.getElementById('navMobile');

navToggle.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});

/** Cierra el menú al hacer click en un enlace (llamado desde el HTML con onclick) */
function closeMenu() {
  navMobile.classList.remove('open');
}


/* ===== TEXTO ANIMADO (typewriter) ===== */
const phrases = [
  'Desarrollador Web',
  'Estudiante de Programación',
  'Entusiasta de Criptografía',
  'Creador de Software',
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;

const typedEl = document.getElementById('typed');

function type() {
  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting) {
    // Escribe un carácter
    typedEl.textContent = currentPhrase.slice(0, ++charIndex);

    if (charIndex === currentPhrase.length) {
      // Terminó de escribir → espera y luego borra
      isDeleting = true;
      setTimeout(type, 1600);
      return;
    }
  } else {
    // Borra un carácter
    typedEl.textContent = currentPhrase.slice(0, --charIndex);

    if (charIndex === 0) {
      isDeleting   = false;
      phraseIndex  = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(type, isDeleting ? 55 : 90);
}

type(); // Inicia la animación


/* ===== SCROLL REVEAL ===== */
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    // Muestra el elemento
    entry.target.classList.add('visible');

    // Anima la barra de habilidad si corresponde
    const skillBar = entry.target.querySelector('.skill-bar');
    if (skillBar) {
      const percentage = entry.target.dataset.bar || 70;
      setTimeout(() => {
        skillBar.style.width = percentage + '%';
      }, 200);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));


/* ===== FORMULARIO DE CONTACTO (simulado) ===== */
const contactForm = document.getElementById('contactForm');
const formMsg     = document.getElementById('form-msg');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Muestra mensaje de éxito
  formMsg.textContent = '✅ ¡Mensaje enviado con éxito! Te responderé pronto.';
  formMsg.className   = 'success';

  // Resetea el formulario
  this.reset();

  // Oculta el mensaje después de 5 segundos
  setTimeout(() => {
    formMsg.style.display = 'none';
    formMsg.className = '';
  }, 5000);
});
