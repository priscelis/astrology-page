import { useEffect, useState } from "react";
import { getAllAstrologyCards } from "../services/AstroServices.jsx";
import Header from "../components/Header.jsx";
import CardFront from "../images/CardFront.png"
import { Link } from "react-router-dom";

function AllCards() {
// useState para 
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null); //Es como decir, ¿Esta carta la elegiste?

  // Abrir la carta
  function openCard(card){
    setSelectedCard(card)
  }
  
  function closeCard (){
      setSelectedCard(null)
  }

  useEffect(function () {
    async function fetchAll() {
      try {

        setLoading(true);
        setErr(null);
        const data = await getAllAstrologyCards(); // ← trae TODAS
        setCards(Array.isArray(data) ? data : []);
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

   
    <main className="min-h-screen  p-6">
       <Header/>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Todas las cartas del Tarot
        </h1>
            
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {cards.map(function (card) {
    return (
      <article
        key={card.id}
        className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
        onClick={() => openCard(card)}
      >
        <img
          src={CardFront}
          alt="card front"
          className="cursor-pointer"
          loading="lazy"
        />
      </article>
    );
  })}
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
               
                <button
                  onClick={closeCard}
                  className="mt-3 w-[60px] py-2 rounded-xl bg-red-500 text-white font-medium hover:brightness-110"
                >
                  X
                </button>
                <Link to="/cardmeaning">
                <div className="mt-4 w-[250px] py-2 rounded-xl bg-amber-400 text-white font-medium hover:brightness-110">
                ◯ ☽ ¿Quieres descubrir mas? ❨ ◯
                </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
} // ← cierra la función

export default AllCards;

