import './style.css';
import './darkmode.js';
import { initRouter } from './router.ts';


function initFinder() {
  const buscador = document.getElementById('buscador') as HTMLInputElement;
  const facultades = document.querySelectorAll('.facultad');
  const mensajeNoResultados = document.getElementById('mensajeNoResultados') as HTMLElement;

  buscador?.addEventListener('input', () => {
    const texto = buscador.value.toLowerCase();
    let hayResultados = false; // para saber si algo coincidió

    facultades.forEach(facultad => {
      const tarjetas = facultad.querySelectorAll('.tarjeta');
      let algunaCoincide = false;

      tarjetas.forEach(tarjeta => {
        const contenido = tarjeta.textContent?.toLowerCase() || '';
        if (contenido.includes(texto)) {
          (tarjeta as HTMLElement).style.display = 'block';
          algunaCoincide = true;
        } else {
          (tarjeta as HTMLElement).style.display = 'none';
        }
      });

      // Oculta o muestra la facultad según si tuvo coincidencias
      (facultad as HTMLElement).style.display = algunaCoincide ? 'block' : 'none';

      // Si alguna facultad tiene coincidencia, hay resultados
      if (algunaCoincide) {
        hayResultados = true;
      }
    });

    // Mostrar u ocultar el mensaje
    mensajeNoResultados.style.display = hayResultados ? 'none' : 'block';
  });
}
function initMenu() {
  const menuToggle = document.getElementById('menu-toggle')
  const menu = document.getElementById('menu')

  menuToggle?.addEventListener('click', () => {
    menu?.classList.toggle('hidden')
  })
}
function initHeader() {
  //HEADER 
  const header = document.getElementById("headery") as HTMLElement | null;
  const finder = document.getElementById("buscador") as HTMLInputElement | null;
  const titleH2 = document.querySelector('#inicio h2') as HTMLElement | null;

  if (header && finder) {
    const safeFinder = finder;
    const safeHeader = header;


    let isFixed = false;
    let headerHidden = false;
    let titleHidden = false;

    const MARGIN = 16;
    const spacer = document.createElement("div");

    // Calculamos UNA SOLA VEZ la posición inicial
    const finderRect = safeFinder.getBoundingClientRect();
    const finderInitialTop = finderRect.top + window.scrollY;
    const headerHeight = safeHeader.offsetHeight;
    const triggerPoint = finderInitialTop - (headerHeight + MARGIN);

    // Configuración inicial
    finder.style.position = "sticky";
    finder.style.top = `${headerHeight + MARGIN}px`;
    finder.style.zIndex = "49";

    // Configurar transición del título
    if (titleH2) {
      titleH2.style.transition = "opacity 200ms ease-out, transform 200ms ease-out";
    }

    function makeFixed() {
      if (isFixed) return;

      // Capturar posición exacta ANTES de cualquier cambio
      const rect = safeFinder.getBoundingClientRect();

      // Crear spacer exacto
      spacer.style.height = `${safeFinder.offsetHeight}px`;
      spacer.style.width = `${rect.width}px`;
      spacer.style.visibility = "hidden";

      if (safeFinder.parentElement) {
        safeFinder.parentElement.insertBefore(spacer, safeFinder);
      }

      // Cambiar a fixed SIN transición inicialmente
      safeFinder.style.transition = "none";
      safeFinder.style.position = "fixed";
      safeFinder.style.top = `${rect.top}px`;
      safeFinder.style.left = `${rect.left}px`;
      safeFinder.style.width = `${rect.width}px`;

      // Reactivar transición después de un frame
      requestAnimationFrame(() => {
        safeFinder.style.transition = "top 200ms ease-out";
        safeFinder.style.top = `${MARGIN}px`;
      });

      isFixed = true;
    }

    function makeSticky() {
      if (!isFixed) return;

      // Remover spacer
      if (spacer.parentNode) {
        spacer.parentNode.removeChild(spacer);
      }

      // Cambiar a sticky sin transición
      safeFinder.style.transition = "none";
      safeFinder.style.position = "sticky";
      safeFinder.style.top = `${headerHeight + MARGIN}px`;
      safeFinder.style.left = "";
      safeFinder.style.width = "";

      // Reactivar transición
      requestAnimationFrame(() => {
        safeFinder.style.transition = "top 200ms ease-out";
      });

      isFixed = false;
    }

    function toggleTitle(hide: boolean) {
      if (!titleH2) return;

      if (hide && !titleHidden) {
        titleH2.style.opacity = "0";
        titleH2.style.transform = "translateY(-20px)";
        titleH2.style.pointerEvents = "none";
        titleHidden = true;
      } else if (!hide && titleHidden) {
        titleH2.style.opacity = "1";
        titleH2.style.transform = "translateY(0)";
        titleH2.style.pointerEvents = "auto";
        titleHidden = false;
      }
    }

    function toggleHeader(hide: boolean) {
      if (hide && !headerHidden) {
        // Ocultar header INMEDIATAMENTE, sin esperar
        safeHeader.style.transition = "transform 150ms ease-out, opacity 150ms ease-out";
        safeHeader.style.transform = "translateY(-100%)";
        safeHeader.style.opacity = "0";
        safeHeader.style.pointerEvents = "none";
        headerHidden = true;
      } else if (!hide && headerHidden) {
        // Mostrar header
        safeHeader.style.transform = "translateY(0)";
        safeHeader.style.opacity = "1";
        safeHeader.style.pointerEvents = "auto";
        headerHidden = false;
      }
    }

    function update() {
      const scrollY = window.scrollY;
      const shouldBeFixed = scrollY >= triggerPoint;

      // El título desaparece cuando empezamos a scrollear (threshold más bajo)
      const titleShouldHide = scrollY > 50; // Desaparece después de 50px de scroll

      // Manejar título
      toggleTitle(titleShouldHide);

      if (shouldBeFixed) {
        // Primero ocultar header, luego fijar input
        if (!headerHidden) {
          toggleHeader(true);
          // Pequeño delay para que el header termine de ocultarse
          setTimeout(() => makeFixed(), 50);
        } else {
          makeFixed();
        }
      } else {
        // Primero mostrar input sticky, luego mostrar header
        if (isFixed) {
          makeSticky();
          setTimeout(() => toggleHeader(false), 50);
        } else {
          toggleHeader(false);
        }
      }
    }

    // Throttle más agresivo
    let rafId: number | null = null;
    function throttledUpdate() {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        update();
        rafId = null;
      });
    }

    // Event listeners
    window.addEventListener("scroll", throttledUpdate, { passive: true });

    // Resize simplificado
    let resizeTimeout: number;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        if (isFixed && spacer.parentNode) {
          const spacerRect = spacer.getBoundingClientRect();
          safeFinder.style.width = `${spacerRect.width}px`;
        }
      }, 100);
    });

    // Update inicial
    update();
  }
}

export function initPageFeatures() {
  initFinder();
  initMenu();
  initHeader();
}


initRouter();