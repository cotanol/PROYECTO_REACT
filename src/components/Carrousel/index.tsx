import React, { useEffect } from "react";
import { useProductos } from "../../hooks/useProductos";
import Loading from "../Loading/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "../ProductCard";

const Carrousel: React.FC = () => {
  const { productos, loading, error, getProductosImages } = useProductos();

  useEffect(() => {
    getProductosImages();
  }, []);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex justify-center items-center mx-auto container px-4">
      <Swiper
        modules={[Navigation]}
        navigation
        loop={false}
        spaceBetween={2.5}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 1.25,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 1.5,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 2.5,
          },
        }}
        className="my-5 w-full"
      >
        {productos.map((caja) => (
          <SwiperSlide className="flex justify-center" key={caja.id_producto}>
            <ProductCard {...caja} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carrousel;
