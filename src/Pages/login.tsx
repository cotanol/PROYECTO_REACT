import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const { loginWithMagicLink, user, loading } = useAuth();
  const navigate = useNavigate();

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await loginWithMagicLink(email);
    setEmail("");
    alert("Revisa tu correo para iniciar sesión");
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="flex flex-wrap items-center justify-center lg:justify-between w-full max-w-5xl">
        {/* Imagen */}
        <div className="hidden lg:block w-1/2">
          <img src="/pinguino.webp" className="w-full" alt="Sample image" />
        </div>

        {/* Formulario */}
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-4 bg-white shadow rounded-lg"
          >
            <h2 className="text-2xl font-semibold text-center">Sign in with</h2>

            <div>
              <label
                htmlFor="emailInput"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="emailInput"
                value={email}
                onChange={handleChangeEmail}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full border bg-black text-white font-semibold py-2 rounded-lg hover:bg-white hover:text-black transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
