import { useState } from 'react';
import { supabase } from '../supabase/client';
import { Carrito } from '../types/product';

export const useCarrito = () => {
    const [loading, setLoading] = useState(false);
    const [carrito, setCarrito] = useState<Carrito[]>([]);
    const [error, setError] = useState<string | null>(null);

    const getCarrito = async () => {
        setLoading(true);
        setError(null);
        try {
            const { error, data } = await supabase.from('carrito').select();
            if (error) throw error;
            setCarrito(data);
        } catch (error: any) {
            setError(error.message || "Ocurrió un error al obtener el carrito");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const agregarAlCarrito = async (
        id_usuario: string,
        id_producto: string,
        cantidad: number,
        activo: boolean = true
    ) => {
        setLoading(true);
        setError(null);
        try {
            const { error, data } = await supabase
                .from('carrito')
                .insert({ id_usuario, id_producto, cantidad, activo });
            if (error) throw error;
            if (data) setCarrito([...carrito, ...data]);
        } catch (error: any) {
            setError(error.message || "Ocurrió un error al agregar al carrito");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const actualizarCarrito = async (
        id_carrito: string,
        cantidad: number,
        activo: boolean
    ) => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase
                .from('carrito')
                .update({ cantidad, activo })
                .match({ id_carrito });
            if (error) throw error;
            setCarrito(
                carrito.map((item) =>
                    item.id_carrito === id_carrito
                        ? { ...item, cantidad, activo }
                        : item
                )
            );
        } catch (error: any) {
            setError(error.message || "Error al actualizar el carrito");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const eliminarDelCarrito = async (id_carrito: string) => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.from('carrito').delete().match({ id_carrito });
            if (error) throw error;
            setCarrito(carrito.filter((item) => item.id_carrito !== id_carrito));
        } catch (error: any) {
            setError(error.message || "Error al eliminar del carrito");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        carrito,
        getCarrito,
        agregarAlCarrito,
        actualizarCarrito,
        eliminarDelCarrito,
    };
};
