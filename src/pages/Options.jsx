import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Greeting from "../components/Greeting";
import OptionImage1 from "../images/OptionImage1.png";
import OptionImage2 from "../images/OptionImage2.png";

const Options = () => {
  const { nombre } = useParams();
  return (
    <>
      <article>
        <Greeting nombre={nombre} />
      </article>

      
      <section className="flex justify-center mt-8 md:mt-12 lg:mt-16 px-4 sm:px-6 lg:px-8">
  <div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-16 xl:gap-24 max-w-6xl w-full">
          
          {/* Primera opción */}
          <Link to="/allcards" className="flex-1 max-w-md mx-auto lg:mx-0">
            <div className="bg-white w-full h-80 sm:h-96 lg:h-[450px] rounded-2xl flex flex-col items-center 
                           p-6 sm:p-8 lg:p-16 transition-all duration-300 ease-in-out transform-gpu
                           hover:scale-105 hover:shadow-2xl hover:shadow-blue-300/30 
                           hover:-translate-y-3 cursor-pointer border border-gray-100">
              
              <div className="mb-4 sm:mb-6 flex-shrink-0">
                <img 
                  src={OptionImage1} 
                  alt="Ver significado de cartas" 
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 xl:w-32 xl:h-32 object-contain animate-bounce"
                />
              </div>
              
              <div className="text-center flex-1 flex items-center">
                <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-800 leading-tight">
                  Ver el<br />
                  significado de<br />
                  cada carta
                </h3>
              </div>
            </div>
          </Link>

          {/* Segunda opción */}
          <Link to="/past-present-future" className="flex-1 max-w-md mx-auto lg:mx-0">
            <div className="bg-white w-full h-80 sm:h-96 lg:h-[450px] rounded-2xl flex flex-col items-center 
                           p-6 sm:p-8 lg:p-16 transition-all duration-300 ease-in-out transform-gpu
                           hover:scale-105 hover:shadow-2xl hover:shadow-purple-300/30 
                           hover:-translate-y-3 cursor-pointer border border-gray-100">
              
              <div className=" mb-4 sm:mb-6 flex-shrink-0">
                <img 
                  src={OptionImage2} 
                  alt="Pasado presente futuro" 
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 xl:w-32 xl:h-32 object-contain animate-bounce" 
                />
              </div>
              
              <div className="text-center flex-1 flex items-center">
                <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-800 leading-tight">
                  Ver tu pasado,<br />
                  presente y<br />
                  futuro
                </h3>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Options;
