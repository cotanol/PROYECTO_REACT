import { useEffect } from 'react';
import { useImagenesProducto } from '../hooks/useImagenProductos';

const PageCategories = () => {

    const {imagenesProducto, loading, error, getImagenesProducto} = useImagenesProducto();

    useEffect(() => {
        getImagenesProducto();
        console.log(imagenesProducto);
    }, []);

    if (loading) return <p>Cargando...</p>
    if (error) return <p>Ocurrió un error: {error}</p>

    return (
        <div>
            <h1>Categories</h1>
            <ul>
                {imagenesProducto.map(imagenes => (
                    <>  
                        <div key={imagenes.id_imagen_producto}>
                            <p>{imagenes.imagen_producto}</p>
                            <img src={imagenes.imagen_producto} alt={imagenes.imagen_producto} />
                        </div>
                        
                    </>
                    
                ))}
            </ul>
        </div>

    )
}

export default PageCategories;