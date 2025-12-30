import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex justify-center w-full">
      <div className="w-full max-w-150 min-h-screen flex flex-col">
        <Navbar />
        <main className="px-4 py-8 grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
