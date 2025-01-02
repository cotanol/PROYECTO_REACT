import IconoCarro from "./CartWidget";
import Nav from "./Nav";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import Logo from "../Logo";
import { useAuth } from "../../context/AuthContext";
import IconoLogin from "./iconoLogin";
import IconoLogout from "./iconoLogout";
import { useCategorias } from "../../hooks/useCategorias";

const NavBar = () => {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {getCategorias, categorias, error, loading} = useCategorias();
    const {user} = useAuth();

    const handleMenuBar = () => {
        setIsMenuOpen((prevMode) => !prevMode);
    }

    useEffect(() => {
        getCategorias();
    }, []);

    if(loading) return <p>Cargando...</p>
    if(error) return <p>Error: {error}</p>

    

    return (

        <header className="px-1 bg-black text-white">
            <nav className="flex items-center justify-between px-4 py-3">
                
                {
                    user &&
                    <button 
                        className="lg:hidden flex items-center"
                        onClick={handleMenuBar}
                    >
                        <FaBars className="text-white" size={30} />
                    </button>
                }
                
                <Logo />

                {
                    user &&
                    <>
                        <ul className={`lg:flex lg:space-x-6 transition-all duration-300 ease-in-out
                                        ${isMenuOpen ? "p-4 flex flex-col space-y-4 absolute top-12 left-0 right-0 bg-black lg:static lg:flex-row lg:space-y-0" : "hidden"}
                                        `}>
                            {categorias?.map(nav => (
                                <Nav key={nav.id_categoria} {...nav}  />
                            ))}
                        </ul>
                        <IconoCarro/>
                    </>
                    
                }

                
                
                {user ? <IconoLogout/> : <IconoLogin/> }

            </nav>
        </header>
    )

}

export default NavBar;