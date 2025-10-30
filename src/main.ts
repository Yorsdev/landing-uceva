import './style.css';
import './darkmode.js';
import { initRouter } from './router.ts';
import { initModales } from './helpers/modales.ts';
import Fuse from 'fuse.js';


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

function initFAQSearch() {

  // Datos de preguntas frecuentes
  const faqs = [
    {
      question: "¿Cómo me inscribo en la universidad?",
      answer: "Puedes realizar tu inscripción en línea a través del portal de admisiones de la UCEVA."
    },
    {
      question: "¿Cuáles son los programas académicos disponibles?",
      answer: "La UCEVA ofrece programas de pregrado, posgrado y educación continua. Puedes consultarlos en la sección 'Oferta Académica'."
    },
    {
      question: "¿Dónde puedo consultar el calendario académico?",
      answer: "El calendario académico se encuentra disponible en el sitio web institucional, en la sección 'Académico'."
    },
    {
      question: "¿Qué es el SISBEN y para qué sirve?",
      answer: "El SISBEN clasifica a la población según sus condiciones socioeconómicas para acceder a beneficios del Estado."
    }
  ];

  //Configuración de Fuse.js
  const fuse = new Fuse(faqs, {
    keys: ['question'],
    threshold: 0.4
  });


  //Selección de elementos del DOM
  const searchInput = document.getElementById("faqSearch") as HTMLInputElement | null;
  const resultsContainer = document.getElementById("faqResults") as HTMLElement | null;

  if (!searchInput || !resultsContainer) {
    console.warn("⚠️ Elementos FAQ no encontrados en el DOM.");
    return;
  }


  // Escuchar cambios en el buscador
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    resultsContainer.innerHTML = "";

    if (query.length === 0) return;

    const results = fuse.search(query);
    if (results.length === 0) {
      resultsContainer.innerHTML = `<p class="text-gray-500 dark:text-gray-400">No encontré resultados para tu pregunta.</p>`;
      return;
    }

    // Renderizar respuestas
    results.forEach(({ item }) => {
      const div = document.createElement("div");
      div.className = "p-4 bg-white dark:bg-gray-800 rounded-lg shadow transition hover:shadow-lg";
      div.innerHTML = `
        <p class="font-semibold text-blue-600 dark:text-[#bbfd04] mb-1">${item.question}</p>
        <p class="text-gray-700 dark:text-gray-300">${item.answer}</p>
      `;
      resultsContainer.appendChild(div);
    });
  });
}
// finaliza el código de chatbot

// ================

export function initPageFeatures() {
  initModales();
  initFinder();
  initMenu();
  initHeader();
  initFAQSearch();
}
initRouter();