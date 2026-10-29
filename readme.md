# 🖼️ Frame Extractor Pro

![Version](https://img.shields.io/badge/version-3.0.0-blue.svg)
![Manifest](https://img.shields.io/badge/Manifest-V3-success.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

Una extensión de navegador moderna y de grado profesional que permite aislar cualquier reproductor de video (`<video>`) o marco incrustado (`<iframe>`) en un "Modo Enfoque" inmersivo, sin romper la arquitectura de la página original ni desconectar los eventos del Virtual DOM (React, Angular, Vue).

## 🚀 Características Principales

*   **Aislamiento *In-Place*:** A diferencia de otras extensiones, esta herramienta no mueve ni extrae los nodos HTML de su lugar original. Utiliza inyección de CSS dinámico para evadir las restricciones de la página, manteniendo intactos los controles personalizados y los flujos de video (Blobs/HLS).
*   **Bypass de Stacking Context:** Implementa un algoritmo de escalado del DOM que neutraliza las propiedades restrictivas (`overflow`, `z-index`, `transform`) de todos los ancestros del reproductor para evitar problemas de capas o pantallas negras.
*   **Interfaz Premium (UI/UX):** Incorpora un botón de salida con diseño *Glassmorphism* (cristal esmerilado) y comportamiento *Ghost Button* (se desvanece de forma inteligente para no interrumpir la experiencia de visualización).
*   **Compatibilidad Universal:** Diseñado bajo el estándar Manifest V3, 100% compatible con navegadores Chromium (Google Chrome, Edge, Brave, Opera) y preparado para Firefox.

## 🛠️ Instalación (Modo Desarrollador)

Para probar e instalar esta extensión localmente en tu navegador basado en Chromium:

1. Clona este repositorio o descarga el código fuente:
   ```bash
   git clone https://github.com/L-R0QU3/frame-extractor-pro.git
   ```
2. Abre tu navegador y dirígete a la página de extensiones:
   * Chrome/Brave: `chrome://extensions/`
   * Edge: `edge://extensions/`
3. Activa el **"Modo de desarrollador"** (interruptor en la esquina superior derecha).
4. Haz clic en **"Cargar descomprimida"** (Load unpacked) y selecciona la carpeta de este proyecto.

## 💡 Modo de Uso

1. Navega a cualquier página web que contenga un video o un iframe (ej. plataformas de streaming, YouTube incrustado).
2. Haz **clic derecho** sobre el área del reproductor.
3. Selecciona la opción **"Abrir marco (Modo Enfoque Nativo)"** en el menú contextual.
4. Para regresar a la vista normal, mueve el cursor por la pantalla y haz clic en el botón superior derecho **"✕ Volver a la página original"**.

*Nota: Si la página bloquea el clic derecho de forma nativa, mantén presionada la tecla `Shift` mientras haces clic derecho para forzar la aparición del menú.*

## 📂 Estructura del Proyecto

```text
frame-extractor-pro/
├── manifest.json       # Archivo de configuración principal (Manifest V3)
├── background.js       # Service Worker: Lógica de menús y motor de inyección de scripts
├── icon16.png          # Favicon e ícono de menú contextual
├── icon48.png          # Ícono del gestor de extensiones
├── icon128.png         # Ícono de alta resolución para la Web Store
└── README.md           # Documentación del proyecto
```

## 👨‍💻 Autor

**Luis Diego Roque Moya**
*   Full Stack Software Developer & Analista de Sistemas
*   GitHub: [@L-R0QU3](https://github.com/L-R0QU3)
*   Portafolio: [www.luisroque.cl](http://www.luisroque.cl)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Eres libre de utilizar, modificar y distribuir este código.