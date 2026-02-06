// ===============================
//  SISTEMA DE FILTROS NORMAL
// ===============================

const filterButtons = document.querySelectorAll(".filter-btn");
const favoritosBtn = document.getElementById("btnFavoritos");

let activeFilters = new Set();
let modoFavoritos = false;

// Listener general para TODOS los botones de filtro
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.filter;

    // ===============================
    //  CASO ESPECIAL: FAVORITOS
    // ===============================
    if (type === "favoritos") {

      // Si ya está activo → desactivar y mostrar todo
      if (btn.classList.contains("active-filter")) {
        btn.classList.remove("active-filter");
        modoFavoritos = false;
        activeFilters.clear();
        applyFilters();
        return;
      }

      // Activar modo favoritos
      modoFavoritos = true;

      // Desactivar todos los demás filtros
      filterButtons.forEach(b => b.classList.remove("active-filter"));
      activeFilters.clear();

      // Activar solo Favoritos
      btn.classList.add("active-filter");

      // Mostrar solo favoritos
      mostrarSoloFavoritos();
      return;
    }

    // ===============================
    //  SI PULSAS OTRO FILTRO → DESACTIVAR FAVORITOS
    // ===============================
    favoritosBtn.classList.remove("active-filter");
    modoFavoritos = false;

    // Alternar selección normal
    if (activeFilters.has(type)) {
      activeFilters.delete(type);
      btn.classList.remove("active-filter");
    } else {
      activeFilters.add(type);
      btn.classList.add("active-filter");
    }

    applyFilters();
  });
});

// ===============================
//  APLICAR FILTROS NORMALES
// ===============================

function applyFilters() {
  const blocks = document.querySelectorAll(".convertido");

  // Si no hay filtros → mostrar todo
  if (activeFilters.size === 0) {
    blocks.forEach(b => b.style.display = "block");
    return;
  }

  blocks.forEach(block => {
    const types = block.dataset.type.split(" ");
    const shouldShow = [...activeFilters].some(f => types.includes(f));
    block.style.display = shouldShow ? "block" : "none";
  });
}

// ===============================
//  MOSTRAR SOLO FAVORITOS
// ===============================

function mostrarSoloFavoritos() {
  const favoritos = getFavoritos();
  const blocks = document.querySelectorAll(".convertido");

  blocks.forEach(block => {
    const nombre = block.querySelector("label").textContent;
    const texto = block.querySelector("textarea").value;

    const esFav = favoritos.some(f => f.nombre === nombre && f.texto === texto);

    block.style.display = esFav ? "block" : "none";
  });
}
