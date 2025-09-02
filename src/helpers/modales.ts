type Programa = {
    titulo: string;
    descripcion: string;
    imagen: string;
    video: string;
};

const programas: Record<string, Programa> = {
    sistemas: {
        titulo: "Ingeniería de Sistemas",
        descripcion:
            "Puedes trabajar como desarrollador de software, arquitecto de soluciones TI, administrador de bases de datos, analista de ciberseguridad, consultor en transformación digital, gerente de proyectos tecnológicos e investigador en inteligencia artificial.",
        imagen: "/images/ing-sis.jpg",
        video: "https://www.youtube.com/watch?v=5h45UFt4OZY&ab_channel=UCEVACOL",
    },
    agropecuaria: {
        titulo: "Ingeniería Agropecuaria",
        descripcion:
            "Puedes trabajar gestionando proyectos agrícolas y ganaderos, como ingeniero de suelos y riegos, investigador en agrotecnología y sostenibilidad, consultor en producción de alimentos, y gerente de fincas y empresas del sector agropecuario.",
        imagen: "/images/ing-agric.jpg",
        video: "https://www.youtube.com/watch?v=75y9Lgt9Ld8&ab_channel=UCEVACOL",
    },
    electronica: {
        titulo: "Ingeniería Electrónica",
        descripcion:
            "Tu trabajo puede estar en la innovación de dispositivos inteligentes, en la automatización de procesos industriales, en el diseño de sistemas de telecomunicaciones o en proyectos de energías renovables. Podrás trabajar en empresas de tecnología, en la industria automotriz, en robótica o en investigación científica. Estarás en el corazón de la revolución tecnológica que está transformando al mundo.",
        imagen: "/images/ing-elec.jpg",
        video: "https://www.youtube.com/watch?v=buymwa4UdIM&ab_channel=UCEVACOL",
    },
    ambiental: {
        titulo: "Ingeniería Ambiental",
        descripcion:
            "Puedes trabajar como consultor en estudios de impacto ambiental, gestor de sistemas de tratamiento de agua y residuos, auditor ambiental en empresas e industrias, investigador en sostenibilidad, y planificador de proyectos de recuperación de ecosistemas.",
        imagen: "/images/ing-amb.jpg",
        video: "https://youtu.be/buymwa4UdIM?si=UNE9UOFOOVB39dOk",
    },
    industrial: {
        titulo: "Ingeniería Industrial",
        descripcion:
            "Como Ingeniero Industrial puedes trabajar optimizando procesos productivos y logísticos en cualquier industria, gerente de operaciones, analista de calidad y productividad, consultor en mejora continua (Lean, Six Sigma), y planificador de cadenas de suministro.",
        imagen: "/images/ing-indus.jpg",
        video: "https://www.youtube.com/watch?v=8FO1QPipT8Y&ab_channel=UCEVACOL",
    },
    biomedica: {
        titulo: "Ingeniería Biomédica",
        descripcion:
            "Puedes trabajar diseñando y manteniendo equipos médicos en hospitales, desarrollando prótesis y órganos artificiales, investigando en biotecnología, trabajando en control de calidad de dispositivos médicos y en la gestión de tecnología sanitaria.",
        imagen: "/images/ing-biom.jpg",
        video: "https://www.youtube.com/watch?v=oxfb0oxyanE&ab_channel=UCEVACOL",
    },
    viciles: {
        titulo: "Tecnología en Obras Civiles",
        descripcion:
            "Siendo Tecnólogo en Obras Civiles puedes trabajar como inspector, interventor o asistente de obra en construcción, topógrafo, dibujante CAD, auxiliar en el diseño de estructuras y vías, y supervisor de materiales y procesos constructivos.",
        imagen: "/images/ing-elec.jpg",
        video: "https://youtu.be/buymwa4UdIM?si=UNE9UOFOOVB39dOk",
    },
};

// Helper: convierte cualquier URL de YouTube en embed + params correctos
function toYouTubeEmbed(url: string): string | null {
    try {
        const u = new URL(url);
        let id = "";

        if (u.hostname.includes("youtube.com")) {
            if (u.pathname === "/watch") id = u.searchParams.get("v") ?? "";
            else if (u.pathname.startsWith("/shorts/")) id = u.pathname.split("/")[2] ?? "";
            else if (u.pathname.startsWith("/embed/")) id = u.pathname.split("/")[2] ?? "";
        } else if (u.hostname === "youtu.be") {
            id = u.pathname.slice(1);
        }

        if (!id) return null;

        return `https://www.youtube.com/embed/${id}?autoplay=1&playsinline=1&controls=1&rel=0&modestbranding=1`;
    } catch {
        return null;
    }
}

function crearModal(id: string) {
    const data = programas[id];
    if (!data) return;

    const modalRoot = document.getElementById("modal-root");
    if (!modalRoot) return;

    const youtubeEmbed = toYouTubeEmbed(data.video) ?? "";

    modalRoot.innerHTML = `
    <div id="overlay" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div id="modal-box" class="bg-gray-700 p-6 rounded-lg w-[90%] max-w-3xl h-[90%] relative overflow-y-auto">
        <button id="close-modal" class="absolute top-2 right-2 text-gray-300 hover:text-white text-xl">✖</button>

        <img src="${data.imagen}" alt="${data.titulo}"
             class="mb-4 rounded-lg w-full h-auto object-cover" loading="lazy" />

        <h2 class="text-2xl font-bold mb-4 text-white">${data.titulo}</h2>
        <p class="text-gray-200 leading-relaxed mb-6">${data.descripcion}</p>

        ${youtubeEmbed
            ? `
          <div class="w-full">
            <!-- Si NO usas el plugin aspect-ratio, esta capa igual no es necesaria -->
            <iframe
              src="${youtubeEmbed}"
              class="w-full h-64 md:h-80 rounded-lg pointer-events-auto"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              referrerpolicy="strict-origin-when-cross-origin">
            </iframe>
          </div>`
            : ""
        }
      </div>
    </div>
  `;

    const closeModal = () => {
        modalRoot.innerHTML = "";
    };

    // Cerrar con botón
    document.getElementById("close-modal")?.addEventListener("click", closeModal);

    // Evita que los clics dentro del modal cierren el overlay
    const modalBox = document.getElementById("modal-box");
    modalBox?.addEventListener("click", (e) => e.stopPropagation());

    // Cerrar solo si haces clic FUERA del modal
    const overlay = document.getElementById("overlay");
    overlay?.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
    });

    // (Opcional) Cerrar con ESC
    const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey, { once: true });
}

export function initModales() {
    const botones = document.querySelectorAll<HTMLButtonElement>(".btn-trabajo");
    botones.forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");
            if (id) crearModal(id);
        });
    });
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", initModales);
