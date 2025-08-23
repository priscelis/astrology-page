import { useParams } from "react-router-dom";

function Greeting() {
     const { nombre } = useParams();
  
  return (
    <>
  <div className="mx-4 sm:mx-6 lg:mx-8 mt-6 sm:mt-8 mb-4 sm:mb-6 flex justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl w-[800px] p-8 sm:p-10 md:p-12 lg:p-16 
                      shadow-2xl border border-white/20 relative overflow-hidden">

    <div className="text-center text-[100px] ">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
                     font-bold text-white mb-2 sm:mb-4 md:mb-6
                    
                     bg-clip-text ">¡Hola {nombre}!</h1>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 
                    text-white font-medium"> ¿Qué te gustaría hacer?</p>
    </div>
  
 </div>
 </div>
    </>
  )
}

export default Greeting