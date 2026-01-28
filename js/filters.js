const filterButtons = document.querySelectorAll(".filter-btn");
let activeFilters = new Set();

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.filter;

    // Alternar selección
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

function applyFilters() {
  const blocks = document.querySelectorAll(".convertido");

  // Si no hay filtros → mostrar todo
  if (activeFilters.size === 0) {
    blocks.forEach(b => b.style.display = "block");
    return;
  }

  blocks.forEach(block => {
    // Convertir "bold italic" → ["bold","italic"]
    const types = block.dataset.type.split(" ");

    // Mostrar si ALGUNO de los filtros coincide
    const shouldShow = [...activeFilters].some(f => types.includes(f));

    block.style.display = shouldShow ? "block" : "none";
  });
}
