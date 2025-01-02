import { useState } from 'react';
import { supabase } from '../supabase/client';
import { DetalleVenta } from '../types/product';

export const useDetalleVentas = () => {
    const [loading, setLoading] = useState(false);
    const [detallesVenta, setDetallesVenta] = useState<DetalleVenta[]>([]);
    const [error, setError] = useState<string | null>(null);

    const getDetallesVenta = async () => {
        setLoading(true);
        setError(null);
        try {
            const { error, data } = await supabase.from('detalles_venta').select();
            if (error) throw error;
            setDetallesVenta(data);
        } catch (error: any) {
            setError(error.message || "Ocurrió un error al obtener los detalles de venta");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const crearDetalleVenta = async (
        id_venta: string,
        id_producto: string,
        cantidad: number,
        subtotal: number
    ) => {
        setLoading(true);
        setError(null);
        try {
            const { error, data } = await supabase
                .from('detalles_venta')
                .insert({ id_venta, id_producto, cantidad, subtotal });
            if (error) throw error;
            if (data) setDetallesVenta([...detallesVenta, ...data]);
        } catch (error: any) {
            setError(error.message || "Ocurrió un error al crear el detalle de venta");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const editarDetalleVenta = async (
        id_detalle_venta: string,
        cantidad: number,
        subtotal: number
    ) => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase
                .from('detalles_venta')
                .update({ cantidad, subtotal })
                .match({ id_detalle_venta });
            if (error) throw error;
            setDetallesVenta(
                detallesVenta.map((detalle) =>
                    detalle.id_detalle_venta === id_detalle_venta
                        ? { ...detalle, cantidad, subtotal }
                        : detalle
                )
            );
        } catch (error: any) {
            setError(error.message || "Error al editar el detalle de venta");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const eliminarDetalleVenta = async (id_detalle_venta: string) => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase
                .from('detalles_venta')
                .delete()
                .match({ id_detalle_venta });
            if (error) throw error;
            setDetallesVenta(
                detallesVenta.filter((detalle) => detalle.id_detalle_venta !== id_detalle_venta)
            );
        } catch (error: any) {
            setError(error.message || "Error al eliminar el detalle de venta");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        detallesVenta,
        getDetallesVenta,
        crearDetalleVenta,
        editarDetalleVenta,
        eliminarDetalleVenta,
    };
};
