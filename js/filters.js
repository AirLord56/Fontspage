const filterButtons = document.querySelectorAll(".filter-btn");
let activeFilters = new Set();

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const type = btn.dataset.filter;

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

    if (activeFilters.size === 0) {
        blocks.forEach(b => b.style.display = "block");
        return;
    }

    blocks.forEach(block => {
        const type = block.dataset.type;
        block.style.display = activeFilters.has(type) ? "block" : "none";
    });
}
