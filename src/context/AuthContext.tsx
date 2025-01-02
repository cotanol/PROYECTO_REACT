

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import { User } from '@supabase/supabase-js';



interface AuthContextType {
    loginWithMagicLink: (email: string) => Promise<void>;
    logout: () => Promise<void>;
    user: User | null;
    loading: boolean;
}

interface AuthContextProviderProps {
    children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthContextProvider');
    }
    return context;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const checkSession = async () => {
            try {
                const {data: {session}, error} = await supabase.auth.getSession();
                if (error) {
                    console.error("Error al obtener la sesion:", error.message);
                }
                if (session) { 
                    setUser(session.user);
                    console.log(session.user);
                } else {
                    setUser(null);
                }
            } catch (error: any) {
                console.error("Error al obtener la sesion:", error.message);
            } finally {
                setLoading(false);
            }
        }
        checkSession();
    }, []);

    

    const loginWithMagicLink = async (email: string) => {
        try {
            const {error} = await supabase.auth.signInWithOtp({email: email});
            if (error) {
                throw error;
            }

        } catch (error: any) {
            console.error("Error al enviar el correo:", error.message);
        }
    }

    const logout = async () => {
        try {
            const {error} = await supabase.auth.signOut();
            if (error) throw error;
            setUser(null);
            
        } catch (error: any) {
            console.error("Error al cerrar la sesion:", error.message);
        }
    }

    return (
        <AuthContext.Provider value={{ loginWithMagicLink, logout, user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
