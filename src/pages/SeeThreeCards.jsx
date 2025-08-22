import { useEffect, useState } from "react";
import { getAllAstrologyCards } from "../services/AstroServices";
import CardFront2 from "../images/CardFront2.png";
import Header from "../components/Header";

function SeeThreeCard() {
  // Estados mínimos
  const [deck, setDeck] = useState([]); // mazo (22 cartas)
  const [selected, setSelected] = useState([]); // cartas elegidas [0]=Pasado [1]=Presente [2]=Futuro
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shuffledDeck, setShuffledDeck] = useState([]); // mazo barajado

  // Función para barajar array (algoritmo Fisher-Yates)
  const shuffleArray = (deck) => {
    const newArray = [...deck];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Cargar cartas 1 vez
  useEffect(() => {
    async function load() {
      try {
        setError(null);
        setLoading(true);
        const data = await getAllAstrologyCards();
        setDeck(data);
        setShuffledDeck(shuffleArray(data)); // Barajear inicialmente
        setLoading(false);
      } catch {
        setError("No se pudieron cargar las cartas.");
        setLoading(false);
      }
    }
    load();
  }, []);

  // Elegir carta (hasta 3, sin repetir)
  function handlePick(card) {
    if (selected.length >= 3) return;
    if (selected.some((c) => c.id === card.id)) return;
    setSelected([...selected, card]);
  }

  // Reiniciar lectura
  function resetLectura() {
    setSelected([]);
    setShuffledDeck(shuffleArray(deck))
    console.log(setShuffledDeck)
  }

  const labels = ["Pasado", "Presente", "Futuro"];

  // UI mínima
  if (loading) return <p className="p-4">Cargando cartas…</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <>
      <Header />
      <div className="max-w-[1500px] mx-auto px-4 m-[10px]">
        
        {/* HEADER SECTION - RESPONSIVE */}
        <section className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl w-full max-w-[800px] p-6 sm:p-8 md:p-10 lg:p-16 
                        shadow-2xl border border-white/20 relative overflow-hidden text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-bold mb-4 leading-tight text-white">
              Lectura: Pasado · Presente · Futuro
            </h1> 
            <span className="text-base sm:text-lg md:text-xl lg:text-[20px] text-white block">
              {selected.length < 3
                ? `Elige ${3 - selected.length} cartas`
                : "¡Listo! Revisa tu lectura abajo."}
            </span>
          </div>
        </section>

        {/* Cartas seleccionadas*/}
        {selected.length === 3 && (
          <section className="mb-12">
            <div className="max-w-6xl mx-auto">
              {/* Grid responsive: 1 col en móvil, 2 en tablet, 3 en desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8">
                {selected.map((card, idx) => (
                  <div
                    key={card.id}
                    className="border rounded-xl p-4 sm:p-6 bg-slate-50 
                               transition-all duration-300 ease-in-out
                               hover:scale-105 hover:shadow-xl hover:shadow-slate-300/50
                               transform-gpu w-full max-w-md mx-auto"
                  >
                    <p className="text-xs sm:text-sm uppercase text-slate-500 mb-3 font-medium tracking-wider">
                      {labels[idx]}
                    </p>
                    <p className="font-semibold mb-3 text-base sm:text-lg text-slate-800">
                      {card.arcaneNumber}. {card.arcaneName}
                    </p>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                      {card.arcaneDescription}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Opcion de reiniciar la lectura */}
              <div className="text-center">
                <h3 className="text-white text-base sm:text-lg mb-4">
                  ¿Te gustaría tirar otras 3 cartas?
                </h3>
                <button
                  onClick={resetLectura}
                  className="px-6 py-3 rounded-lg bg-slate-800 text-white text-sm sm:text-base font-medium
                             transition-all duration-200 ease-in-out
                             hover:scale-105 hover:bg-slate-700 hover:shadow-lg
                             focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2
                             active:scale-95"
                >
                  Reiniciar
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Cartas*/}
        <section className="mb-8">
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-3xl max-w-6xl mx-auto shadow-lg">
            {/* Grid adaptativo para el mazo */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 justify-items-center">
              {shuffledDeck.map((card) => {
                const picked = selected.some((c) => c.id === card.id);
                return (
                  <button
                    key={card.id}
                    onClick={() => handlePick(card)}
                    disabled={picked || selected.length >= 3}
                    className={`w-full max-w-[140px] sm:max-w-[160px] lg:max-w-[180px] 
                               aspect-[3/4] transition-all duration-300 ease-in-out transform-gpu
                               focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2
                               ${
                                 picked || selected.length >= 3
                                   ? "opacity-50 cursor-not-allowed scale-95"
                                   : "hover:scale-110 hover:shadow-2xl hover:shadow-purple-300/30 hover:-translate-y-2"
                               }`}
                    title={card.arcaneName}
                  >
                    <img
                      src={CardFront2}
                      alt={`Carta ${card.arcaneName}`}
                      className="w-full h-full object-cover rounded-lg shadow-md"
                      loading="lazy"
                    />
                  </button>
                );
              })}
            </div>

            {/* Indicador de progreso */}
            {selected.length > 0 && selected.length < 3 && (
              <div className="mt-6 text-center">
                <div className="flex justify-center items-center gap-2 mb-2">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        step <= selected.length ? 'bg-amber-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-slate-600 text-sm">
                  {selected.length} de 3 cartas seleccionadas
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default SeeThreeCard;