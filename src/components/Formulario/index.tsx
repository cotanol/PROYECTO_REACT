import { useState } from "react";
import Button from "../Button";


const Formulario = () => {

    const [email, setEmail] = useState("");

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Email: ", email);
        setEmail("");
    }

    return (
        <div className="font-body font-normal mt-12">
            <div className="mx-4 rounded-2xl p-4 flex flex-col bg-black gap-4">
                <h2 className="text-3xl font-heading text-white">STAY UP TO DATE ABOUT OUT LATEST OFFERS</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input className="py-3 px-8 rounded-full" type="email" value={email} placeholder="Enter your email address" onChange={handleChangeEmail} />
                    <Button type="submit" botonColor="text-black bg-white hover:bg-black hover:text-white" label="Subscribe to Newsletter"/>
                </form>
            </div>
            
        </div>
    )
}

export default Formulario;