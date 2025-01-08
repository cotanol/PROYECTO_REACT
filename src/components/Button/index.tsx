interface ButtonProps {
    label?: string;
    handleClick?: () => void;
    botonColor?: string;
    type?: "button" | "submit" | "reset";
}

const botonDefecto  = "bg-black hover:bg-white hover:text-black text-white";

const Button = ({label = "Submit", handleClick, botonColor = botonDefecto, type = "button"}: ButtonProps) => {

    return (
        <button
            onClick={handleClick}
            className={` font-body text-base font-medium py-3 px-8 rounded-full transition duration-300 w-full border-2 ${botonColor}`} 
            type={type}
        >
            {label}
        </button>
    )
}

export default Button;