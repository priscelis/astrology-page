import { useEffect, useState } from "react"; // inicializar la informacion
import Header from "../components/Header.jsx";
import { getOneAstrologyCard } from "../services/AstroServices.jsx";
import { useParams, Link } from "react-router-dom"; //Para guardar la informacion

function SeeOneCard() {
  //useState
  const [oneCard, setOneCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useParams
  const { id } = useParams();

  // Se utiliza useEffect porque no acepta el async solito
    useEffect (() => {
      async function  seeCardInfo(){
        // tienes que poner en que estado esta eso porque si no no hace nada
        setLoading(true);
        setError(null);      
        try{
          const data = await getOneAstrologyCard(id);
          setOneCard(data);
          setLoading(false); // Es como apagar el loading cuando todo esta bien 
        }catch{
            setError("no se pudo cargar la carta")
            setLoading(false); // Se apaga el loading cuando hay algun error
        }
      }
      seeCardInfo(); // Se ejecuta la funcion dentro del useEffect
    },[id])
    
    // para que funcione el loading 
    if (loading){
      return  <p> Cargando datos... </p>
    }

    if (error){
      return <p>Hay un error, vuelva para atras</p>
    }
// para reconocer las cartas que estan dentro del 
    if (!oneCard){
      return <p>Esta carta no existe</p>
    }

  return (
    <>
    <main>
      <Header />
      <section className="grid grid-rows-1">
      <div className="w-[700px] border h-[700px] flex">
        <img src={oneCard.arcaneImage.imageSrc} alt={oneCard.arcaneName} className="w-[500px] h-[600px]"/>
        <div>
        <h1>{oneCard.arcaneNumber} . {oneCard.arcaneName}</h1>
        <p>{oneCard.arcaneDescription}</p>
        </div>
      </div>
   
      {/*Separacion entre las dos cartas */}
   
    <div className=" border w-[700px] h-[700px] flex">
      <img src={oneCard.goddessImage.imageSrc} alt={oneCard.goddessName} className="w-[400px] h-[400px]"/>
        <div  >

        <h1>{oneCard.goddessName}</h1>
        <p>{oneCard.goddessDescription}</p>
        </div>


    </div>

    </section>
    
    </main>
    </>
  );
}

export default SeeOneCard;
