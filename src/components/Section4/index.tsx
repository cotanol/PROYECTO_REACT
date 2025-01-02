
const Section4 = () => {
    return ( 
        <div className="px-4 mt-12 font-body font-normal"> 
            <div className="flex flex-col bg-gray-300 rounded-2xl p-4">
                <h2 className="font-heading text-center text-3xl my-8">BROWSE BY DRESS STYLE</h2>
                
                <div className="flex flex-col gap-4">
                    <div className="font-bold rounded-2xl relative h-48 bg-white">
                        <h3 className="z-10 absolute pl-4 pt-4 text-2xl">Casual</h3>
                        <img className="rounded-2xl absolute right-0 h-48" src="./public/img-casual.png" />
                    </div>
                    <div className="font-bold rounded-2xl relative h-48 bg-white">
                        <h3 className="z-10 absolute pl-4 pt-4 text-2xl">Formal</h3>
                        <img className="absolute right-0 rounded-2xl h-48" src="./public/img-formal.png" />
                    </div>
                    <div className="font-bold rounded-2xl relative h-48 bg-white">
                        <h3 className="z-10 absolute pl-4 pt-4 text-2xl">Party</h3>
                        <img className="absolute right-0 rounded-2xl h-48" src="./public/img-party.png" />
                    </div>
                    <div className="font-bold rounded-2xl relative bg-white h-48">
                        <h3 className="z-10 absolute pl-4 pt-4 text-2xl">Gym</h3>
                        <img className="absolute right-0 rounded-2xl h-48" src="./public/img-Gym.png" />
                    </div>
                </div>
                
                
            </div> 
        </div> 
    );

}

export default Section4;