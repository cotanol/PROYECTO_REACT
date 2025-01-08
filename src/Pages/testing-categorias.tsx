import { useEffect } from "react";
import { useImagenesProducto } from "../hooks/useImagenProductos";
import { useShoppingCart } from "../context/CartContext";
import ContadorProductCard from "../components/ProductCard/contador";

const PageCategories = () => {
  const { imagenesProducto, loading, error, getImagenesProducto } =
    useImagenesProducto();
  const { getCarritoImages } = useShoppingCart();

  useEffect(() => {
    getCarritoImages();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Ocurrió un error: {error}</p>;

  return <ContadorProductCard />;
};

export default PageCategories;
