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
        imagen: "/images/ing-sis.webp",
        video: "https://www.youtube.com/watch?v=5h45UFt4OZY&ab_channel=UCEVACOL",
    },
    agropecuaria: {
        titulo: "Ingeniería Agropecuaria",
        descripcion:
            "Puedes trabajar gestionando proyectos agrícolas y ganaderos, como ingeniero de suelos y riegos, investigador en agrotecnología y sostenibilidad, consultor en producción de alimentos, y gerente de fincas y empresas del sector agropecuario.",
        imagen: "/images/ing-agric.webp",
        video: "https://www.youtube.com/watch?v=75y9Lgt9Ld8&ab_channel=UCEVACOL",
    },
    electronica: {
        titulo: "Ingeniería Electrónica",
        descripcion:
            "Tu trabajo puede estar en la innovación de dispositivos inteligentes, en la automatización de procesos industriales, en el diseño de sistemas de telecomunicaciones o en proyectos de energías renovables. Podrás trabajar en empresas de tecnología, en la industria automotriz, en robótica o en investigación científica. Estarás en el corazón de la revolución tecnológica que está transformando al mundo.",
        imagen: "/images/ing-elec.webp",
        video: "https://www.youtube.com/watch?v=buymwa4UdIM&ab_channel=UCEVACOL",
    },
    ambiental: {
        titulo: "Ingeniería Ambiental",
        descripcion:
            "Puedes trabajar como consultor en estudios de impacto ambiental, gestor de sistemas de tratamiento de agua y residuos, auditor ambiental en empresas e industrias, investigador en sostenibilidad, y planificador de proyectos de recuperación de ecosistemas.",
        imagen: "/images/ing-amb.webp",
        video: "https://www.youtube.com/watch?v=JHmnI0jSoGk&ab_channel=UCEVACOL",
    },
    industrial: {
        titulo: "Ingeniería Industrial",
        descripcion:
            "Como Ingeniero Industrial puedes trabajar optimizando procesos productivos y logísticos en cualquier industria, gerente de operaciones, analista de calidad y productividad, consultor en mejora continua (Lean, Six Sigma), y planificador de cadenas de suministro.",
        imagen: "/images/ing-indus.webp",
        video: "https://www.youtube.com/watch?v=8FO1QPipT8Y&ab_channel=UCEVACOL",
    },
    biomedica: {
        titulo: "Ingeniería Biomédica",
        descripcion:
            "Puedes trabajar diseñando y manteniendo equipos médicos en hospitales, desarrollando prótesis y órganos artificiales, investigando en biotecnología, trabajando en control de calidad de dispositivos médicos y en la gestión de tecnología sanitaria.",
        imagen: "/images/ing-biom.webp",
        video: "https://www.youtube.com/watch?v=oxfb0oxyanE&ab_channel=UCEVACOL",
    },
    civiles: {
        titulo: "Tecnología en Obras Civiles",
        descripcion:
            "Siendo Tecnólogo en Obras Civiles puedes trabajar como inspector, interventor o asistente de obra en construcción, topógrafo, dibujante CAD, auxiliar en el diseño de estructuras y vías, y supervisor de materiales y procesos constructivos.",
        imagen: "/images/obras-civiles.webp",
        video: "https://www.youtube.com/watch?v=bY81qBxzJeA&ab_channel=BuscandoCarrera",
    },
    transmedia: {
        titulo: "Comunicación Transmedia",
        descripcion:
            "Como Tecnólogo en Comunicación Transmedia puedes trabajar como creador de contenido para múltiples plataformas (redes sociales, web, TV), estratega de comunicación digital, community manager, productor multimedia, guionista, y director de proyectos narrativos interactivos y crossmedia.",
        imagen: "/images/com-trans.webp",
        video: "https://www.youtube.com/watch?v=xkBQzEkBXZ8&ab_channel=ComplotEscueladeCreatividad",
    },
    derecho: {
        titulo: "Derecho",
        descripcion:
            "Puedes trabajar como abogado litigante en diversas áreas (penal, civil, laboral, etc.), juez, fiscal, notario, asesor jurídico en empresas privadas o entidades públicas, conciliador, y consultor en compliance y derecho corporativo.",
        imagen: "/images/derecho.webp",
        video: "https://www.youtube.com/watch?v=43hANWmDCes&ab_channel=EdgarReina2",
    },
    psicologia: {
        titulo: "Psicología",
        descripcion:
            "Puedes trabajar como psicólogo clínico en consulta privada o instituciones de salud, psicólogo organizacional en departamentos de recursos humanos, investigador, orientador escolar y familiar, y intervencionista en comunidades y proyectos sociales.",
        imagen: "/images/psicologia.webp",
        video: "https://www.youtube.com/watch?v=HyRxnKPZXHU&ab_channel=UCEVACOL",
    },
    empresas: {
        titulo: "Administración de Empresas",
        descripcion:
            "Puedes trabajar como gerente, director o jefe en áreas como finanzas, marketing, operaciones o recursos humanos en cualquier tipo de empresa, emprendedor con tu propio negocio, consultor empresarial, y analista de mercado.",
        imagen: "/images/admin-empresas.webp",
        video: "https://www.youtube.com/watch?v=ldJ8vvRKax8&ab_channel=GabiRandom",
    },
    adminsalud: {
        titulo: "Administración de Servicios de Salud",
        descripcion:
            "Puedes trabajar como administrador o gerente de hospitales, clínicas y EPS, auditor de servicios de salud, gestor de calidad en instituciones médicas, y planificador de proyectos para optimizar la prestación de servicios de salud.",
        imagen: "/images/servicios-salud.webp",
        video: "https://www.youtube.com/watch?v=jM0wIMeErz4&ab_channel=UCEVACOL",
    },
    contaduria: {
        titulo: "Contaduría Pública",
        descripcion:
            "Puedes trabajar como contador público en firmas de auditoría, controller financiero en empresas, revisor fiscal, auditor interno o externo, asesor tributario, y consultor independiente en normatividad contable y financiera.",
        imagen: "/images/cont-publica.webp",
        video: "https://www.youtube.com/watch?v=-b3TTPdzB-s&ab_channel=UCEVACOL",
    },
    comercio: {
        titulo: "Comercio Internacional",
        descripcion:
            "Puedes trabajar como gestor de importaciones y exportaciones en empresas multinacionales, agente de aduanas, analista de mercados internacionales, consultor en logística y supply chain, y representante comercial en el ámbito global.",
        imagen: "/images/comercio.webp",
        video: "https://www.youtube.com/watch?v=URlQDhYTq6U&ab_channel=UCEVACOL",
    },
    medicina: {
        titulo: "Medicina",
        descripcion:
            "Puedes trabajar como médico general en hospitales, clínicas o consultorios privados, médico investigador, salubrista público, médico ocupacional en empresas, y especializarte en una de las múltiples áreas de la medicina.",
        imagen: "/images/medicina.webp",
        video: "https://www.youtube.com/watch?v=Cj26b1CRTIg&pp=ygUScXVlIGVzIGxhIG1lZGljaW5h",
    },
    enfermeria: {
        titulo: "Enfermería",
        descripcion:
            "Puedes trabajar como enfermero/a en hospitales y clínicas, coordinador de servicios de enfermería, cuidador domiciliario, investigador en salud pública, educador comunitario en prevención de enfermedades, y en enfermería ocupacional.",
        imagen: "/images/enfermeria.webp",
        video: "https://www.youtube.com/watch?v=NAuTQG_GMno&ab_channel=UCEVACOL",
    },
    premedico: {
        titulo: "Curso Premédico",
        descripcion:
            "Puedes trabajar como médico general en hospitales, clínicas o consultorios privados, médico investigador, salubrista público, médico ocupacional en empresas, y especializarte en una de las múltiples áreas de la medicina.",
        imagen: "/images/medicina.webp",
        video: "https://www.youtube.com/watch?v=0gHQ4asqzGM&ab_channel=CentrodeConsultor%C3%ADayEducaci%C3%B3nContinuaJaverianaCali",
    },
    fisica: {
        titulo: "Licenciatura en Educación Física, Recreación y Deporte.",
        descripcion:
            "Puedes trabajar como profesor de educación física en colegios y universidades, director de escuelas deportivas, entrenador personal, coordinador de programas de recreación en entidades públicas o privadas, y gestor de eventos deportivos y de wellness corporativo.",
        imagen: "/images/fisica.webp",
        video: "https://www.youtube.com/watch?v=C1MotxK5rnY&ab_channel=DatoCurioso-Universidades",
    },
    infantil: {
        titulo: "Licenciatura en Educación Infantil.",
        descripcion:
            "Puedes trabajar como docente en jardines infantiles y preescolares, director de instituciones de educación inicial, diseñador de material pedagógico y lúdico, investigador en desarrollo infantil, y creador de programas educativos para la primera infancia.",
        imagen: "/images/infantil.webp",
        video: "https://www.youtube.com/watch?v=PRkOA5knF74&ab_channel=UCEVACOL",
    },
    lenguas: {
        titulo: "Licenciatura en Lenguas Extranjeras con Énfasis en Inglés.",
        descripcion:
            "Puedes trabajar como docente de inglés en instituciones educativas de todos los niveles, traductor o intérprete, gestor cultural en entidades gubernamentales o internacionales, editor o corrector de estilo para publicaciones, y asesor en empresas que requieran comunicación intercultural y bilingüe.",
        imagen: "/images/idiomas.webp",
        video: "https://www.youtube.com/watch?v=2QHQ6DXzznI&ab_channel=UCEVACOL",
    },
    sociales: {
        titulo: "Licenciatura en Ciencias Sociales",
        descripcion:
            "Puedes trabajar como investigador social en ONGs o centros de estudio, analista de políticas públicas, docente en colegios y universidades, consultor en proyectos de desarrollo comunitario, y asesor en entidades gubernamentales enfocadas en cultura, educación o juventud.",
        imagen: "/images/sociales.webp",
        video: "https://www.youtube.com/watch?v=ldX2qg1i8wc&ab_channel=UCEVACOL",
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
