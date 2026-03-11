/* ================================
   SCROLL TO TOP
================================ */

const scrollBtn = document.getElementById('scrollTopBtn');
const inputBox  = document.getElementById('input');

if (scrollBtn) {
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('show', window.scrollY > 300);
  });

  scrollBtn.addEventListener('click', () => {
    inputBox?.scrollIntoView({ behavior: 'smooth' });
  });
}

/* ================================
   FORMULARIO DE CONTACTO
================================ */

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        const popup = document.getElementById('successPopup');
        if (popup) popup.classList.add('show');
        contactForm.reset();
      } else {
        alert('Hubo un error al enviar el mensaje. Inténtalo de nuevo.');
      }
    } catch (err) {
      alert('No se pudo conectar con el servidor. Inténtalo más tarde.');
    }
  });

  const closePopup = document.getElementById('closePopup');
  const popup      = document.getElementById('successPopup');

  if (closePopup && popup) {
    closePopup.addEventListener('click', () => popup.classList.remove('show'));
    popup.addEventListener('click', (e) => {
      if (e.target.id === 'successPopup') popup.classList.remove('show');
    });
  }
}

/* ================================
   CONTADOR DE CARACTERES
================================ */

const input    = document.getElementById('input');
const charCount = document.getElementById('charCount');

function actualizarCharCount() {
  if (!charCount || !input) return;
  const n = input.value.length;
  charCount.textContent = n === 1 ? '1 carácter' : `${n} caracteres`;
}

/* ================================
   RECORDAR ÚLTIMO TEXTO
================================ */

if (input) {
  input.addEventListener('input', () => {
    localStorage.setItem('ultimoTexto', input.value);
    actualizarCharCount();
  });

  window.addEventListener('DOMContentLoaded', () => {
    const guardado = localStorage.getItem('ultimoTexto');
    if (guardado) {
      input.value = guardado;
      if (typeof actualizarFuentes === 'function') actualizarFuentes(guardado);
    }
    actualizarCharCount();
  });
}

/* ================================
   COPIAR TODAS LAS FUENTES
================================ */

const copyAllBtn = document.getElementById('copyAll');

if (copyAllBtn) {
  copyAllBtn.addEventListener('click', () => {
    const textos = [...document.querySelectorAll('.convertido')]
      .filter(b => b.style.display !== 'none')
      .map(b => {
        const label   = b.querySelector('label')?.textContent || '';
        const content = b.querySelector('textarea')?.value    || '';
        return `${label}: ${content}`;
      })
      .filter(t => t.includes(': ') && t.split(': ')[1])
      .join('\n');

    if (!textos) return;

    navigator.clipboard.writeText(textos).then(() => {
      copyAllBtn.classList.add('copied-all');
      const originalText = copyAllBtn.textContent;
      copyAllBtn.textContent = '¡Copiado!';
      setTimeout(() => {
        copyAllBtn.textContent = originalText;
        copyAllBtn.classList.remove('copied-all');
      }, 1800);
    });
  });
}

/* ================================
   FAVORITOS
================================ */

function popupFavorito() {
  const popup = document.createElement('div');
  popup.className = 'popup-fav';
  popup.textContent = 'Añadido a favoritos';
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 1500);
}

function getFavoritos() {
  return JSON.parse(localStorage.getItem('favoritos')) || [];
}

function setFavoritos(lista) {
  localStorage.setItem('favoritos', JSON.stringify(lista));
}

function toggleFavorito(nombre, texto) {
  let favoritos = getFavoritos();
  const existe  = favoritos.some(f => f.nombre === nombre && f.texto === texto);

  if (existe) {
    favoritos = favoritos.filter(f => !(f.nombre === nombre && f.texto === texto));
  } else {
    favoritos.push({ nombre, texto });
    popupFavorito();
  }

  setFavoritos(favoritos);
}

document.addEventListener('click', (e) => {
  if (!e.target.classList.contains('fav-btn')) return;

  const btn    = e.target;
  const bloque = btn.closest('.convertido');
  const nombre = bloque.querySelector('label').textContent;
  const texto  = bloque.querySelector('textarea').value;

  toggleFavorito(nombre, texto);

  const esFav = getFavoritos().some(f => f.nombre === nombre && f.texto === texto);
  btn.classList.toggle('favorito', esFav);
  btn.textContent = esFav ? '★' : '☆';

  // Si está en modo favoritos, actualizar vista
  if (typeof modoFavoritos !== 'undefined' && modoFavoritos) {
    if (typeof mostrarSoloFavoritos === 'function') mostrarSoloFavoritos();
  }
});

function actualizarEstrellas() {
  const favoritos = getFavoritos();
  document.querySelectorAll('.convertido').forEach(b => {
    const nombre = b.querySelector('label').textContent;
    const texto  = b.querySelector('textarea').value;
    const btn    = b.querySelector('.fav-btn');
    const esFav  = favoritos.some(f => f.nombre === nombre && f.texto === texto);
    btn.classList.toggle('favorito', esFav);
    btn.textContent = esFav ? '★' : '☆';
  });
}

window.addEventListener('DOMContentLoaded', actualizarEstrellas);