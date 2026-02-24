/* ================================
   CONSENTIMIENTO DE COOKIES
================================ */

document.addEventListener('DOMContentLoaded', function () {

  const banner          = document.getElementById('cookieBanner');
  const btnAceptar      = document.getElementById('cookieAceptar');
  const btnRechazar     = document.getElementById('cookieRechazar');
  const btnConfig       = document.getElementById('cookieConfig');

  const modal             = document.getElementById('cookieModal');
  const btnGuardar        = document.getElementById('cookieGuardar');
  const btnCerrarModal    = document.getElementById('cookieCerrarModal');
  const toggleAnalytics   = document.getElementById('toggleAnalytics');
  const toggleAds         = document.getElementById('toggleAds');

  const cookieSettingsBtn = document.getElementById('cookieSettingsBtn');

  // Si ya eligió antes, no mostrar el banner
  const consentimiento = localStorage.getItem('cookieConsent');
  if (consentimiento) {
    aplicarConsentimiento(JSON.parse(consentimiento));
  } else {
    // Mostrar banner con pequeño delay
    setTimeout(() => banner.classList.add('show'), 800);
  }

  // --- ACEPTAR TODO ---
  btnAceptar.addEventListener('click', () => {
    const prefs = { analytics: true, ads: true };
    guardarYAplicar(prefs);
  });

  // --- RECHAZAR TODO ---
  btnRechazar.addEventListener('click', () => {
    const prefs = { analytics: false, ads: false };
    guardarYAplicar(prefs);
  });

  // --- ABRIR MODAL DESDE EL BANNER ---
  btnConfig.addEventListener('click', () => {
    modal.classList.add('show');
  });

  // --- BOTÓN GALLETA: abrir modal en cualquier momento ---
  if (cookieSettingsBtn) {
    cookieSettingsBtn.addEventListener('click', () => {
      const prefs = JSON.parse(localStorage.getItem('cookieConsent') || '{"analytics":true,"ads":true}');
      toggleAnalytics.checked = prefs.analytics;
      toggleAds.checked = prefs.ads;
      modal.classList.add('show');
    });
  }

  // --- CERRAR MODAL SIN GUARDAR ---
  btnCerrarModal.addEventListener('click', () => {
    modal.classList.remove('show');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('show');
  });

  // --- GUARDAR PREFERENCIAS DEL MODAL ---
  btnGuardar.addEventListener('click', () => {
    const prefs = {
      analytics: toggleAnalytics.checked,
      ads: toggleAds.checked
    };
    modal.classList.remove('show');
    guardarYAplicar(prefs);
  });

  function guardarYAplicar(prefs) {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
    banner.classList.remove('show');
    aplicarConsentimiento(prefs);
  }

  function aplicarConsentimiento(prefs) {
    if (prefs.analytics) {
      window['ga-disable-GA_MEASUREMENT_ID'] = false;
    } else {
      window['ga-disable-GA_MEASUREMENT_ID'] = true;
    }
  }

});