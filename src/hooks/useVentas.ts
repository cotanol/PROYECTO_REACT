import { useState } from 'react';
import { supabase } from '../supabase/client';
import { Venta } from '../types/product';

export const useVentas = () => {
    const [loading, setLoading] = useState(false);
    const [ventas, setVentas] = useState<Venta[]>([]);
    const [error, setError] = useState<string | null>(null);

    const getVentas = async () => {
        setLoading(true);
        setError(null);
        try {
            const { error, data } = await supabase.from('ventas').select();
            if (error) throw error;
            setVentas(data);
        } catch (error: any) {
            setError(error.message || "Ocurrió un error al obtener las ventas");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const crearVenta = async (
        id_usuario: string,
        id_producto: string,
        cantidad: number,
        total: number
    ) => {
        setLoading(true);
        setError(null);
        try {
            const { error, data } = await supabase
                .from('ventas')
                .insert({ id_usuario, id_producto, cantidad, total });
            if (error) throw error;
            if (data) setVentas([...ventas, ...data]);
        } catch (error: any) {
            setError(error.message || "Ocurrió un error al crear la venta");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const editarVenta = async (
        id_venta: string,
        cantidad: number,
        total: number
    ) => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase
                .from('ventas')
                .update({ cantidad, total })
                .match({ id_venta });
            if (error) throw error;
            setVentas(
                ventas.map((venta) =>
                    venta.id_venta === id_venta
                        ? { ...venta, cantidad, total }
                        : venta
                )
            );
        } catch (error: any) {
            setError(error.message || "Error al editar la venta");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const eliminarVenta = async (id_venta: string) => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.from('ventas').delete().match({ id_venta });
            if (error) throw error;
            setVentas(ventas.filter((venta) => venta.id_venta !== id_venta));
        } catch (error: any) {
            setError(error.message || "Error al eliminar la venta");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        ventas,
        getVentas,
        crearVenta,
        editarVenta,
        eliminarVenta,
    };
};
