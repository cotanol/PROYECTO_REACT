import { useState } from 'react';
import { supabase } from '../supabase/client';
import { Linea } from '../types/product';

export const useLineas = () => {
    const [loading, setLoading] = useState(false);
    const [lineas, setLineas] = useState<Linea[]>([]);
    const [error, setError] = useState<string | null>(null);

    const getLineas = async () => {
        setLoading(true);
        setError(null);
        try {
            const { error, data } = await supabase.from('lineas').select();
            if (error) throw error;
            setLineas(data);
        } catch (error: any) {
            setError(error.message || "Ocurrió un error al obtener las líneas");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const crearLinea = async (nombre_linea: string) => {
        setLoading(true);
        setError(null);
        try {
            const { error, data } = await supabase.from('lineas').insert({ nombre_linea });
            if (error) throw error;
            if (data) setLineas([...lineas, ...data]);
        } catch (error: any) {
            setError(error.message || "Ocurrió un error al crear la línea");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const editarLinea = async (id_linea: string, nombre_linea: string) => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase
                .from('lineas')
                .update({ nombre_linea })
                .match({ id_linea });
            if (error) throw error;
            setLineas(
                lineas.map((linea) =>
                    linea.id_linea === id_linea
                        ? { ...linea, nombre_linea }
                        : linea
                )
            );
        } catch (error: any) {
            setError(error.message || "Error al editar la línea");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const eliminarLinea = async (id_linea: string) => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.from('lineas').delete().match({ id_linea });
            if (error) throw error;
            setLineas(lineas.filter((linea) => linea.id_linea !== id_linea));
        } catch (error: any) {
            setError(error.message || "Error al eliminar la línea");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const obtenerLinea = async (id_linea: string) => {
        setLoading(true);
        setError(null);
        try {
            const { error, data } = await supabase.from('lineas').select().match({ id_linea });
            if (error) throw error;
            return data;
        } catch (error: any) {
            setError(error.message || "Error al obtener la línea");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, lineas, getLineas, crearLinea, editarLinea, eliminarLinea, obtenerLinea };
};
