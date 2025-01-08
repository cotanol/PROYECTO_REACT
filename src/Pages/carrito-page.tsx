import Button from "../components/Button";
import { MdDelete } from "react-icons/md";
import { useShoppingCart } from "../context/CartContext";

const CarritoPage = () => {
  const { cartProducts, eliminarDelCarrito } = useShoppingCart();
  const total = cartProducts.reduce((acc, item) => {
    return acc + item.cantidad * item.productos.precio;
  }, 0);

  return (
    <div className="container mx-auto px-4 md:px-10 py-8 font-body">
      {/* Título */}
      <h2 className="text-3xl md:text-4xl font-heading text-center mb-8 text-black">
        Carrito de Compras
      </h2>
      <div className="flex flex-col md:flex-row  gap-6">
        {/* Lista de productos */}
        {cartProducts.length > 0 ? (
          <ul className="grid grid-cols-1 w-[100%] gap-6 md:w-[60%]">
            {cartProducts.map((productoCarrito) => (
              <li
                key={productoCarrito.id_carrito}
                className="flex items-center bg-white rounded-lg p-4"
              >
                {/* Imagen del producto */}
                <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-300">
                  <img
                    src={
                      productoCarrito.productos.imagen_productos[0]
                        ?.imagen_producto
                    }
                    alt={productoCarrito.productos.nombre_producto}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Información del producto */}
                <div className="ml-4 flex flex-col justify-between w-[100%]">
                  <h3 className="text-lg font-bold text-black">
                    {productoCarrito.productos.nombre_producto}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Cantidad: {productoCarrito.cantidad}
                  </p>
                  <p className="text-sm text-gray-600">
                    Precio unitario: ${productoCarrito.productos.precio}
                  </p>
                  <div className="flex flex-row justify-between">
                    <p className="text-lg font-semibold text-black mt-2">
                      Total: $
                      {productoCarrito.cantidad *
                        productoCarrito.productos.precio}
                    </p>
                    <button
                      className="text-black"
                      onClick={() =>
                        eliminarDelCarrito(productoCarrito.id_carrito)
                      }
                    >
                      <MdDelete size={25} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-600 mt-16">
            <p className="text-lg">Tu carrito está vacío.</p>
          </div>
        )}
        <div className="md:w-[40%] bg-white rounded-lg p-2 flex flex-col gap-3 h-[fit-content]">
          <h3 className="font-bold text-base ">RESUMEN DEL PEDIDO</h3>
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <p>Subtotal</p>
              <p>${total}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>Envío</p>
              <p>Gratis</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>IGV incl.</p>
              <p>${total * 0.18}</p>
            </div>
            <div className="flex flex-row font-bold justify-between">
              <p>Total</p>
              <p>${total}</p>
            </div>
          </div>
          <Button label={"Pagar"} type="button" />
        </div>
      </div>
    </div>
  );
};

export default CarritoPage;
