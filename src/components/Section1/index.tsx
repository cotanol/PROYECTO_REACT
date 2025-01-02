import Button from "../Button";



const Section1 = () => {

    const handleClickButton = () => {
        console.log("Button clicked");
    }


    return (
        <div className="flex flex-col mt-12 font-body font-normal">
            <div className="flex flex-col gap-3">
                <h1 className="font-heading px-4 text-4xl">FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
                <p className="font-normal px-4 text-sm" >Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
                <div className="px-4">
                    <Button handleClick={handleClickButton} label="Shop Now"/>
                </div>
                
                <div className="flex flex-wrap justify-center px-4 items-center">
                    <div className="w-1/2 border-r pl-4 border-solid border-gray-500">
                        <p className="font-bold text-2xl" >200+</p>
                        <p className="text-xs">International Brands</p>
                    </div>
                    <div className="w-1/2 pl-4">
                        <p className="font-bold text-2xl">2,000+</p>
                        <p className="text-xs">High-Quality Products</p>
                    </div>
                    <div className="w-1/2 pt-5 pl-6">
                        <p className="font-bold text-2xl">30,000+</p>
                        <p className="text-xs">Happy Customers</p>
                    </div>
                </div>
            </div>
            
            <img className="mt-3 h-96 w-full object-cover object-top" src="./public/hero.png"/>

            <div className="bg-black flex flex-wrap justify-center gap-4 py-4">
                <img src="./public/versace-logo.svg" />
                <img src="./public/zara-logo.svg" />
                <img src="./public/gucci-logo.svg" />
                <img src="./public/prada-logo.svg" />
                <img src="./public/calvinklein-logo.svg" />
            </div>
        </div>
    );
}

export default Section1;