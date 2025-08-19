import Estrella from '../assets/Estrella.png'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './Header/Header.css'

function Header() {
 const {nombre} = useParams();

  
    return (
    <header className='flex justify-center'>
      <div className='w-[800px] h-[60px] bg-[#665949] rounded-[20px] flex items-center justify-center px-[40px]'>
        
        <div className='flex items-center justify-evenly w-full'>
          <div className='swing-animation'>
          <Link to="/">
          <img src={Estrella} alt="Estrella" className='h-[70px]' />
          </Link>
          </div>
          <Link to="/options/{}">
          <h5 className='text-white text-[25px] cursor-pointer transition-all duration-300 hover:text-yellow-300 hover:scale-105 hover:drop-shadow-lg'>
            Opciones
          </h5>
          </Link>
           <Link to= "/">
          <h5 className='text-white text-[25px] cursor-pointer transition-all duration-300 hover:text-yellow-300 hover:scale-105 hover:drop-shadow-lg'>
            Contacto
          </h5>
          </Link>
          <h5 className='text-white text-[25px] cursor-pointer transition-all duration-300 hover:text-yellow-300 hover:scale-105 hover:drop-shadow-lg'>
Holaa
          </h5>
          <h5 className='text-white text-[25px] cursor-pointer transition-all duration-300 hover:text-yellow-300 hover:scale-105 hover:drop-shadow-lg'>
            Holaa
          </h5>
        </div>
        
      </div>
    </header>
  );
}

export default Header