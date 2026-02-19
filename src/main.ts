import './style.css';
import './darkmode.js';
import { initializeCounter } from '../src/initializeCounter.ts'
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
  const menuToggle = document.getElementById('menu-toggle') as HTMLButtonElement | null;
  const menu = document.getElementById('menu') as HTMLElement | null;

  if (menuToggle && menu) {
    let isOpen = false;

    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      isOpen = !isOpen;

      // Solo aplicar transformaciones en mobile
      if (window.innerWidth < 768) {
        if (isOpen) {
          menu.style.transform = "translateX(0)";
        } else {
          menu.style.transform = "translateX(100%)";
        }
      }

      // Animar icono hamburguesa
      const lines = menuToggle.querySelectorAll('.menu-line') as NodeListOf<HTMLElement>;
      if (isOpen) {
        lines[0].style.transform = "rotate(45deg) translateY(12px)";
        lines[1].style.opacity = "0";
        lines[2].style.transform = "rotate(-45deg) translateY(-12px)";
      } else {
        lines[0].style.transform = "rotate(0) translateY(0)";
        lines[1].style.opacity = "1";
        lines[2].style.transform = "rotate(0) translateY(0)";
      }
    });

    // Cerrar menú al hacer clic en un link (solo en mobile)
    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 768) {
          isOpen = false;
          menu.style.transform = "translateX(100%)";

          const lines = menuToggle.querySelectorAll('.menu-line') as NodeListOf<HTMLElement>;
          lines[0].style.transform = "rotate(0) translateY(0)";
          lines[1].style.opacity = "1";
          lines[2].style.transform = "rotate(0) translateY(0)";
        }
      });
    });

    // Cerrar al hacer clic fuera (solo en mobile)
    document.addEventListener("click", (e) => {
      if (window.innerWidth < 768) {
        if (!menu.contains(e.target as Node) && !menuToggle.contains(e.target as Node)) {
          if (isOpen) {
            isOpen = false;
            menu.style.transform = "translateX(100%)";

            const lines = menuToggle.querySelectorAll('.menu-line') as NodeListOf<HTMLElement>;
            lines[0].style.transform = "rotate(0) translateY(0)";
            lines[1].style.opacity = "1";
            lines[2].style.transform = "rotate(0) translateY(0)";
          }
        }
      }
    });
  }
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
      question: "¿Cómo me inscribo en la UCEVA?",
      answer: "Puedes realizar tu inscripción a través del portal web de la UCEVA. Primero debes ingresar al menú “Aspirante → Inscripción”, diligenciar el formulario de preinscripción y pagar el valor correspondiente."
    },
    {
      question: "¿Cuáles son los programas académicos que se dictan?",
      answer: `La UCEVA ofrece programas de pregrado, posgrado y educación continua. Puedes consultarlos en la sección 'Oferta Académica'. 
      <a href="https://www.uceva.edu.co/inicio/atencion-y-servicio-al-ciudadano/oferta-academica-2/" target="_blank" class="text-[#f818ed] dark:text-[#bbfd04] 
      font-semibold hover:underline hover:opacity-80 transition duration-300"> 👉 Consultar Oferta académica</a>`
    },
    {
      question: "¿Dónde puedo consultar el calendario académico?",
      answer: `El calendario académico se encuentra disponible en el sitio web institucional, en la sección 'Calendario de Inscripción, admisión y matrícula'.
      <a href="https://www.uceva.edu.co/aspirante/calendario-de-inscripcion-admision-y-matricula-pregrados/" target="_blank" class="text-[#f818ed] dark:text-[#bbfd04] 
      font-semibold hover:underline hover:opacity-80 transition duration-300"> 👉 Consultar calendario académico</a>`
    },
    {
      question: "¿Qué documentos debo tener antes de comenzar la inscripción?",
      answer: "Tu documento de identidad, diploma o acta de grado de bachiller, certificados de grados 10° y 11°, y el resultado del examen Saber 11 (o su equivalente) si aplica."
    },
    {
      question: "¿Qué pasa si no asisto a la prueba psicotécnica?",
      answer: "Si no te aistes en la fecha y hora asignada, el resultado de la prueba será cero."
    },
    {
      question: "¿Qué es el SISBEN y para qué sirve?",
      answer: "El SISBEN clasifica a la población según sus condiciones socioeconómicas para acceder a beneficios del Estado."
    },
    {
      question: "¿Dónde ingreso los resultados del examen Saber 11?",
      answer: "En el formulario de inscripción se solicita el tipo de documento, número de documento y el Código SNP (si presentaste desde 2014 en adelante). Esa validación es necesaria para continuar con el proceso."
    },
    {
      question: "¿Puedo inscribirme si soy aspirante extranjero?",
      answer: "Sí, siempre y cuando cumplas con los requisitos académicos y de homologación de documentos que exige la Institución. (Nota: Detalles específicos de este caso pueden variar según normativa de la Institución)."
    },
    {
      question: "¿Dónde pago la inscripción y cuál es el valor?",
      answer: "El pago se realiza mediante el desprendible generado en la preinscripción (en línea o en los bancos autorizados). El valor exacto se encuentra publicado en la convocatoria vigente en la página de la Institución."
    },
    {
      question: "¿Qué debo hacer después de ser admitido?",
      answer: "Debes formalizar la matrícula académica y financiera dentro de las fechas establecidas, subir a la plataforma los documentos requeridos y estar atento a las indicaciones de la Institución sobre inicio de clases."
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

export async function initPageFeatures() {
  initModales();
  initFinder();
  initMenu();
  initHeader();
  initFAQSearch();
  await initializeCounter();
}
initRouter();