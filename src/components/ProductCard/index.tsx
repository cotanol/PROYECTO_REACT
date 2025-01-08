import { useState } from "react";
import { ProductoConImagenes } from "../../types/product";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../../context/CartContext";
import Button from "../Button";
import { useAuth } from "../../context/AuthContext";

function ProductCard({
  id_producto,
  nombre_producto,
  precio,
  imagen_productos,
}: ProductoConImagenes) {
  const [countCard, setCountCard] = useState(0);
  const { setCount, agregarAlCarrito, actualizarCarrito, cartProducts } =
    useShoppingCart();
  const { user } = useAuth();

  const increment = () => {
    const max = 7;
    if (countCard < max) setCountCard(countCard + 1);
    else alert(`No puedes agregar más de ${max} productos`);
  };

  const decrement = () => {
    const min = 0;
    if (countCard > min) setCountCard(countCard - 1);
    else alert("No puedes agregar menos de 0 productos");
  };

  const handleClickButton = () => {
    if (!user?.id) {
      alert("Debes iniciar sesión para agregar productos al carrito.");
      return;
    }

    const existingProduct = cartProducts.find(
      (cartProduct) =>
        cartProduct.id_producto === id_producto &&
        cartProduct.activo === true &&
        cartProduct.id_usuario === user.id
    );

    if (countCard === 0) {
      alert("Debes agregar al menos un producto al carrito.");
      return;
    }

    if (existingProduct) {
      actualizarCarrito(
        existingProduct.id_carrito,
        existingProduct.cantidad + countCard,
        true
      );
    } else {
      agregarAlCarrito(user.id, id_producto, countCard);
    }

    setCount((prev) => prev + countCard);
    setCountCard(0);
  };

  return (
    <div className="rounded-lg shadow-lg bg-white w-[18.75rem] h-[32rem] p-4 flex flex-col text-center">
      {/* Imagen del producto */}
      <div className="w-full h-[50%] flex items-center justify-center overflow-hidden rounded-lg bg-gray-100">
        {imagen_productos && imagen_productos.length > 0 ? (
          <img
            src={imagen_productos[0].imagen_producto}
            alt={nombre_producto}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">No hay imagen disponible</span>
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="product-info mt-2 pt-4 flex flex-col items-center h-[25%]">
        <h3 className="font-bold text-black text-base sm:text-lg">
          <Link to={`/products/${id_producto}`} className="hover:text-gray-600">
            {nombre_producto}
          </Link>
        </h3>
        <p className="font-bold text-black text-lg mt-2">${precio}</p>
      </div>

      {/* Botón  y Contador*/}
      <div className="h-[25%] flex flex-col justify-between">
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
        <Button handleClick={handleClickButton} label="Add to Cart" />
      </div>
    </div>
  );
}

export default ProductCard;
