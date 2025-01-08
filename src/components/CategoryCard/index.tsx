import { Link } from "react-router-dom";
import { Categoria } from "../../types/product";

export function CategoryCard({
  id_categoria,
  nombre_categoria,
  imagen_categoria,
}: Categoria) {
  return (
    <div className="font-bold rounded-2xl relative h-48 md:h-60 bg-white w-full">
      <Link to={`/categories/${id_categoria}/products`}>
        <h3 className="z-10 absolute pl-4 pt-4 text-2xl">{nombre_categoria}</h3>
        <img
          className="rounded-2xl h-full w-full object-cover"
          src={imagen_categoria}
        />
      </Link>
    </div>
  );
}
