import { useState } from 'react';
import { supabase } from '../supabase/client';
import { Categoria } from '../types/product';

export const useCategorias = () => {
    const [loading, setLoading] = useState(false);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [error, setError] = useState<string | null>(null);

    const getCategorias = async () => {
        setLoading(true);
        setError(null);
        try {
            const {error, data} = await supabase.from('categorias').select();
            if (error) throw error;
            setCategorias(data);
        } catch (error: any) {
            setError(error.message || "Ocurrió un error al obtener las categorias");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const crearCategoria = async (nombre_categoria: string, imagen_categoria: string) => {
        setLoading(true);
        setError(null);
        try {
            const {error, data} = await supabase.from('categorias').insert({nombre_categoria, imagen_categoria});
            if (error) throw error;
            if (data) setCategorias([...categorias, ...data]);
        } catch (error: any){
            setError(error.message || "Ocurrió un error al crear la categoria");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const editarCategoria = async (id_categoria: string, nombre_categoria: string, imagen_categoria: string) => {
        setLoading(true);
        setError(null);
        try {
            const {error} = await supabase.from('categorias').update({nombre_categoria, imagen_categoria}).match({id_categoria});
            if (error) throw error;
            setCategorias(categorias.map(categoria => {
                if (categoria.id_categoria === id_categoria) {
                    return {...categoria, nombre_categoria, imagen_categoria};
                }
                return categoria;
            }));
        } catch (error: any) {
            setError(error.message || "Error al editar la categoría");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const eliminarCategoria = async (id_categoria: string) => {
        setLoading(true);
        setError(null);
        try {
            const {error} = await supabase.from('categorias').delete().match({id_categoria});
            if (error) throw error;
            setCategorias(categorias.filter(categoria => categoria.id_categoria !== id_categoria));
        } catch (error: any) {
            setError(error.message || "Error al eliminar la categoría");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const obtenerCategoria = async (id_categoria: string) => {
        setLoading(true);
        setError(null);
        try {
            const {error, data} = await supabase.from('categorias').select().match({id_categoria});
            if (error) throw error;
            return data;
        } catch (error: any) {
            setError(error.message || "Error al obtener la categoría");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return {loading, error, categorias, getCategorias, crearCategoria, editarCategoria, eliminarCategoria, obtenerCategoria};
}
