import { useState } from 'react';
import { supabase } from '../supabase/client';
import { Producto } from '../types/product';

export const useProductos = () => {
    const [loading, setLoading] = useState(false);
    const [producto, setProducto] = useState<Producto | null>(null);
    const [productos, setProductos] = useState<Producto[]>([]);
    const [error, setError] = useState<string | null>(null);

    const getProductos = async () => {
        setLoading(true);
        setError(null);
        try {
            const { error, data } = await supabase.from('productos').select();
            if (error) throw error;
            setProductos(data);
        } catch (error: any) {
            setError(error.message || "Ocurrió un error al obtener los productos");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const crearProducto = async (
        nombre_producto: string,
        precio: number,
        cantidad: number,
        id_categoria: string,
        id_linea: string
    ) => {
        setLoading(true);
        setError(null);
        try {
            const { error, data } = await supabase
                .from('productos')
                .insert({ nombre_producto, precio, cantidad, id_categoria, id_linea });
            if (error) throw error;
            if (data) setProductos([...productos, ...data]);
        } catch (error: any) {
            setError(error.message || "Ocurrió un error al crear el producto");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const editarProducto = async (
        id_producto: string,
        nombre_producto: string,
        precio: number,
        cantidad: number,
        id_categoria: string,
        id_linea: string
    ) => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase
                .from('productos')
                .update({ nombre_producto, precio, cantidad, id_categoria, id_linea })
                .match({ id_producto });
            if (error) throw error;
            setProductos(
                productos.map((producto) =>
                    producto.id_producto === id_producto
                        ? { ...producto, nombre_producto, precio, cantidad, id_categoria, id_linea }
                        : producto
                )
            );
        } catch (error: any) {
            setError(error.message || "Error al editar el producto");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const eliminarProducto = async (id_producto: string) => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.from('productos').delete().match({ id_producto });
            if (error) throw error;
            setProductos(productos.filter((producto) => producto.id_producto !== id_producto));
        } catch (error: any) {
            setError(error.message || "Error al eliminar el producto");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const obtenerProducto = async (id_producto: string) => {
        setLoading(true);
        setError(null);
        try {
            setProducto(null);
            const { error, data } = await supabase.from('productos').select().match({ id_producto });
            if (error) throw error;
            if (data) setProducto(data[0]);
        } catch (error: any) {
            setError(error.message || "Error al obtener el producto");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        productos,
        getProductos,
        crearProducto,
        editarProducto,
        eliminarProducto,
        obtenerProducto,
        producto
    };
};
