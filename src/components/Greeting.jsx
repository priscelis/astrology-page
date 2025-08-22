import { useParams } from "react-router-dom";

function Greeting() {
     const { nombre } = useParams();
  
  return (
    <>
  
    <div className="text-center">
      <h1>¡Hola {nombre}!</h1>
      <p>¿Qué te gustaría hacer?</p>
    </div>
  

    </>
  )
}

export default Greeting