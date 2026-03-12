# FontsPage 🅵🅾🅽🆃🆂

> Conversor de letras y fuentes Unicode para redes sociales, juegos y cualquier plataforma.

**[fontspage.com](https://fonstpage.vercel.app)** — Transforma palabras en diseños únicos.

---

## ¿Qué es FontsPage?

FontsPage es una herramienta web que convierte cualquier texto en cientos de estilos tipográficos usando caracteres Unicode. No son fuentes externas ni imágenes: son caracteres reales que funcionan en Instagram, TikTok, WhatsApp, Discord, Fortnite, Roblox y la mayoría de plataformas.

- Escribe tu texto
- Elige un estilo
- Copia y pega donde quieras

---

## Páginas disponibles

**Redes sociales**
- Instagram, TikTok, WhatsApp, Facebook, X (Twitter), Twitch, Discord

**Juegos**
- Minecraft, Fortnite, Free Fire, Roblox, Valorant, League of Legends, Brawl Stars

**Otras**
- Todas las fuentes, Sobre nosotros, Contacto, Privacidad

---

## Tecnologías

- HTML5, CSS3, JavaScript (vanilla)
- [particles.js](https://github.com/VincentGarreau/particles.js) — fondo animado
- [Web3Forms](https://web3forms.com) — formulario de contacto
- Google AdSense — monetización
- Google Analytics — estadísticas
- Desplegado en **Vercel**

---

## Estructura del proyecto

```
fontspage/
├── index.html
├── favicon.ico
├── css/
│   └── style.css
├── js/
│   ├── fonts.js          # Lógica del conversor de fuentes
│   ├── filters.js        # Filtros, contador y persistencia
│   ├── main.js           # Scroll, favoritos, formulario, copiar
│   ├── cookies.js        # Banner y modal de cookies
│   └── particles.js-master/
│       ├── particles.js
│       └── app.js        # Configuración adaptativa (móvil/desktop)
├── images/
│   ├── logo.png
│   └── opengraph.png
└── html/
    ├── instagram.html
    ├── tiktok.html
    ├── whatsapp.html
    ├── facebook.html
    ├── x.html
    ├── twitch.html
    ├── discord.html
    ├── minecraft.html
    ├── fortnite.html
    ├── free-fire.html
    ├── roblox.html
    ├── valorant.html
    ├── league-of-legends.html
    ├── brawl-stars.html
    ├── todas-las-fuentes.html
    ├── about.html
    ├── contact.html
    └── privacidad.html
```

---

## Funcionalidades

- **Conversor en tiempo real** — actualiza todas las fuentes mientras escribes
- **Filtros por categoría** — Italics, Bolds, Styled, Others, Favoritos
- **Contador de fuentes** — muestra cuántas fuentes hay activas con el filtro
- **Favoritos** — guardados en `localStorage`, persisten entre sesiones
- **Recordar último texto** — el texto escrito se recupera al volver a la página
- **Copiar todas las fuentes** — copia solo las fuentes visibles con el filtro activo
- **Partículas adaptativas** — 25 partículas en móvil, 52 en escritorio, carga lazy tras el contenido
- **Banner de cookies** — RGPD compliant, con modal de configuración granular
- **Formulario de contacto** — gestionado por Web3Forms, sin backend propio

---

## Rendimiento

- `particles.js` carga de forma lazy (después del evento `load`) para no bloquear el render
- `fonts.js` minificado
- Scripts cargados con `defer`
- Sin librerías externas salvo particles.js
- Fuente Oswald cargada desde Google Fonts con `display=swap`

---

## Privacidad y cookies

El sitio usa cookies para:
- **Necesarias** — favoritos, último texto, preferencias de cookies (`localStorage`)
- **Google Analytics** — estadísticas anónimas de uso
- **Google AdSense** — publicidad que mantiene el servicio gratuito

Los usuarios pueden aceptar, rechazar o configurar cada tipo desde el banner o el botón 🍪.

---

## Autor

Hecho con ❤️ por **AirLord**  
© 2026 FontsPage
