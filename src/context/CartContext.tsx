import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { CarritoConProducto } from "../types/product";
import { supabase } from "../supabase/client";

interface ShoppingCartContextType {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  cartProducts: CarritoConProducto[];
  setCartProducts: React.Dispatch<React.SetStateAction<CarritoConProducto[]>>;
  loading: boolean;
  error: string | null;
  getCarrito: () => Promise<void>;
  agregarAlCarrito: (
    id_usuario: string,
    id_producto: string,
    cantidad: number,
    activo?: boolean
  ) => Promise<void>;
  actualizarCarrito: (
    id_carrito: string,
    cantidad: number,
    activo: boolean
  ) => Promise<void>;
  eliminarDelCarrito: (id_carrito: string) => Promise<void>;
  getCarritoImages: () => Promise<void>;
}

interface ShoppingCartProviderProps {
  children: ReactNode;
}

export const ShoppingCartContext = createContext<ShoppingCartContextType>(
  {} as ShoppingCartContextType
);

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);

  if (!context) {
    throw new Error(
      "useShoppingCart debe estar dentro de ShoppingCartProvider"
    );
  }

  return context;
};

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [count, setCount] = useState<number>(0);
  const [cartProducts, setCartProducts] = useState<CarritoConProducto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCarritoImages();
  }, []);

  useEffect(() => {
    const contanding = cartProducts.reduce(
      (acc, item) => acc + item.cantidad,
      0
    );
    setCount(contanding);
    console.log("Contando productos:", contanding);
  }, [cartProducts]);

  const getCarrito = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error, data } = await supabase.from("carrito").select();
      if (error) throw error;
      setCartProducts(data);
    } catch (error: any) {
      setError(error.message || "Ocurrió un error al obtener el carrito");
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getCarritoImages = async () => {
    setLoading(true);
    setError(null);
    setCartProducts([]);
    try {
      const { data, error } = await supabase.from("carritos").select(`
									*,
									productos (
										id_producto,
										nombre_producto,
										precio,
										cantidad,
										id_categoria,
										id_linea,
										imagen_productos (
											id_imagen_producto,
											imagen_producto
										)
									)
									
							`);

      if (error) throw error;

      setCartProducts(data || []);
      console.log("Productos con imágenes:", data);
    } catch (error: any) {
      setError(error.message || "Ocurrió un error al obtener los productos");
      console.error("Error al obtener productos:", error.message);
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
        .from("carritos")
        .insert({ id_usuario, id_producto, cantidad, activo });
      if (error) throw error;
      if (data) setCartProducts([...cartProducts, ...data]);
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
    activo: boolean = true
  ) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase
        .from("carritos")
        .update({ cantidad, activo })
        .match({ id_carrito });
      if (error) throw error;
      setCartProducts(
        cartProducts.map((item) =>
          item.id_carrito === id_carrito ? { ...item, cantidad, activo } : item
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
      const { error } = await supabase
        .from("carritos")
        .delete()
        .match({ id_carrito });
      if (error) throw error;
      setCartProducts(
        cartProducts.filter((item) => item.id_carrito !== id_carrito)
      );
    } catch (error: any) {
      setError(error.message || "Error al eliminar del carrito");
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        count,
        setCount,
        cartProducts,
        setCartProducts,
        loading,
        error,
        getCarrito,
        agregarAlCarrito,
        actualizarCarrito,
        eliminarDelCarrito,
        getCarritoImages,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
