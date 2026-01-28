const scrollBtn = document.getElementById("scrollTopBtn");
const inputBox = document.getElementById("input");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollBtn.classList.add("show");
    } else {
        scrollBtn.classList.remove("show");
    }
});

scrollBtn.addEventListener("click", () => {
    inputBox.scrollIntoView({ behavior: "smooth" });
});


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
    closePopup.addEventListener("click", () => {
        popup.classList.remove("show");
    });

    popup.addEventListener("click", (e) => {
        if (e.target.id === "successPopup") {
            popup.classList.remove("show");
        }
    });
}




