import { useState } from "react";
import Button from "../Button";

const Formulario = () => {
  const [email, setEmail] = useState("");

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Email: ", email);
    setEmail("");
  };

  return (
    <div className="font-body font-normal bg-[#F2F0F1]">
      <div className="py-12 container mx-auto px-4 md:px-10">
        <div className="bg-black p-6 flex flex-col justify-center items-center md:flex-row rounded-xl gap-3">
          <h2 className="md:w-[50%] text-3xl font-heading text-white">
            STAY UP TO DATE ABOUT OUT LATEST OFFERS
          </h2>
          <form
            className="w-full flex flex-col gap-3 md:w-[50%]"
            onSubmit={handleSubmit}
          >
            <input
              className="rounded-full w-full py-3 px-8"
              type="email"
              value={email}
              placeholder="Enter your email address"
              onChange={handleChangeEmail}
            />
            <Button
              type="submit"
              botonColor="text-black bg-white hover:bg-black hover:text-white"
              label="Subscribe to Newsletter"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
