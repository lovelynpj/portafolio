/* ============================================================
   contact.js — Envío del formulario de contacto por correo
   Usa Web3Forms (https://web3forms.com) — gratis, sin backend.

   PASOS PARA ACTIVARLO:
   1. Entrá a https://web3forms.com/ y registrate con tu email.
   2. Copiá el "Access Key" que te dan.
   3. Pegalo abajo en ACCESS_KEY (reemplazá el texto de ejemplo).
   4. Agregá <script src="contact.js"></script> en tu index.html,
      JUSTO DESPUÉS de <script src="main.js"></script>.
   ============================================================ */

const ACCESS_KEY = "4089a761-0aa5-432d-be06-62944b6a1a3d"; // <-- pegá aquí tu key de Web3Forms

const contactForm = document.getElementById('contactForm');
const formMsg      = document.getElementById('form-msg');

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalBtnHTML = submitBtn.innerHTML;

    // Tomamos los valores de los campos
    const data = {
      access_key: ACCESS_KEY,
      name:    document.getElementById('fname').value,
      email:   document.getElementById('femail').value,
      subject: document.getElementById('fsubject').value || 'Nuevo contacto desde el portafolio',
      message: document.getElementById('fmsg').value,
    };

    // Estado "enviando..."
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    formMsg.style.display = 'block';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        formMsg.textContent = '✅ ¡Mensaje enviado con éxito! Te responderé pronto.';
        formMsg.className   = 'success';
        contactForm.reset();
      } else {
        formMsg.textContent = '❌ Hubo un error al enviar. Intentá de nuevo.';
        formMsg.className   = 'error';
      }
    } catch (err) {
      formMsg.textContent = '❌ Error de conexión. Probá de nuevo más tarde.';
      formMsg.className   = 'error';
    }

    // Restaurar botón
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnHTML;

    // Ocultar mensaje después de 6 segundos
    setTimeout(() => {
      formMsg.style.display = 'none';
      formMsg.className = '';
    }, 6000);
  });
}