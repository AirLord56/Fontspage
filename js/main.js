/* ================================
   BOTÓN SCROLL TO TOP
================================ */

const scrollBtn = document.getElementById("scrollTopBtn");
const inputBox = document.getElementById("input");

window.addEventListener("scroll", () => {
    scrollBtn.classList.toggle("show", window.scrollY > 300);
});

scrollBtn.addEventListener("click", () => {
    inputBox.scrollIntoView({ behavior: "smooth" });
});


/* ================================
   FORMULARIO DE CONTACTO
================================ */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);

        const response = await fetch("./send.php", {
            method: "POST",
            body: formData
        });

        const result = await response.text();

        if (result.trim() === "success") {
            const popup = document.getElementById("successPopup");
            popup.classList.add("show");
            contactForm.reset();
        } else {
            alert("Hubo un error al enviar el mensaje.");
        }
    });
}

const closePopup = document.getElementById("closePopup");
const popup = document.getElementById("successPopup");

if (closePopup && popup) {
    closePopup.addEventListener("click", () => popup.classList.remove("show"));

    popup.addEventListener("click", (e) => {
        if (e.target.id === "successPopup") popup.classList.remove("show");
    });
}


/* ================================
   RECORDAR ÚLTIMO TEXTO
================================ */

const input = document.getElementById("input");

input.addEventListener("input", () => {
    localStorage.setItem("ultimoTexto", input.value);
});

window.addEventListener("DOMContentLoaded", () => {
    const guardado = localStorage.getItem("ultimoTexto");
    if (guardado) {
        input.value = guardado;
        actualizarFuentes(guardado);
    }
});


/* ================================
   FAVORITOS (LÓGICA COMPLETA)
================================ */

function popupFavorito() {
    const popup = document.createElement("div");
    popup.className = "popup-fav";
    popup.textContent = "Añadido a favoritos";
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1500);
}

function getFavoritos() {
    return JSON.parse(localStorage.getItem("favoritos")) || [];
}

function setFavoritos(lista) {
    localStorage.setItem("favoritos", JSON.stringify(lista));
}

function toggleFavorito(nombre, texto) {
    let favoritos = getFavoritos();
    const existe = favoritos.some(f => f.nombre === nombre && f.texto === texto);

    if (existe) {
        favoritos = favoritos.filter(f => !(f.nombre === nombre && f.texto === texto));
    } else {
        favoritos.push({ nombre, texto });
        popupFavorito();
    }

    setFavoritos(favoritos);
}


/* ================================
   CLICK EN ESTRELLA DE FAVORITOS
================================ */

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("fav-btn")) {

        const btn = e.target;
        const bloque = btn.closest(".convertido");
        const nombre = bloque.querySelector("label").textContent;
        const texto = bloque.querySelector("textarea").value;

        toggleFavorito(nombre, texto);

        const esFav = getFavoritos().some(f => f.nombre === nombre && f.texto === texto);

        btn.classList.toggle("favorito", esFav);
        btn.textContent = esFav ? "★" : "☆";

        if (modoFavoritos) mostrarSoloFavoritos();
    }
});


/* ================================
   ACTUALIZAR ESTRELLAS AL CARGAR
================================ */

function actualizarEstrellas() {
    const favoritos = getFavoritos();

    document.querySelectorAll(".convertido").forEach(b => {
        const nombre = b.querySelector("label").textContent;
        const texto = b.querySelector("textarea").value;
        const btn = b.querySelector(".fav-btn");

        const esFav = favoritos.some(f => f.nombre === nombre && f.texto === texto);

        btn.classList.toggle("favorito", esFav);
        btn.textContent = esFav ? "★" : "☆";
    });
}

window.addEventListener("DOMContentLoaded", actualizarEstrellas);

