// pages/ProductoPage.tsx


import { useEffect } from "react";
import { useProductos } from "../hooks/useProductos";

const ProductoPage = () => {

    const { productos, loading, error, getProductosImages } = useProductos();

    useEffect(() => {
        getProductosImages();
    }, []); // Añadimos getProductosImages como dependencia para evitar advertencias de ESLint

    if (loading) return <p className="text-center text-xl">Cargando...</p>;
    if (error) return <p className="text-center text-red-500">Ocurrió un error: {error}</p>;

    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <h1 className="text-4xl font-bold text-center text-white mb-8">Productos</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {productos.map(producto => (
                    <div 
                        key={producto.id_producto} 
                        className="bg-black rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                    >
                        <div className="h-48 w-full overflow-hidden">
                            {producto.imagen_productos && producto.imagen_productos.length > 0 ? (
                                <img 
                                    src={producto.imagen_productos[0].imagen_producto} 
                                    alt={producto.nombre_producto} 
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                                    <span className="text-gray-400">No hay imagen disponible</span>
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-white mb-2">{producto.nombre_producto}</h2>
                            <p className="text-gray-300"><span className="font-medium">Precio:</span> ${producto.precio.toFixed(2)}</p>
                            <p className="text-gray-300"><span className="font-medium">Cantidad:</span> {producto.cantidad}</p>
                            <p className="text-gray-300"><span className="font-medium">Categoría ID:</span> {producto.id_categoria}</p>
                            <p className="text-gray-300"><span className="font-medium">Línea ID:</span> {producto.id_linea}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductoPage;
