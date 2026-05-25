import { Link } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../app/features/authSlice";
import image from "../assets/logo.svg";

const Navbar = () => {


  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const LogOutUser = () => {
    navigate("/");
    dispatch(logout());
  }

  return (
    <div className="shadow bg-white">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all">
        <Link to="/" className="flex items-center">
          <img src={image} alt="logo" />
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
