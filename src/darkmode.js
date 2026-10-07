// src/darkmode.js

// Función para alternar dark mode
function toggleDarkMode() {
  const html = document.documentElement;
  
  if (html.classList.contains('dark')) {
    // Cambiar a modo claro
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    // Cambiar a modo oscuro
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
  
  // Actualizar botones si existen
  updateToggleButtons();
}

// Función para establecer modo específico
function setDarkMode(isDark) {
  const html = document.documentElement;
  
  if (isDark) {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
  
  updateToggleButtons();
}

// Función para verificar si está en modo oscuro
function isDarkMode() {
  return document.documentElement.classList.contains('dark');
}

// Función para obtener el tema actual
function getCurrentTheme() {
  return isDarkMode() ? 'dark' : 'light';
}

// Función para actualizar la apariencia de botones toggle
function updateToggleButtons() {
  const toggleButtons = document.querySelectorAll('[data-toggle="dark"]');
  const isDark = isDarkMode();
  
  toggleButtons.forEach(button => {
    // Actualizar texto si es un botón de texto
    if (button.textContent.includes('☀️') || button.textContent.includes('🌙')) {
      button.textContent = isDark ? '☀️ Claro' : '🌙 Oscuro';
    }
    
    // Actualizar aria-label para accesibilidad
    button.setAttribute('aria-label', 
      isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
    );
  });
}

// Función para crear un botón toggle automáticamente
function createToggleButton(container, options = {}) {
  const defaultOptions = {
    text: true,
    icon: true,
    classes: 'px-4 py-2 rounded-lg transition-colors bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
  };
  
  const opts = { ...defaultOptions, ...options };
  
  const button = document.createElement('button');
  button.setAttribute('data-toggle', 'dark');
  button.className = opts.classes;
  
  // Contenido del botón
  let content = '';
  if (opts.icon) content += isDarkMode() ? '☀️' : '🌙';
  if (opts.text) content += isDarkMode() ? ' Claro' : ' Oscuro';
  
  button.innerHTML = content.trim();
  button.setAttribute('aria-label', 
    isDarkMode() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
  );
  
  // Event listener
  button.addEventListener('click', toggleDarkMode);
  
  // Agregar al contenedor
  if (typeof container === 'string') {
    document.getElementById(container)?.appendChild(button);
  } else {
    container.appendChild(button);
  }
  
  return button;
}

// Inicializar cuando el DOM esté listo
function initDarkMode() {
  // Actualizar botones existentes
  updateToggleButtons();
  
  // Agregar event listeners a botones con data-toggle="dark"
  document.querySelectorAll('[data-toggle="dark"]').forEach(button => {
    button.addEventListener('click', toggleDarkMode);
  });
  
  // Escuchar cambios en preferencia del sistema (opcional)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Solo aplicar si no hay preferencia guardada
    if (!localStorage.getItem('theme')) {
      setDarkMode(e.matches);
    }
  });
  
  console.log('Dark Mode iniciado:', getCurrentTheme());
}

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDarkMode);
} else {
  initDarkMode();
}

// Exportar funciones para uso global
window.toggleDarkMode = toggleDarkMode;
window.setDarkMode = setDarkMode;
window.isDarkMode = isDarkMode;
window.getCurrentTheme = getCurrentTheme;
window.createToggleButton = createToggleButton;