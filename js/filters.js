// ===============================
//  SISTEMA DE FILTROS
//  - Contador de fuentes visibles
//  - Persistencia en sessionStorage
//  - Animación suave al filtrar
// ===============================

const filterButtons = document.querySelectorAll('.filter-btn');
const favoritosBtn  = document.getElementById('btnFavoritos');

let activeFilters = new Set();
let modoFavoritos = false;

// ===============================
//  CONTADOR DE FUENTES VISIBLES
// ===============================

function actualizarContador() {
  const contador = document.getElementById('fontCounter');
  if (!contador) return;
  const total    = document.querySelectorAll('.convertido').length;
  const visibles = [...document.querySelectorAll('.convertido')]
    .filter(b => b.style.display !== 'none').length;

  contador.textContent = visibles === total
    ? `${total} fuentes`
    : `${visibles} de ${total} fuentes`;
}

// ===============================
//  ANIMACIÓN SUAVE AL FILTRAR
// ===============================

function mostrarBloque(bloque) {
  bloque.style.display = 'block';
  // Forzar reflow para que la transición arranque desde 0
  bloque.getBoundingClientRect();
  bloque.classList.add('visible');
  bloque.classList.remove('hidden');
}

function ocultarBloque(bloque) {
  bloque.classList.add('hidden');
  bloque.classList.remove('visible');
  // Esperar a que termine la transición CSS antes de ocultar
  bloque.addEventListener('transitionend', () => {
    if (bloque.classList.contains('hidden')) {
      bloque.style.display = 'none';
    }
  }, { once: true });
}

// ===============================
//  PERSISTENCIA DEL FILTRO
// ===============================

function guardarFiltro() {
  const estado = {
    filtros:       [...activeFilters],
    favoritos:     modoFavoritos,
  };
  sessionStorage.setItem('filtroActivo', JSON.stringify(estado));
}

function restaurarFiltro() {
  const guardado = sessionStorage.getItem('filtroActivo');
  if (!guardado) return;

  try {
    const { filtros, favoritos } = JSON.parse(guardado);

    if (favoritos) {
      modoFavoritos = true;
      favoritosBtn?.classList.add('active-filter');
      mostrarSoloFavoritos();
      actualizarContador();
      return;
    }

    if (filtros && filtros.length > 0) {
      filtros.forEach(f => {
        activeFilters.add(f);
        filterButtons.forEach(btn => {
          if (btn.dataset.filter === f) btn.classList.add('active-filter');
        });
      });
      applyFilters();
    }
  } catch (e) {
    sessionStorage.removeItem('filtroActivo');
  }
}

// ===============================
//  LISTENERS DE FILTROS
// ===============================

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.filter;

    // CASO: FAVORITOS
    if (type === 'favoritos') {
      if (btn.classList.contains('active-filter')) {
        btn.classList.remove('active-filter');
        modoFavoritos = false;
        activeFilters.clear();
        applyFilters();
        guardarFiltro();
        return;
      }
      modoFavoritos = true;
      filterButtons.forEach(b => b.classList.remove('active-filter'));
      activeFilters.clear();
      btn.classList.add('active-filter');
      mostrarSoloFavoritos();
      guardarFiltro();
      return;
    }

    // CASO: FILTRO NORMAL — desactivar favoritos si estaba activo
    favoritosBtn?.classList.remove('active-filter');
    modoFavoritos = false;

    if (activeFilters.has(type)) {
      activeFilters.delete(type);
      btn.classList.remove('active-filter');
    } else {
      activeFilters.add(type);
      btn.classList.add('active-filter');
    }

    applyFilters();
    guardarFiltro();
  });
});

// ===============================
//  APLICAR FILTROS
// ===============================

function applyFilters() {
  const blocks = document.querySelectorAll('.convertido');

  blocks.forEach(block => {
    if (activeFilters.size === 0) {
      mostrarBloque(block);
      return;
    }
    const types      = block.dataset.type.split(' ');
    const shouldShow = [...activeFilters].some(f => types.includes(f));
    shouldShow ? mostrarBloque(block) : ocultarBloque(block);
  });

  actualizarContador();
}

// ===============================
//  MOSTRAR SOLO FAVORITOS
// ===============================

function mostrarSoloFavoritos() {
  const favoritos = getFavoritos();
  const blocks    = document.querySelectorAll('.convertido');

  blocks.forEach(block => {
    const nombre = block.querySelector('label').textContent;
    const texto  = block.querySelector('textarea').value;
    const esFav  = favoritos.some(f => f.nombre === nombre && f.texto === texto);
    esFav ? mostrarBloque(block) : ocultarBloque(block);
  });

  actualizarContador();
}

// ===============================
//  INIT AL CARGAR
// ===============================

document.addEventListener('DOMContentLoaded', () => {
  // Asegurarse de que todos los bloques empiecen visibles
  document.querySelectorAll('.convertido').forEach(b => {
    b.style.display = 'block';
    b.classList.add('visible');
  });

  actualizarContador();
  restaurarFiltro();
});