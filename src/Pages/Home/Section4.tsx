import { useEffect } from "react";
import { CategoryCard } from "../../components/CategoryCard/index";
import { useCategorias } from "../../hooks/useCategorias";

const Section4 = () => {
  const { categorias, getCategorias } = useCategorias();
  useEffect(() => {
    getCategorias();
  }, []);

  return (
    <div className="px-4 md:px-10 mt-12 font-body font-normal container mx-auto">
      <div className="flex flex-col bg-gray-300 rounded-2xl p-4">
        <h2 className="font-heading text-center text-3xl md:text-4xl my-8">
          BROWSE BY DRESS STYLE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categorias.map((categoria) => (
            <CategoryCard key={categoria.id_categoria} {...categoria} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section4;
