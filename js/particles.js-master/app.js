// ===============================
//  PARTICLES.JS — CONFIG ADAPTATIVA
//  Detecta el dispositivo y ajusta
//  los parámetros para mejor rendimiento
// ===============================

(function () {
  const isMobile = window.innerWidth < 768;
  const isLowEnd = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 2;

  // Reducir carga en móvil o dispositivos lentos
  const particleCount = isMobile ? 25 : (isLowEnd ? 35 : 52);
  const speed         = isMobile ? 2  : (isLowEnd ? 3  : 4);
  const linkedLines   = !isMobile; // Sin líneas en móvil (costosas de renderizar)
  const interactHover = !isMobile; // Sin repulse en móvil (innecesario con touch)

  particlesJS('particles-js', {
    particles: {
      number: {
        value: particleCount,
        density: { enable: true, value_area: 900 }
      },
      color: { value: '#ffffff' },
      shape: {
        type: 'star',
        stroke: { width: 0, color: '#000000' },
        polygon: { nb_sides: 6 }
      },
      opacity: {
        value: 0.45,
        random: false
      },
      size: {
        value: isMobile ? 2 : 3,
        random: true
      },
      line_linked: {
        enable: linkedLines,
        distance: 150,
        color: '#ffffff',
        opacity: 0.3,
        width: 1
      },
      move: {
        enable: true,
        speed: speed,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'window',
      events: {
        onhover: { enable: interactHover, mode: 'repulse' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        repulse: { distance: 180, duration: 0.4 },
        push:    { particles_nb: isMobile ? 1 : 3 }
      }
    },
    retina_detect: false // Desactivado: dobla el nº de partículas en pantallas retina
  });
})();