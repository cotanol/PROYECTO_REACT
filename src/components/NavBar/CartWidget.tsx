import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../../context/CartContext";

const IconoCarro = () => {
  const { count } = useShoppingCart();

  return (
    <div className="relative flex items-center">
      <Link to="/cartPage">
        <BsCart4 className="text-white text-2xl" />
      </Link>
      <p className="absolute top-[-5px] right-[-5px] bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {count}
      </p>
    </div>
  );
};

export default IconoCarro;
