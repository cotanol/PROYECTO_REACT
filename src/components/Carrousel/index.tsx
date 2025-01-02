import React, { useEffect, useState } from "react";
import { useProductos } from '../../hooks/useProductos';
import Loading from "../Loading/Loading";
import imagenDefecto from "../../assets/ProductNotAvalible.webp";
import { useImagenesProducto } from "../../hooks/useImagenProductos";

const Carrousel: React.FC = () => {
  
  const { productos, loading, error, getProductos } = useProductos();
  const {imagenesProducto, getImagenesProducto} = useImagenesProducto();

  useEffect(() => {
    getProductos();
    getImagenesProducto();
  }, []);
  // Solo 5 primeros
  const limitedData = productos?.slice(0, 5) || [];
  // Duplicamos para simular loop
  const displayedData = [...limitedData, ...limitedData];

  const [current, setCurrent] = useState<number>(0);
  const [isTransition, setIsTransition] = useState<boolean>(true);

  // Avanzar automáticamente cada 3s
  useEffect(() => {
    if (limitedData.length) {
      const intervalId = setInterval(() => {
        setCurrent((prev) => {
          // Si llegamos al final, saltamos a 0 sin transición
          if (prev === displayedData.length - 1) {
            setIsTransition(false);
            return 0;
          }
          return prev + 1;
        });
      }, 3000);
      return () => clearInterval(intervalId);
    }
  }, [limitedData, displayedData]);

  // Restaurar transición justo después del salto
  useEffect(() => {
    if (!isTransition) {
      // Eliminamos el delay para que se note menos el “parpadeo”
      const timeoutId = setTimeout(() => setIsTransition(true), 0);
      return () => clearTimeout(timeoutId);
    }
  }, [isTransition]);

  const obtenerImagen = (id: string) => {
      return imagenesProducto.find(imagen => imagen.id_producto === id)?.imagen_producto;
  };

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="overflow-hidden w-full max-w-xl relative mt-4 font-body">
      <div
        className={`flex ${isTransition ? "transition-transform duration-500 ease-in-out" : ""}`}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {displayedData.map((product, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full flex flex-col gap-3 items-center text-center"
          >
            <img
              className="w-72 h-72 object-cover rounded-2xl"
              src={obtenerImagen(product.id_producto) || imagenDefecto}
              onError={(e) => (e.currentTarget.src = imagenDefecto)}
              alt="producto"
            />
            <h3 className="font-bold text-base px-2 w-60 truncate">
              {product.nombre_producto}
            </h3>
            <p className="font-bold text-xl">${product.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carrousel;
