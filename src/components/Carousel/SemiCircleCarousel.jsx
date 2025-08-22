import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Imágenes
import clouds1 from "./images-carrousel/clouds1.png";
import clouds2 from "./images-carrousel/clouds2.png";
import lunacreciente1 from "./images-carrousel/lunacreciente1.png";
import lunacreciente2 from "./images-carrousel/lunacreciente2.png";
import star1 from "./images-carrousel/star1.png";
import star2 from "./images-carrousel/star2.png";
import lunallena from "./images-carrousel/lunallena.png";
import lunanueva from "./images-carrousel/lunanueva.png";

// helpers SVG
function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return ["M", start.x, start.y, "A", r, r, 0, largeArcFlag, 0, end.x, end.y].join(" ");
}

export default function SemiCircleCarousel() {
  const photos = [
    lunanueva, clouds1, lunacreciente1, star1, lunallena,
    clouds2, lunacreciente2, star2, lunanueva, star2,
  ];
  const count = photos.length;
  
  const navigate = useNavigate();

  // Contenedor medido para responsive
  const contRef = useRef(null);
  const [w, setW] = useState(800);

  useEffect(() => {
    const medir = () => {
      if (contRef.current) setW(contRef.current.clientWidth);
    };
    medir();

    // ResizeObserver para cambios de layout
    let ro;
    if (typeof ResizeObserver !== "undefined" && contRef.current) {
      ro = new ResizeObserver(medir);
      ro.observe(contRef.current);
    }
    // Fallback/extra: resize de ventana
    window.addEventListener("resize", medir);

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", medir);
    };
  }, []);

  // ----------------- PARÁMETROS (derivados de w) -----------------
  const padding = 12;
  // Radio clamped según ancho disponible
  const R = Math.max(160, Math.min(520, w / 2 - padding));
  const cx = R, cy = R;

  // Grosor del arco según tamaño
  const stroke = R < 220 ? 3 : R < 360 ? 4 : 6;

  // Tamaño de cada ítem (diámetro del wrapper) - más grande para evitar cortes
  const item = Math.max(70, Math.min(130, Math.floor(w / 8)));

  // arco visible superior (para el PATH del SVG)
  const svgStart = 270; // izquierda
  const svgEnd = 90;    // derecha

  // separación base entre imágenes (loop continuo perfecto)
  const spacing = count > 0 ? 180 / count : 0;

  // animación continua (respeta prefers-reduced-motion)
  const [angleOffset, setAngleOffset] = useState(0);
  const rafRef = useRef(0);
  const lastRef = useRef(0);
  const reduceMotion = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduceMotion) return; // no animar si el usuario lo prefiere
    const speedDegPerSec = 12; // velocidad continua (grados/seg)

    const loop = (t) => {
      if (!lastRef.current) lastRef.current = t;
      let dt = (t - lastRef.current) / 1000;
      lastRef.current = t;
      if (dt > 0.05) dt = 0.05; // evita saltos al volver de pestaña
      setAngleOffset((a) => (a + speedDegPerSec * dt) % 360); // mantiene valores acotados
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reduceMotion]);

  // radio exacto para que los centros de las imágenes estén sobre la línea del arco
  const rImgs = R;

  // cantidad de elementos a pintar (copia extra al final para cubrir el borde derecho)
  const total = count + 1;

  // Estado formulario
  const [nombre, setNombre] = useState("");

  const goToOptions = () => {
    if (nombre.trim() !== "") {
      navigate(`/options/${nombre.trim()}`);
    }
  };

  // Calcular altura del contenedor incluyendo espacio extra para las fotos
  const containerHeight = R + Math.max(item / 2, 40);

  return (
    <div className="min-h-screen w-full text-white">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Zona del arco */}
        <div ref={contRef} className="relative w-full">
          {/* Altura aumentada para no cortar las fotos */}
          <div className="relative" style={{ height: containerHeight }}>
            {/* arco superior */}
            <svg
              className="absolute left-1/2 -translate-x-1/2 top-0"
              viewBox={`0 0 ${R * 2} ${R}`}
              width={R * 2}
              height={R}
              aria-hidden="true"
            >
              <path
                d={describeArc(cx, cy, R, svgStart, svgEnd)}
                fill="none"
              
                strokeWidth={stroke}
                strokeLinecap="butt"
              />
            </svg>

            {/* imágenes moviéndose de forma continua en 180° → 0°, con copia extra */}
            <div className="absolute inset-0">
              {Array.from({ length: total }).map((_, i) => {
                const src = photos[i % count];
                const vis = ((i * spacing + angleOffset) % 180 + 180) % 180; // 0..179
                const deg = 180 - vis;
                const rad = (deg * Math.PI) / 180;

                const x = cx + rImgs * Math.cos(rad);
                const y = cy - rImgs * Math.sin(rad);

                let opacity = 1;
                if (vis < 20) {
                  opacity = vis / 20; // 0 a 1
                } else if (vis > 160) {
                  opacity = (180 - vis) / 20; // 1 a 0
                }

                const pointerEvents = opacity < 0.1 ? "none" : "auto";
                return (
                  <div
                    key={`${i}-${src}`}
                    className="absolute flex items-center justify-center pointer-events-none select-none"
                    style={{
                      left: x,
                      top: y,
                      width: item,
                      height: item,
                      transform: "translate(-50%, -50%)",
                      zIndex: 10,
                      opacity,
                      pointerEvents,
                    }}
                    aria-hidden={opacity < 0.1}
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-contain drop-shadow-lg"
                      draggable={false}
                    />
                  </div>
                );
              })}
            </div>

            {/* texto dentro del arco - MEJOR SEPARACIÓN RESPONSIVE */}
            <div
              className="absolute left-0 right-0 text-center px-3 sm:px-6"
              style={{ 
                top: Math.max(
                  // Móvil: más separación del arco
                  w < 640 ? R * 0.55 : 
                  // Tablet: separación media
                  w < 1024 ? R * 0.50 : 
                  // Desktop: separación menor
                  R * 0.45,
                  // Mínimo absoluto
                  36
                ),
                zIndex: 5
              }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
                🔮 ¿Quieres aprender del horóscopo?
              </h2>
              <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl mt-1">
                Aprende con nosotras
              </p>
              <hr className="mt-3 border border-white/30 rounded-full w-11/12 sm:w-3/4 md:w-[600px] mx-auto" />
            </div>
          </div>

          {/* Formulario con mejor separación */}
          <div
            className="
              w-full max-w-xl mx-auto
              rounded-2xl
              p-4 sm:p-6 md:p-8
              text-center bg-[#DCC6A5]
            "
            style={{
              marginTop: w < 640 ? '3rem' : w < 1024 ? '4rem' : '5rem'
            }}
            role="form"
            aria-label="Formulario de acceso por nombre"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
              Ingresa tu nombre
            </h3>

            <label htmlFor="nombre" className="sr-only">
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Coloca tu nombre"
              className="
                mt-3 w-full h-11 sm:h-12
                rounded-md
                bg-white text-slate-900
                placeholder-slate-500
                px-4 outline-none
                ring-1 ring-slate-300 focus:ring-2 focus:ring-red-500
                transition
              "
            />

            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={goToOptions}
                disabled={!nombre.trim()}
                className="
                  inline-flex items-center justify-center
                  px-5 sm:px-6 h-11 sm:h-12
                  rounded-xl text-white
                  bg-red-500 disabled:bg-red-400
                  shadow-lg transition
                  hover:scale-[1.03] hover:-translate-y-0.5 hover:shadow-2xl
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500
                "
                aria-disabled={!nombre.trim()}
              >
                Entrar
              </button>
            </div>

            <p className="mt-3 text-sm text-slate-600">
              Escribe tu nombre para continuar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}