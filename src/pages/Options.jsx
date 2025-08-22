import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Greeting from "../components/Greeting";

const Options = () => {
  const { nombre } = useParams();
  return (
    <>
      <article>
        <Greeting nombre={nombre} />
      </article>

      <section className="flex justify-center mt-[60px]">
        <div className="grid grid-cols-2 grid-rows-1 gap-[400px] ">
          <Link to="/allcards">
            <div className="bg-white w-[400px] h-[400px] rounded-[10px] flex justify-center">

            </div>
          </Link>

          <Link to="/past-present-future">
            <div className="bg-white w-[400px] h-[400px] rounded-[10px]">

            </div>
          </Link>
        </div>
        
      </section>
    </>
  );
};

export default Options;
