import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";


const Layout = () => (
  <>
   <main className="w-full h-screen  rounded-xl  bg-gradient-to-b from-[#D6AC71]/70 to-[#251B13]/30">
    <Outlet />

    
  </main>
<Footer/>
  </>
);

export default Layout;