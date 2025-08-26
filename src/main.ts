import './style.css';
import './darkmode.js';
import { initRouter } from './router.ts';


function initFinder() {
  const buscador = document.getElementById('buscador') as HTMLInputElement;
  const facultades = document.querySelectorAll('.facultad');
  const mensajeNoResultados = document.getElementById('mensajeNoResultados') as HTMLElement;

  buscador?.addEventListener('input', () => {
    const texto = buscador.value.toLowerCase();
    let hayResultados = false;

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


      (facultad as HTMLElement).style.display = algunaCoincide ? 'block' : 'none';


      if (algunaCoincide) {
        hayResultados = true;
      }
    });


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


    const finderRect = safeFinder.getBoundingClientRect();
    const finderInitialTop = finderRect.top + window.scrollY;
    const headerHeight = safeHeader.offsetHeight;
    const triggerPoint = finderInitialTop - (headerHeight + MARGIN);


    finder.style.position = "sticky";
    finder.style.top = `${headerHeight + MARGIN}px`;
    finder.style.zIndex = "49";


    if (titleH2) {
      titleH2.style.transition = "opacity 200ms ease-out, transform 200ms ease-out";
    }

    function makeFixed() {
      if (isFixed) return;


      const rect = safeFinder.getBoundingClientRect();


      spacer.style.height = `${safeFinder.offsetHeight}px`;
      spacer.style.width = `${rect.width}px`;
      spacer.style.visibility = "hidden";

      if (safeFinder.parentElement) {
        safeFinder.parentElement.insertBefore(spacer, safeFinder);
      }


      safeFinder.style.transition = "none";
      safeFinder.style.position = "fixed";
      safeFinder.style.top = `${rect.top}px`;
      safeFinder.style.left = `${rect.left}px`;
      safeFinder.style.width = `${rect.width}px`;


      requestAnimationFrame(() => {
        safeFinder.style.transition = "top 200ms ease-out";
        safeFinder.style.top = `${MARGIN}px`;
      });

      isFixed = true;
    }

    function makeSticky() {
      if (!isFixed) return;


      if (spacer.parentNode) {
        spacer.parentNode.removeChild(spacer);
      }


      safeFinder.style.transition = "none";
      safeFinder.style.position = "sticky";
      safeFinder.style.top = `${headerHeight + MARGIN}px`;
      safeFinder.style.left = "";
      safeFinder.style.width = "";


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

        safeHeader.style.transition = "transform 150ms ease-out, opacity 150ms ease-out";
        safeHeader.style.transform = "translateY(-100%)";
        safeHeader.style.opacity = "0";
        safeHeader.style.pointerEvents = "none";
        headerHidden = true;
      } else if (!hide && headerHidden) {

        safeHeader.style.transform = "translateY(0)";
        safeHeader.style.opacity = "1";
        safeHeader.style.pointerEvents = "auto";
        headerHidden = false;
      }
    }

    function update() {
      const scrollY = window.scrollY;
      const shouldBeFixed = scrollY >= triggerPoint;


      const titleShouldHide = scrollY > 50;


      toggleTitle(titleShouldHide);

      if (shouldBeFixed) {

        if (!headerHidden) {
          toggleHeader(true);

          setTimeout(() => makeFixed(), 50);
        } else {
          makeFixed();
        }
      } else {

        if (isFixed) {
          makeSticky();
          setTimeout(() => toggleHeader(false), 50);
        } else {
          toggleHeader(false);
        }
      }
    }


    let rafId: number | null = null;
    function throttledUpdate() {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        update();
        rafId = null;
      });
    }


    window.addEventListener("scroll", throttledUpdate, { passive: true });


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


    update();
  }
}

export function initPageFeatures() {
  initFinder();
  initMenu();
  initHeader();
}


initRouter();