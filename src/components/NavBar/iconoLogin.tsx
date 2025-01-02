
import { IoLogIn } from "react-icons/io5";
import { Link } from "react-router-dom";

const IconoLogin = () => {

    return (
        <Link to="/login"><IoLogIn className="text-white" size={30} /></Link>
    )
}

export default IconoLogin;