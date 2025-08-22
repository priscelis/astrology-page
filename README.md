# 🔮 Astrology Cards  
Aplicación web interactiva para explorar cartas de astrología y realizar lecturas de **Pasado · Presente · Futuro**.  
Un proyecto educativo y místico que combina diseño moderno con una experiencia inmersiva para descubrir el simbolismo de cada arcano y su diosa protectora.  

---

## 🌙 Descripción  

Una aplicación sencilla e intuitiva que acerca al usuario al mundo de las cartas de astrología.  
Cada carta contiene dos aspectos fundamentales:  

✨ **El Arcano**: con su imagen, número, nombre y descripción.  
🌸 **La Diosa**: con su representación en la actualidad.   

El usuario puede explorar la galería completa o realizar una lectura de tres cartas (Pasado, Presente y Futuro).  

---

## ⚡ Características  

- 🌐 **Navbar** reutilizable con navegación entre secciones (Home, Todas las cartas, Lectura).  
- 🃏 **SeeOneCard**: vista detallada de una carta con información del Arcano y su Diosa.  
- 🔮 **SeeThreeCards**: experiencia de lectura seleccionando 3 cartas para Pasado, Presente y Futuro.  
- 📦 **AllCards**: galería de todas las cartas disponibles.  
- 🖼️ Imágenes con estilos modernos (bordes redondeados, sombras, hover effects).  
- 🎭 Estados de carga, error y “no existe” con mensajes amigables.  
- 🌀 Animaciones de carga con spinners y transiciones suaves.  
- 🛠️ Sistema de reutilización de componentes (Header, Footer, Layout).  
- 🌈 Gradientes personalizados con **Tailwind CSS**.  

---

## 🎨 Diseño  

El diseño está enfocado en un estilo **místico y elegante**, con efectos de blur y transparencias que evocan un aura mágica.  

### 🎨 Paleta de colores  
 🟤 **Marron Expresso* `#D6AC71`  y **Marron oscuro**— Estos dos colores se utilizaron para el body de la pagina. 
🤍 **Blanco** `#FFFFFF` — Para el 90% de la pagina. 
 🔵**Gradientes translúcidos** `#243851`— Color de las cartas, y para resaltar nombres importantes.   

### ✍️ Tipografía  
- Fuente limpia y moderna (Sans-serif).  
- Títulos con gradientes para dar un efecto etéreo.  

---

## 🛠️ Tech Stack  

- **React** — biblioteca principal para UI  
- **React Router DOM** — navegación entre vistas  
- **Vite** — build rápido y optimizado  
- **Tailwind CSS** — estilos utilitarios y modernos  
- **MockAPI** — backend simulado para las cartas y sus datos  
- **Node.js & npm** — entorno de ejecución  

---

## ⚙️ Instalación  

### 📋 Prerrequisitos  
- Node.js v16+  
- npm  

### 🔧 Setup  

```bash
git clone https://github.com/TU_USUARIO/astrology-cards.git
cd astrology-cards
npm install

npm run dev     # iniciar app React en http://localhost:5173
```

### 🗂️ Estructura de archivos
```
/public              # assets estáticos
/src
  ├── /components    # Header, Navbar, etc.
      ├── /Carousel   # Para guardar cualquier foto que este dentro del carrusel tipo semi circulo 
      ├── /Header     # Para guardar imagenes relacionado al header
  ├── /images       # imágenes de las cartas
  ├── /Layout       # Estructura base
  ├── /pages         # AllCards, SeeOneCard, SeeThreeCards
  ├── /services      # funciones para llamadas a la API (AstroServices)
  ├── index.css     # Con el Tailwind CSS importado
  └── main.jsx       # punto de entrada

```
---
## ✨ Para el futuro ¿Que tendria que mejorar de mi trabajo ?

- 📱 Acomodar mucho mejor el **responsive del semicírculo** en el carrusel.
- 🛠️ Mejorar la estética de la pagina.
- 🔄 Haber incluido tests para estar segura de que todo funcionara correctamente 

