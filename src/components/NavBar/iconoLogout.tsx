
import { IoLogOut } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";

const IconoLogout = () => {

    const { logout } = useAuth();

    return (
        <button><IoLogOut className="text-white" size={30} onClick={() => logout()} /></button>
    )
}

export default IconoLogout;