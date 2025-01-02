import Button from "../Button";
import Carrousel from "../Carrousel";


const Section3 = () => {

    return (
        <div className="font-body font-normal px-4 mt-12">
            <h1 className="font-heading text-3xl text-center">Products</h1>
            <Carrousel/>
            <Button label="View All" />
        </div>

    )

}

export default Section3;