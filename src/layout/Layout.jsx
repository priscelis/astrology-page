import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Layout = () => (
  <>
    <main
      className="
    w-full min-h-svh overflow-x-hidden
    bg-gradient-to-b from-[#D6AC71]/70 to-[#251B13]/30
    px-4 sm:px-6 md:px-8 lg:px-12
    py-6 sm:py-8 md:py-10
    rounded-xl
  "
    >
      <Outlet />
    </main>
    <Footer />
  </>
);

export default Layout;
