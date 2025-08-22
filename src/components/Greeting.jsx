import { useParams } from "react-router-dom";

function Greeting() {
     const { nombre } = useParams();
  
  return (
    <>
  
    <div className="text-center text-[80px]">
      <span><h1>¡Hola {nombre}!</h1></span>
      <p>¿Qué te gustaría hacer?</p>
    </div>
  

    </>
  )
}

export default Greeting