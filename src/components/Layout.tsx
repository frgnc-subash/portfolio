import { Outlet } from "react-router-dom";
import Background from "./background/Background";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex justify-center w-full">
      <Background />

      <div className="w-full max-w-150 min-h-screen flex flex-col">
        <div className="relative z-20">
          <Navbar />
        </div>

        <main className="grow w-full px-4">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
