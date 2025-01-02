import { useEffect } from "react";
import { useProductos } from "../hooks/useProductos";
import { useCategorias } from "../hooks/useCategorias";
import { useLineas } from "../hooks/useLineas";
import { useImagenesProducto } from "../hooks/useImagenProductos";


const ProductoPage = () => {

    const {productos, loading, error, getProductos} = useProductos();
    const {categorias, getCategorias} = useCategorias();
    const {lineas, getLineas} = useLineas();
    const {imagenesProducto, getImagenesProducto} = useImagenesProducto();

    useEffect(() => {
        getCategorias();
        getLineas();
        getImagenesProducto();
        getProductos();
        
    }, []);

    const convertirACategoria = (id:string) => {
        return categorias.find(categoria => categoria.id_categoria === id)?.nombre_categoria;
    }

    const convertirALinea = (id:string) => {
        return lineas.find(linea => linea.id_linea === id)?.nombre_linea;
    }

    const obtenerImagen = (id: string) => {
        return imagenesProducto.find(imagen => imagen.id_producto === id)?.imagen_producto;
    };
    

    if (loading) return <p>Cargando...</p>
    if (error) return <p>Ocurrió un error: {error}</p>

    return (
        <>
            <h1>Producto</h1>
            
            <ul>
                {productos.map(producto => (
                    <div key = {producto.id_producto}>
                        <p>{producto.nombre_producto}</p>
                        <p>Precio: ${producto.precio}</p>
                        <p>Cantidad: {producto.cantidad}</p>
                        <p>Categoría: {convertirACategoria(producto.id_categoria) }</p>
                        <p>Línea: {convertirALinea(producto.id_linea)}</p>
                        <img src={obtenerImagen(producto.id_producto)} alt={producto.nombre_producto} />
                    </div>
                ))}
            </ul>

        </>
    );
}
export default ProductoPage;