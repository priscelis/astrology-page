import Estrella from './Header/Estrella.png'
import { Link } from 'react-router-dom';
import './Header/Header.css'

function Header() {

// Todavia estoy como cuadrando como sera el header
  return (
    <header className='flex justify-center px-4 py-2'>
      <div className='w-full max-w-[800px] min-w-[320px] h-[60px] sm:h-[70px] bg-[#665949] rounded-[15px] sm:rounded-[20px] flex items-center justify-center px-2 sm:px-4 md:px-[40px]'>
        
        <div className='flex items-center justify-between sm:justify-evenly w-full gap-2 sm:gap-4'>
          
          <div className='swing-animation flex-shrink-0'>
            <Link to="/">
              <img src={Estrella} alt="Estrella" className='h-[50px] sm:h-[60px] md:h-[70px]' />
            </Link>
          </div>

          <div className='hidden lg:flex items-center gap-6 xl:gap-8'>
            <Link to="/options/{}">
              <h5 className='text-white text-[20px] xl:text-[25px] cursor-pointer transition-all duration-300 hover:text-yellow-300 hover:scale-105 hover:drop-shadow-lg whitespace-nowrap'>
                Opciones
              </h5>
            </Link>
            <Link to="/">
              <h5 className='text-white text-[20px] xl:text-[25px] cursor-pointer transition-all duration-300 hover:text-yellow-300 hover:scale-105 hover:drop-shadow-lg whitespace-nowrap'>
                Contacto
              </h5>
            </Link>
            <h5 className='text-white text-[20px] xl:text-[25px] cursor-pointer transition-all duration-300 hover:text-yellow-300 hover:scale-105 hover:drop-shadow-lg whitespace-nowrap'>
              Holaa
            </h5>
            <h5 className='text-white text-[20px] xl:text-[25px] cursor-pointer transition-all duration-300 hover:text-yellow-300 hover:scale-105 hover:drop-shadow-lg whitespace-nowrap'>
              Holaa
            </h5>
          </div>


          <div className='hidden md:flex lg:hidden items-center gap-3'>
            <Link to="/">
              <h5 className='text-white text-[18px] cursor-pointer transition-all duration-300 hover:text-yellow-300 hover:scale-105 hover:drop-shadow-lg'>
                Opciones
              </h5>
            </Link>
            <Link to="/">
              <h5 className='text-white text-[18px] cursor-pointer transition-all duration-300 hover:text-yellow-300 hover:scale-105 hover:drop-shadow-lg'>
                Contacto
              </h5>
            </Link>
            <h5 className='text-white text-[18px] cursor-pointer transition-all duration-300 hover:text-yellow-300 hover:scale-105 hover:drop-shadow-lg'>
              Holaa
            </h5>
            <h5 className='text-white text-[18px] cursor-pointer transition-all duration-300 hover:text-yellow-300 hover:scale-105 hover:drop-shadow-lg'>
              Holaa
            </h5>
          </div>

          <div className='flex md:hidden items-center gap-1 text-[14px] sm:text-[16px] overflow-x-auto'>
            <Link to="/options/{}" className='flex-shrink-0'>
              <h5 className='text-white cursor-pointer transition-all duration-300 hover:text-yellow-300 hover:scale-105 px-1'>
                Opciones
              </h5>
            </Link>
            <Link to="/" className='flex-shrink-0'>
              <h5 className='text-white cursor-pointer transition-all duration-300 hover:text-yellow-300 hover:scale-105 px-1'>
                Contacto
              </h5>
            </Link>
            <h5 className='text-white cursor-pointer transition-all duration-300 hover:text-yellow-300 hover:scale-105 px-1 flex-shrink-0'>
              Holaa
            </h5>
            <h5 className='text-white cursor-pointer transition-all duration-300 hover:text-yellow-300 hover:scale-105 px-1 flex-shrink-0'>
              Holaa
            </h5>
          </div>
        </div>
        
      </div>
    </header>
  );
}

export default Header