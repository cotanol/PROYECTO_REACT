import { Link } from "react-router-dom";
import { Categoria } from '../../types/product';


function Nav({nombre_categoria, id_categoria}:Categoria) {

    return (
        <li><Link to={`/categories/${id_categoria}/products`} className="text-lg hover:text-gray-400 transition">{nombre_categoria}</Link></li>
    );

}

export default Nav;