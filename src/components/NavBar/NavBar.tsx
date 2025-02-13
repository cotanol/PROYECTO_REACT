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
  const { getCategorias, categorias, error, loading } = useCategorias();
  const { user } = useAuth();

  const handleMenuBar = () => {
    setIsMenuOpen((prevMode) => !prevMode);
  };

  useEffect(() => {
    getCategorias();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <header className="bg-black text-white ">
      <nav className="container mx-auto flex items-center xl:h-24 justify-between px-4 md:px-10 py-3">
        {user && (
          <button
            className="lg:hidden flex items-center"
            onClick={handleMenuBar}
          >
            <FaBars className="text-white" size={30} />
          </button>
        )}

        <Logo />

        {user && (
          <>
            <ul
              className={`lg:flex lg:space-x-6 transition-all duration-300 ease-in-out
                                        ${
                                          isMenuOpen
                                            ? "p-4 flex flex-col space-y-4 absolute top-12 left-0 right-0 bg-black lg:static lg:flex-row lg:space-y-0"
                                            : "hidden"
                                        }
                                        `}
            >
              {categorias?.map((nav) => (
                <Nav key={nav.id_categoria} {...nav} />
              ))}
            </ul>
          </>
        )}

        <div className="flex flex-row gap-5">
          {user && <IconoCarro />}

          {user ? <IconoLogout /> : <IconoLogin />}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
