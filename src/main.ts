import './style.css'

const buscador = document.getElementById('buscador') as HTMLInputElement
const tarjetas = document.querySelectorAll('.tarjeta')

buscador?.addEventListener('input', () => {
  const texto = buscador.value.toLowerCase()

  tarjetas.forEach(tarjeta => {
    const contenido = tarjeta.textContent?.toLowerCase() || ''
    if (contenido.includes(texto)) {
      (tarjeta as HTMLElement).style.display = 'block'
    } else {
      (tarjeta as HTMLElement).style.display = 'none'
    }
  })
})

const menuToggle = document.getElementById('menu-toggle')
const menu = document.getElementById('menu')

menuToggle?.addEventListener('click', () => {
  menu?.classList.toggle('hidden')
})

