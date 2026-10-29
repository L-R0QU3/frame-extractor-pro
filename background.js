// 1. REGISTRO DEL MENÚ
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "extract-element-pro-max",
      title: "Abrir marco (Modo Enfoque Nativo)",
      contexts: ["all"] 
    });
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "extract-element-pro-max") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: isolateInPlaceWithoutMoving // <-- La corrección clave para Firefox
    }).catch(err => console.error("Frame Extractor Pro - Error de inyección:", err));
  }
});

// 2. MOTOR DE AISLAMIENTO IN-PLACE CON UI PREMIUM
function isolateInPlaceWithoutMoving() {
  // Evitar ejecuciones duplicadas
  if (document.getElementById('extractor-pro-btn')) return;

  // Buscar el video o iframe activo
  let mediaElement = document.querySelector('video') || document.querySelector('iframe');
  if (!mediaElement) {
    alert("Frame Extractor: No se encontró un reproductor de video en esta página.");
    return;
  }

  // Comportamiento Firefox para Iframes puros
  if (mediaElement.tagName.toLowerCase() === 'iframe' && mediaElement.src) {
    window.open(mediaElement.src, '_blank');
    return;
  }

  // Identificar el contenedor principal del reproductor (UI)
  const wrapper = mediaElement.closest('.video-js, [class*="player"], [class*="video-wrapper"], [id*="player"], figure');
  const playerContainer = wrapper || mediaElement.parentElement;

  // 1. GUARDAR ESTADOS DE LA PÁGINA
  const originalState = {
    containerCss: playerContainer.style.cssText,
    videoCss: mediaElement.style.cssText,
    bodyOverflow: document.body.style.overflow,
    ancestors: []
  };

  // 2. ROMPER EL STACKING CONTEXT DE LOS PADRES (Para evitar pantalla negra)
  let currentParent = playerContainer.parentElement;
  while (currentParent && currentParent !== document.documentElement) {
    originalState.ancestors.push({
      element: currentParent,
      cssText: currentParent.style.cssText
    });
    
    currentParent.style.setProperty('overflow', 'visible', 'important');
    currentParent.style.setProperty('z-index', '2147483646', 'important');
    currentParent.style.setProperty('transform', 'none', 'important');
    currentParent.style.setProperty('clip-path', 'none', 'important');
    currentParent.style.setProperty('opacity', '1', 'important');
    
    currentParent = currentParent.parentElement;
  }

  // Bloquear el scroll de la página de fondo
  document.body.style.setProperty('overflow', 'hidden', 'important');

  // 3. CREAR ENTORNO VISUAL (Fondo oscuro suave)
  const backdrop = document.createElement('div');
  backdrop.id = 'extractor-pro-backdrop';
  backdrop.style.cssText = 'position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; background-color: rgba(0, 0, 0, 0.95) !important; z-index: 2147483645 !important; opacity: 0 !important; transition: opacity 0.4s ease !important;';
  document.body.appendChild(backdrop);

  // 4. CREAR BOTÓN DE CIERRE (Diseño Glassmorphism + Ghost Button)
  const closeBtn = document.createElement('button');
  closeBtn.id = 'extractor-pro-btn';
  closeBtn.innerText = '✕ Volver a la página original';
  closeBtn.style.cssText = `
    position: fixed !important; 
    top: 25px !important; 
    right: 30px !important; 
    z-index: 2147483647 !important; 
    padding: 10px 24px !important; 
    font-size: 14px !important; 
    cursor: pointer !important; 
    background-color: rgba(20, 20, 20, 0.6) !important; 
    color: #eaeaea !important; 
    border: 1px solid rgba(255, 255, 255, 0.15) !important; 
    border-radius: 50px !important; 
    font-family: system-ui, -apple-system, sans-serif !important; 
    font-weight: 500 !important; 
    backdrop-filter: blur(10px) !important; 
    -webkit-backdrop-filter: blur(10px) !important; 
    box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important; 
    transition: all 0.4s ease !important; 
    opacity: 0 !important;
  `;

  // Animaciones Hover: Brilla al 100% al pasar el cursor
  closeBtn.onmouseover = () => {
    closeBtn.style.setProperty('opacity', '1', 'important');
    closeBtn.style.setProperty('background-color', 'rgba(30, 30, 30, 0.9)', 'important');
    closeBtn.style.setProperty('color', '#ffffff', 'important');
    closeBtn.style.setProperty('border', '1px solid rgba(255, 255, 255, 0.4)', 'important');
    closeBtn.style.setProperty('transform', 'scale(1.05)', 'important');
  };
  
  // Vuelve a esconderse de forma transparente al quitar el cursor
  closeBtn.onmouseout = () => {
    closeBtn.style.setProperty('opacity', '0.15', 'important'); 
    closeBtn.style.setProperty('background-color', 'rgba(20, 20, 20, 0.6)', 'important');
    closeBtn.style.setProperty('color', '#eaeaea', 'important');
    closeBtn.style.setProperty('border', '1px solid rgba(255, 255, 255, 0.15)', 'important');
    closeBtn.style.setProperty('transform', 'scale(1)', 'important');
  };

  document.body.appendChild(closeBtn);

  // Gatillar el Fade-In inicial y la lógica de ocultamiento automático
  setTimeout(() => {
    backdrop.style.setProperty('opacity', '1', 'important');
    closeBtn.style.setProperty('opacity', '1', 'important'); 
    
    // Después de 2.5 segundos, desvanecer a modo "Fantasma" si el cursor no está encima
    setTimeout(() => {
      if (!closeBtn.matches(':hover')) {
        closeBtn.style.setProperty('opacity', '0.15', 'important');
      }
    }, 2500);
  }, 10);

  // 5. MAXIMIZAR EL REPRODUCTOR
  playerContainer.style.setProperty('position', 'fixed', 'important');
  playerContainer.style.setProperty('top', '0', 'important');
  playerContainer.style.setProperty('left', '0', 'important');
  playerContainer.style.setProperty('width', '100vw', 'important');
  playerContainer.style.setProperty('height', '100vh', 'important');
  playerContainer.style.setProperty('max-width', '100vw', 'important');
  playerContainer.style.setProperty('max-height', '100vh', 'important');
  playerContainer.style.setProperty('z-index', '2147483646', 'important'); 
  playerContainer.style.setProperty('margin', '0', 'important');
  
  mediaElement.style.setProperty('width', '100%', 'important');
  mediaElement.style.setProperty('height', '100%', 'important');
  mediaElement.style.setProperty('max-width', '100%', 'important');
  mediaElement.style.setProperty('max-height', '100%', 'important');
  mediaElement.style.setProperty('object-fit', 'contain', 'important');

  // 6. EVENTO DE RESTAURACIÓN CON FADE-OUT
  closeBtn.onclick = () => {
    // Animación de salida
    backdrop.style.setProperty('opacity', '0', 'important');
    closeBtn.style.setProperty('opacity', '0', 'important');
    
    setTimeout(() => {
      // Restaurar contenedor y video
      playerContainer.style.cssText = originalState.containerCss;
      mediaElement.style.cssText = originalState.videoCss;
      document.body.style.overflow = originalState.bodyOverflow;
      
      // Restaurar ancestros
      originalState.ancestors.forEach(ancestor => {
        ancestor.element.style.cssText = ancestor.cssText;
      });
      
      backdrop.remove();
      closeBtn.remove();
    }, 300); // Espera a que termine la transición de CSS
  };
}