import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCartContext } from "../context/CartContext";
import { useProductos } from "../hooks/useProductos";
import { useImagenesProducto } from "../hooks/useImagenProductos";

import imagenDefecto from "../assets/ProductNotAvalible.webp";
import Button from "../components/Button";
import Loading from "../components/Loading/Loading";

export default function ProductDetailPage () {

    const {id_producto } = useParams()

    const context = useContext(ShoppingCartContext);

    const {producto, loading, error, obtenerProducto} = useProductos();
    const {imagenesProducto, getImagenesProducto} = useImagenesProducto();

    const handleClickButton = () => {
        context.setCount(context.count + 1);
    }

    const obtenerImagen = (id: string) => {
        return imagenesProducto.find(imagen => imagen.id_producto === id)?.imagen_producto;
    };

    useEffect(() => {
        const probando = async () => {
            getImagenesProducto();
            if (id_producto) await obtenerProducto(id_producto);
            console.log(producto);
            
        }
        probando();
    },[]);

    if(loading) return <Loading />
    if(error) return <p>Error: {error}</p>

    return (
        <div className="max-w-7xl mx-auto p-6 ">
            <div className="flex flex-col lg:flex-row lg:items-center items-start gap-9 lg:gap-32">
                {/* Imagen a la izquierda */}
                <div className="w-full lg:w-1/2 flex justify-center">
                    <img
                        src={obtenerImagen(producto?.id_producto || "")}
                        alt={producto?.nombre_producto}
                        className="w-full h-auto rounded-lg shadow-lg"
                        onError={(e) => {e.currentTarget.src = imagenDefecto}}
                    />
                </div>
        
                {/* Detalles a la derecha */}
                <div className="w-full lg:w-1/2">
                    <h1 className="text-4xl font-bold mb-4 text-gray-800">
                        {producto?.nombre_producto}
                    </h1>
                    <p className="text-3xl font-semibold text-gray-900 mb-4">
                        Precio: ${producto?.precio}
                    </p>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta venenatis eros cursus molestie. Sed fermentum pretium metus, in efficitur ex vestibulum efficitur. Phasellus consectetur erat purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec viverra nec dui sed lobortis. Praesent ullamcorper sed leo at condimentum. Donec cursus fermentum placerat. Nam feugiat luctus nisi et vestibulum. Etiam arcu magna, congue sit amet consequat vel, pulvinar nec dui. Donec egestas dui id eleifend hendrerit. Proin cursus risus vitae leo posuere blandit. Vivamus pharetra risus id orci commodo blandit. In bibendum velit augue, et mollis velit sollicitudin eleifend.
                    </p>
        
                    <Button handleClick={handleClickButton} label="Add to Cart" />
        
                    
                </div>
            </div>
        </div>
      );
}