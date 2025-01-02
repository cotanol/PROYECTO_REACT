import { useParams } from "react-router-dom";
import ProductCard from "../ProductCard";
import Loading from "../Loading/Loading";
import { useProductos } from "../../hooks/useProductos";
import { useEffect } from "react";


function ItemListContainer() {

  const { getProductos, loading, error, productos } = useProductos();

  const { id_categoria } = useParams();
  
  useEffect(() => {
      getProductos();
  }, []);

  // Filtrar los productos según la categoría si está presente
  const productosFiltrados = id_categoria
    ? productos.filter(producto => producto.id_categoria === id_categoria)
    : productos;

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
      {productosFiltrados.map((producto) => (
        <ProductCard key={producto.id_producto} {...producto} />
      ))}
    </div>
  );
}

export default ItemListContainer;
