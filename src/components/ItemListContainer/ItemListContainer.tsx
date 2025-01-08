import { useParams } from "react-router-dom";
import ProductCard from "../ProductCard";
import Loading from "../Loading/Loading";
import { useProductos } from "../../hooks/useProductos";
import { useEffect } from "react";

function ItemListContainer() {
  const { getProductosImages, loading, error, productos } = useProductos();
  const { id_categoria } = useParams();

  useEffect(() => {
    getProductosImages();
  }, []);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  const productosFiltrados = id_categoria
    ? productos.filter((producto) => producto.id_categoria === id_categoria)
    : productos;

  return (
    <div className="container mx-auto px-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center pt-4">
      {productosFiltrados.map((producto) => (
        <ProductCard key={producto.id_producto} {...producto} />
      ))}
    </div>
  );
}

export default ItemListContainer;
