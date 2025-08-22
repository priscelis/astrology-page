import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import { getOneAstrologyCard } from "../services/AstroServices.jsx";
import { useParams, Link } from "react-router-dom";

function SeeOneCard() {
  //useState
  const [oneCard, setOneCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useParams
  const { id } = useParams();

  // Se utiliza useEffect porque no acepta el async solito
  useEffect(() => {
    async function seeCardInfo() {
      // tienes que poner en que estado esta eso porque si no no hace nada
      setLoading(true);
      setError(null);
      try {
        const data = await getOneAstrologyCard(id);
        setOneCard(data);
        setLoading(false); // Es como apagar el loading cuando todo esta bien
      } catch {
        setError("no se pudo cargar la carta");
        setLoading(false); // Se apaga el loading cuando hay algun error
      }
    }
    seeCardInfo(); // Se ejecuta la funcion dentro del useEffect
  }, [id]);

  // para que funcione el loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-300 border-t-transparent mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold">Cargando datos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4"></div>
          <p className="text-xl font-semibold">
            Hay un error, vuelva para atrás
          </p>
        </div>
      </div>
    );
  }

  // para reconocer las cartas que estan dentro del
  if (!oneCard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl font-semibold">Esta carta no existe</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen ">
        <Header />

        {/* Contenedor principal */}
        <div className="container mx-auto px-4 py-8">
          <section className="grid grid-cols-1 gap-8 max-w-6xl mx-auto">
            {/* Primera carta - Arcano */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 lg:p-8 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center lg:items-start">
                {/* Imagen del Arcano */}
                <div className="flex-shrink-0">
                  <div className="relative group">
                    <img
                      src={oneCard.arcaneImage.imageSrc}
                      alt={oneCard.arcaneName}
                      className="w-64 h-80 lg:w-72 lg:h-96 object-cover rounded-2xl shadow-2xl 
                               transform group-hover:scale-105 transition-transform duration-300
                               border-4 border-white/30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                  </div>
                </div>

                {/* Información del Arcano */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="mb-6">
                    <h1
                      className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 
                                 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text"
                    >
                      {oneCard.arcaneNumber}. {oneCard.arcaneName}
                    </h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-[#243851] to-[#f5f5dc] rounded-full mx-auto lg:mx-0"></div>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed">
                      {oneCard.arcaneDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Segunda carta - Diosa */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 lg:p-8 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex flex-col lg:flex-row-reverse gap-6 lg:gap-8 items-center lg:items-start">
                {/* Imagen de la Diosa */}
                <div className="flex-shrink-0">
                  <div className="relative group">
                    <img
                      src={oneCard.goddessImage.imageSrc}
                      alt={oneCard.goddessName}
                      className="w-64 lg:w-80 max-h-80 lg:max-h-96 object-contain rounded-2xl shadow-2xl 
           transform group-hover:scale-105 transition-transform duration-300
           border-4 border-white/30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                  </div>
                </div>

                {/* Información de la Diosa */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="mb-6">
                    <h1
                      className="text-3xl lg:text-4xl xl:text-5xl font-bold  mb-2 
                                bg-gradient-to-r from-[#243851] 
                                to-[#f5f5dc] bg-clip-text text-transparent"
                    >
                      {oneCard.goddessName}
                    </h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-[#243851] to-[#f5f5dc] rounded-full mx-auto lg:mx-0"></div>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed">
                      {oneCard.goddessDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de regreso */}
            <div className="text-center mt-8">
              <Link
                to="/allcards"
                className="inline-flex items-center gap-3 bg-[#739CE3] 
                          text-white font-semibold 
                         px-8 py-4 rounded-2xl shadow-lg transform hover:scale-105 
                         transition-all duration-300 border border-white/20"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Volver a todas las cartas
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default SeeOneCard;
