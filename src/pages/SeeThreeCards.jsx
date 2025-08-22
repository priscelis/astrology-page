import { useEffect, useState } from "react";
import { getAllAstrologyCards } from "../services/AstroServices";
import CardFront2 from "../images/CardFront2.png"
import Header from "../components/Header";

function LecturaHoroscopo() {
  // Estados mínimos
  const [deck, setDeck] = useState([]);      // mazo (22 cartas)
  const [selected, setSelected] = useState([]); // cartas elegidas [0]=Pasado [1]=Presente [2]=Futuro
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar cartas 1 vez
  useEffect(() => {
    async function load() {
      try {
        setError(null);
        setLoading(true);
        const data = await getAllAstrologyCards();
        setDeck(data);
        setLoading(false)
      } catch {
        setError("No se pudieron cargar las cartas.");
      setLoading(false)
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
  }

  const labels = ["Pasado", "Presente", "Futuro"];

  // UI mínima
  if (loading) return <p className="p-4">Cargando cartas…</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <>
    <Header/>
    <div className="max-w-[1000px] mx-auto ">
      <h1 className="text-[50px] font-bold mb-4">Lectura: Pasado · Presente · Futuro</h1>
 <span className="text-sm text-slate-600">
          {selected.length < 3
            ? `Elige ${3 - selected.length} carta(s) más…`
            : "¡Listo! Revisa tu lectura abajo."}
        </span>
        {/*Lo que elegí */}
        {selected.length === 3 && (
        <div className="grid grid-cols-2 gap-[100px]">
          {selected.map((card, idx) => (
            <div key={card.id} className="border rounded-lg p-3 w-[400px] bg-slate-50">
              <p className="text-xs uppercase text-slate-500">{labels[idx]}</p>
              <p className="font-semibold mb-1">
                {card.arcaneNumber}. {card.arcaneName}
              </p>
              <p className="text-sm text-slate-700">{card.arcaneDescription}</p>
            </div>
          ))}
        </div>
      )}
      {/* Selección actual */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-3 mb-6">
        {[0, 1, 2].map((i) => {
          const card = selected[i];
          return (
            <div key={i} className="border rounded-lg p-3 bg-white min-h-[400px]">
              <p className="text-xs uppercase text-black mb-2">{labels[i]}</p>
              {/*Si la carta esta vacia o cuando seleccionan una carta */}
              {!card ? (
                <p className="text-slate-400">Vacío</p>
              ) : (
                <>
                  <img
                    src={CardFront2}
                    alt={card.id}
                    className="w-full h-[300px] object-cover rounded mb-2"
                  />
                  
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Mazo, se le da clic para elegir */}
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 place-items-center mb-6 bg-amber-200 p-6 rounded-3xl">
        {deck.map((card) => {
          const picked = selected.some((c) => c.id === card.id);
          return (
           
            <button
              key={card.id}
              onClick={() => handlePick(card)}
              disabled={picked || selected.length >= 3}
              className={`w-[100px]   ${
                picked || selected.length >= 3 ? "opacity-50 cursor-not-allowed" : "hover:shadow"
              }`}
              title={card.arcaneName}
            >
              <img
                src={CardFront2}
                alt={card.id}
                className="w-full h-36 object-cover"
                loading="lazy"
              />
              
            </button>
          
          );
        })}
      </div>

     
  </div>
      {/* Lectura (solo si hay 3) */}
      

       <div className="flex items-center gap-2 mb-4">
        <button onClick={resetLectura} className="px-3 py-2 rounded bg-slate-800 text-white">
          Reiniciar
        </button>
       
      </div>
  </>
  );
}

export default LecturaHoroscopo;




 