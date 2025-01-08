import Button from "../../components/Button";

const Section1 = () => {
  const handleClickButton = () => {
    console.log("Button clicked");
  };

  return (
    <>
      <div className="container mx-auto flex flex-col md:flex-row font-body font-normal md:px-6 pt-4">
        <div className="flex flex-col md:w-1/2  gap-3 px-4 md:justify-center">
          <div className="flex flex-col gap-3 md:gap-8">
            <h1 className="font-heading md:text-5xl text-4xl">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>
            <p className="font-normal lg:text-base text-sm">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>

            <div className="">
              <Button handleClick={handleClickButton} label="Shop Now" />
            </div>

            <div className="flex flex-row justify-between">
              <div className="">
                <p className="font-bold text-2xl ">200+</p>
                <p className="text-xs">International Brands</p>
              </div>
              <div className="">
                <p className="font-bold text-2xl">2,000+</p>
                <p className="text-xs">High-Quality Products</p>
              </div>
              <div className="">
                <p className="font-bold text-2xl">30,000+</p>
                <p className="text-xs">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>

        <img
          className="object-cover md:w-1/2 object-top max-h-[45rem]"
          src="./hero-imagen.webp"
        />
      </div>
      <div className="bg-black">
        <div className="md:px-10 md:py-8 container mx-auto flex py-4 flex-wrap justify-center md:justify-between items-center gap-4">
          <img className="md:w-[12%]" src="./versace-logo.svg" />
          <img className="md:w-[12%]" src="./gucci-logo.svg" />
          <img className="md:w-[8%]" src="./zara-logo.svg" />
          <img className="md:w-[12%]" src="./prada-logo.svg" />
          <img className="md:w-[12%]" src="./calvinklein-logo.svg" />
        </div>
      </div>
    </>
  );
};

export default Section1;
