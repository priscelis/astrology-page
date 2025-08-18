import { useEffect, useRef, useState } from "react";
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

  const contRef = useRef(null);
  const [w, setW] = useState(800); // valor inicial para preview

  // medir ancho responsive
  useEffect(() => {
    const medir = () => setW(contRef.current?.clientWidth ?? 800);
    medir();
    const ro = new ResizeObserver(medir);
    if (contRef.current) ro.observe(contRef.current);
    window.addEventListener("resize", medir);
    return () => { ro.disconnect(); window.removeEventListener("resize", medir); };
  }, []);

  // ----------------- PARÁMETROS -----------------
  const stroke = 6;          // grosor de la línea del arco
  const padding = 10;
  const item = 100;           // diámetro del wrapper circular
  const ring = 1;            // grosor del borde del wrapper (1px porque usamos "border")
  const speedDegPerSec = 12; // velocidad continua (grados/seg)

  // radio y centro
  const R = Math.max(220, Math.min(600, w / 2 - padding));
  const cx = R, cy = R;

  // arco visible superior (para el PATH del SVG)
  const svgStart = 270; // izquierda
  const svgEnd = 90;    // derecha

  // separación base entre imágenes (loop continuo perfecto)
  const spacing = count > 0 ? 180 / count : 0;

  // ----------------- ANIMACIÓN CONTINUA -----------------
  const [angleOffset, setAngleOffset] = useState(0);
  const rafRef = useRef(0);
  const lastRef = useRef(0);

  useEffect(() => {
    const loop = (t) => {
      if (!lastRef.current) lastRef.current = t;
      let dt = (t - lastRef.current) / 1000;
      lastRef.current = t;
      if (dt > 0.05) dt = 0.05;               // evita saltos al volver de pestaña
      setAngleOffset((a) => a + speedDegPerSec * dt);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // 🔧 CORRECCIÓN: Radio exacto para que los centros de las imágenes estén sobre la línea del arco
  const rImgs = R; // Los centros de las imágenes van exactamente sobre la línea del arco

  // cantidad de elementos a pintar (copia extra al final para cubrir el borde derecho)
  const total = count + 1;

  return (
    <div className="w-full flex justify-center min-h-screen">
      <div ref={contRef} className="relative w-[92vw] max-w-[1100px]">
        {/* altura = R -> solo se ve la mitad superior */}
        <div className="relative overflow-hidden" style={{ height: R }}>
          {/* arco superior */}
          <svg
            className="absolute left-1/2 -translate-x-1/2 top-0"
            viewBox={`0 0 ${R * 2} ${R}`}
            width={R * 2}
            height={R}
          >
            <path
              d={describeArc(cx, cy, R, svgStart, svgEnd)}
              fill="none"
              stroke="black"
              strokeWidth={stroke}
              strokeLinecap="butt"
            />
          </svg>

          {/* imágenes moviéndose de forma CONTINUA en 180° → 0°, con copia extra */}
          <div className="absolute inset-0">
            {Array.from({ length: total }).map((_, i) => {
              const src = photos[i % count];
              const vis = ((i * spacing + angleOffset) % 180 + 180) % 180;
              const deg = 180 - vis;
              const rad = (deg * Math.PI) / 180;

              const x = cx + rImgs * Math.cos(rad);
              const y = cy - rImgs * Math.sin(rad);

              return (
                <div
                  key={`${src}-${i}`}
                  className="absolute flex items-center justify-center"
                  style={{
                    left: x,
                    top: y,
                    width: item,
                    height: item,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-[80%] h-[80%] object-contain"
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>

          {/* texto dentro del arco */}
          <div className="absolute left-0 right-0 text-center px-4" style={{ top: R * 0.45 }}>
            <h2 className="text-white text-3xl md:text-4xl font-semibold">🔮 ¿Quieres aprender del horóscopo?</h2>
            <p className="text-white/90 mt-1">Aprende con nosotras</p>
            <hr className="mt-3 border-t border-white/40 w-1/2 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}