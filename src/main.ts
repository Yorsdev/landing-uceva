import './style.css'

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



const menuToggle = document.getElementById('menu-toggle')
const menu = document.getElementById('menu')

menuToggle?.addEventListener('click', () => {
  menu?.classList.toggle('hidden')
})

