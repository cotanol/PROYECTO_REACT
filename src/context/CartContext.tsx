import { createContext, ReactNode, useState } from "react";
import { Producto } from "../types/product";

interface ShoppingCartContextType {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    cartProducts: Producto[];
    setCartProducts: React.Dispatch<React.SetStateAction<Producto[]>>;
}

interface ShoppingCartProviderProps {
    children: ReactNode;
}


export const ShoppingCartContext = createContext<ShoppingCartContextType>({} as ShoppingCartContextType);

export const ShoppingCartProvider = ({children}:ShoppingCartProviderProps) => {
    const [count, setCount] = useState<number>(0);
    const [cartProducts, setCartProducts] = useState<Producto[]>([]);

    return (
        <ShoppingCartContext.Provider value={{
            count, setCount, cartProducts, setCartProducts
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}