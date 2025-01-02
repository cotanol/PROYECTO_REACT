import { useState } from 'react';
import { supabase } from '../supabase/client';
import { ImagenProducto } from '../types/product';

export const useImagenesProducto = () => {
    const [loading, setLoading] = useState(false);
    const [imagenesProducto, setImagenesProducto] = useState<ImagenProducto[]>([]);
    const [error, setError] = useState<string | null>(null);

    const getImagenesProducto = async () => {
        setLoading(true);
        setError(null);
        try {
            const { error, data } = await supabase.from('imagen_productos').select();
            if (error) throw error;
            setImagenesProducto(data);
        } catch (error: any) {
            setError(error.message || "Ocurrió un error al obtener las imágenes de producto");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const crearImagenProducto = async (id_producto: string, imagen_producto: string) => {
        setLoading(true);
        setError(null);
        try {
            const { error, data } = await supabase
                .from('imagenes_producto')
                .insert({ id_producto, imagen_producto });
            if (error) throw error;
            if (data) setImagenesProducto([...imagenesProducto, ...data]);
        } catch (error: any) {
            setError(error.message || "Ocurrió un error al agregar la imagen del producto");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const editarImagenProducto = async (
        id_imagen_producto: string,
        id_producto: string,
        imagen_producto: string
    ) => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase
                .from('imagenes_producto')
                .update({ id_producto, imagen_producto })
                .match({ id_imagen_producto });
            if (error) throw error;
            setImagenesProducto(
                imagenesProducto.map((imagen) =>
                    imagen.id_imagen_producto === id_imagen_producto
                        ? { ...imagen, id_producto, imagen_producto }
                        : imagen
                )
            );
        } catch (error: any) {
            setError(error.message || "Error al editar la imagen del producto");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const eliminarImagenProducto = async (id_imagen_producto: string) => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase
                .from('imagenes_producto')
                .delete()
                .match({ id_imagen_producto });
            if (error) throw error;
            setImagenesProducto(
                imagenesProducto.filter((imagen) => imagen.id_imagen_producto !== id_imagen_producto)
            );
        } catch (error: any) {
            setError(error.message || "Error al eliminar la imagen del producto");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        imagenesProducto,
        getImagenesProducto,
        crearImagenProducto,
        editarImagenProducto,
        eliminarImagenProducto,
    };
};
