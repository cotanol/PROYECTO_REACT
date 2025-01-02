import { useContext, useEffect } from "react";
import { Producto } from '../../types/product';    
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../../context/CartContext";
import imagenDefecto from "../../assets/ProductNotAvalible.webp";
import Button from "../Button";
import { useProductos } from "../../hooks/useProductos";
import { useImagenesProducto } from "../../hooks/useImagenProductos";


function ProductCard({id_producto, nombre_producto, precio}: Producto) {

    const context = useContext(ShoppingCartContext);

    const {producto, obtenerProducto} = useProductos();
    const {imagenesProducto, getImagenesProducto} = useImagenesProducto();

    useEffect(() => {
        const probando =  () => {
            getImagenesProducto();
            if (id_producto) obtenerProducto(id_producto);
            console.log(producto);
            
        }
        probando();
    },[]);

    const handleClickButton = () => {
        context.setCount(context.count + 1);
    }

    const obtenerImagen = (id: string) => {
        return imagenesProducto.find(imagen => imagen.id_producto === id)?.imagen_producto;
    };

    return (

        <div className=" p-4 rounded-lg  mb-10 text-center">
            <div className="product-image mb-4">
                <img 
                    src={obtenerImagen(id_producto)} 
                    alt="Imagen de Prueba" 
                    className="rounded-xl w-full h-auto object-contain mx-auto"
                    onError={(e) => {e.currentTarget.src = imagenDefecto}} //Funciona pero evaluar que sea public
                />
            </div>

            <div className="product-info">
                <h3 className="font-body font-bold text-black hover:text-gray-600 transition-colors duration-200">
                    <Link to={`/products/${id_producto}`}>{nombre_producto}</Link>
                </h3>
                <p className="font-body font-bold text-black mt-2">${precio}</p>
                <Button handleClick={handleClickButton} label="Buy Now" />
            </div>

        </div>

    );

}

export default ProductCard;
