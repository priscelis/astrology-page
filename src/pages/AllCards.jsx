import { useEffect, useState } from "react";
import { getAllAstrologyCards } from "../services/AstroServices.jsx";
import Header from "../components/Header.jsx";
import CardFront2 from "../images/CardFront2.png"
import { Link } from "react-router-dom";

function AllCards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  function openCard(card){ setSelectedCard(card) }
  function closeCard (){ setSelectedCard(null) }

  useEffect(function () {
    async function fetchAll() {
      try {
        setLoading(true);
        setErr(null);
        const data = await getAllAstrologyCards();
        setCards(data);
      } catch (e) {
        setErr("No se pudieron cargar las cartas.");
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <p className="text-slate-300 text-lg">Cargando cartas...</p>
      </main>
    );
  }

  if (err) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <p className="text-red-400 text-lg">{err}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6">
      <Header/>
      <div className="max-w-7xl mx-auto">
        <section className="flex justify-center mb-[40px]">
         <div className="bg-white/10 backdrop-blur-lg rounded-3xl w-full max-w-[500px] h-[40px] flex justify-center items-center p-6 sm:p-8 md:p-10 lg:p-16 
                        shadow-2xl border border-white/20 relative overflow-hidden text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Todas las cartas del Tarot
        </h1>
        </div>
        </section>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cards.map((card) => (
            <article
              key={card.id}
              className="rounded-xl overflow-hidden flex flex-col 
                         transition-all duration-300 ease-in-out transform-gpu
                         hover:scale-105 hover:shadow-2xl hover:-translate-y-3 cursor-pointer"
              onClick={() => openCard(card)}
            >
              <img
                src={CardFront2}
                alt="card front"
                className="cursor-pointer"
                loading="lazy"
              />
            </article>
          ))}
        </div>

        {selectedCard && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
              <div className="p-4 flex flex-col gap-2">
                <img
                  src={selectedCard.arcaneImage?.imageSrc}
                  alt={selectedCard.arcaneName}
                  className="w-[420px] h-[400px] rounded-[20px] object-cover mx-auto"
                  loading="lazy"
                />

                <h3 className="text-lg font-semibold text-slate-800 text-center">
                  {selectedCard.arcaneNumber}. {selectedCard.arcaneName}
                </h3>

               
                <div className="mt-4 flex items-center justify-center gap-2 flex-nowrap">
                  <button
                    onClick={closeCard}
                    className="h-[70px] w-[100px] rounded-[20px] bg-red-500 text-white font-medium
                    hover:brightness-110
                               transition-all duration-300 ease-in-out transform-gpu
                               hover:scale-105 hover:shadow-2xl hover:-translate-y-0.5"
                    aria-label="Cerrar"
                  >
                    <h5 className="text-[15px]">Cerrar</h5>
                  </button>

                  <Link
                    to={`/cardmeaning/${selectedCard.id}`}
                    className="flex items-center px-4 py-2 rounded-xl w-[200px] bg-amber-400
                               text-white font-medium hover:brightness-110
                               transition-all duration-300 ease-in-out transform-gpu
                               hover:scale-105 hover:shadow-2xl hover:-translate-y-0.5 text-center"
                  >
                    ◯ ☽ ¿Quieres descubrir más? ❨ ◯
                  </Link>
                </div>
               
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default AllCards;
