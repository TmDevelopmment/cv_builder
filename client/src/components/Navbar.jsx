import { Link } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {


  const user = {
    name: "John Doe",
    avatar:
      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
  };

  const navigate = useNavigate();

  const LogOutUser = () => {
    localStorage.removeItem("token");
    window.location.reload();
    navigate("/");
  }

  return (
    <div className="shadow bg-white">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all">
        <Link to="/">
          <img src="../assets/logo.svg" alt="logo" />
        </Link>
        <div className="flex items-center gap-4">
            <p className=" text-black">Hi, {user.name}</p>
            <button onClick={LogOutUser} className="text-sm text-green-500 hover:text-green-700 border border-green-500 hover:border-green-700 rounded-full px-3 py-1 transition hover:bg-green-500">
              Log Out
            </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
