import { useEffect, useRef, useState } from "react";
import clouds1 from "./images-carrousel/clouds1.png"
import clouds2 from "./images-carrousel/clouds2.png";
import lunacreciente1 from "./images-carrousel/lunacreciente1.png";
import lunacreciente2 from "./images-carrousel/lunacreciente2.png";
import star1  from "./images-carrousel/star1.png"
import star2  from "./images-carrousel/star2.png"
import lunallena from "./images-carrousel/lunallena.png"
import lunanueva from "./images-carrousel/lunanueva.png"

function SemiCircleCarousel() {
  // Aqui fue donde coloco las fotos, tengo ganas de volverlos variables
  const photos = [
    clouds1,
    clouds2,
    lunacreciente1,
    lunacreciente2,
    star1,
    star2,
    lunallena,
    lunanueva,
  ];

  const miRef = useRef(null); // Para saber el tamaño del circulo

  // Inicializando las medidas
  // Se guardan las medidas reales de la "arena"
  const [ancho, setAncho] = useState(0);
  const [alto, setAlto] = useState(0);

  // para medir la longitud del circulo
  useEffect(() => {
    const medidas = miRef.current.getBoundingClientRect();

    console.log(medidas.width, medidas.height);
  }, []);

  // Este es el calculo del centro del circulo
  const cx = ancho / 2;
  const cy = alto / 2;

  const padding = 70; // Esto es la separacion de los puntos
  const tamañoPunto = 64;
  // Calculo del radio del circulo
  const r = ancho / 2 - padding - tamañoPunto / 2;

  // para cada posicion
  const pasitoAngular = 360 / photos.length;
  const angulo = -90 + index * pasitoAngular;




  return (
    <>
      <div
        className=" m-10
        relative mx-auto overflow-hidden
        w-[92vw] max-w-[1500px] aspect-[3/1]
        grid place-items-center pt-[200px]
      "
      >
        <div ref={miRef} className="absolute md:top-0 w-[100%] h-[300%]">
          <div
            className="
          absolute inset-x-0 top-0
          w-full h-[300%]
          rounded-full
          border border-black/80 md:border-[6px] lg:border-8
        "
          />
          {/*Esto es para los puntos*/}
          <div id="contenedor-puntos">
            {photos.map((punto, index) => (
              <div key={index} class="punto">
                {punto}
              </div>
            ))}
          </div>

         
          {/* Contenido centrado dentro del semicírculo */}
          <div className="relative z-10 text-center px-4">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold">
              🔮¿Quieres aprender del horóscopo?
            </h2>
            <p className="text-white/90 text-sm sm:text-base md:text-lg mt-1">
              Aprende con nosotras
            </p>
            <hr className="mt-3 sm:mt-4 border-t border-white/40 w-2/3 sm:w-1/2 mx-auto" />
          </div>
        </div>
      </div>
    </>
  );
}

export default SemiCircleCarousel;
