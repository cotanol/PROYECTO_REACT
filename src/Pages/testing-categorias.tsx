import { useEffect } from "react";
import { useImagenesProducto } from "../hooks/useImagenProductos";
import { useShoppingCart } from "../context/CartContext";

const PageCategories = () => {
  const { loading, error } = useImagenesProducto();
  const { getCarritoImages } = useShoppingCart();

  useEffect(() => {
    getCarritoImages();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Ocurrió un error: {error}</p>;
};

export default PageCategories;
