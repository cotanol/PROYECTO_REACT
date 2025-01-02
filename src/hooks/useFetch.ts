import { useState, useEffect } from 'react';

interface FetchResult<T> {
    data: T | null; //generico
    loading: boolean;
    error: string | null;
}

export function useFetch<T>(url: string): FetchResult<T> {
    const [data, setData] = useState<T | null>(null); //Estado de la data
    const [loading, setLoading] = useState<boolean>(true); //Estado de carga
    const [error, setError] = useState<string | null>(null); // Estado de error

    const fetchData = async() => {
        setLoading(true);
        setError(null);

        try {
      
            const response = await fetch(url);
      
            if (!response) {
              throw new Error("Algo Fallo :(");
            }
      
            const result = await response.json();
      
            setData(result);
            
      
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Algo salió mal";
            console.error(errorMessage);
            setError(errorMessage);
      
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData()
    }, [url]);

    return {data, loading, error}

}