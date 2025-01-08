import { useState } from "react";
import { useShoppingCart } from "../../context/CartContext";
import Button from "../Button";

interface ContadorProductCardProps {
  countCard: number;
  setCountCard: React.Dispatch<React.SetStateAction<number>>;
  increment: () => void;
  decrement: () => void;
  countcard: number;
}

const ContadorProductCard = () => {
  const [countCard, setCountCard] = useState(0);
  const increment = () => {
    const max = 20;
    if (countCard < max) setCountCard(countCard + 1);
    else alert("No puedes agregar más de 20 productos");
  };
  const decrement = () => {
    const min = 0;

    if (countCard > min) setCountCard(countCard - 1);
    else alert("No puedes agregar menos de 0 productos");
  };

  return (
    <>
      <div className="flex flex-col items-center p-4rounded-lg w-64">
        <div className="flex items-center space-x-4">
          <button
            onClick={decrement}
            className="px-4 py-2 bg-black text-white font-bold rounded"
          >
            -
          </button>
          <span className="text-2xl font-semibold text-gray-700">
            {countCard}
          </span>
          <button
            onClick={increment}
            className="px-4 py-2 bg-black text-white font-bold rounded"
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default ContadorProductCard;
