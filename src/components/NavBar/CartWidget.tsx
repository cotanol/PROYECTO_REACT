import { useContext } from "react";
import { BsCart4 } from "react-icons/bs";
import { ShoppingCartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

const IconoCarro = () => {

    const context = useContext(ShoppingCartContext);

    return (
        <div className="relative flex items-center">
            <Link to="/"><BsCart4 className="text-white text-2xl"/></Link>
            <p className="absolute top-[-5px] right-[-5px] bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{context.count}</p>
        </div>
        
    )

}

export default IconoCarro;
