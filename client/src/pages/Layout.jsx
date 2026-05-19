import { Outlet } from "react-router-dom";
import Navebar from "../components/Navbar";

const Layout = () => {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <Navebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
