import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import ProductDetailPage from "./Pages/product-detail-page";
import CategoriesProductsPage from "./Pages/categories-products-page";
import Login from "./Pages/login";
import { ShoppingCartProvider } from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NotFound from "./Pages/NotFound";
import PageCategories from "./Pages/testing-categorias";
import ProductoPage from "./Pages/testing-producto";
import Formulario from "./components/Formulario";
import Home from "./Pages/Home";
import CarritoPage from "./Pages/carrito-page";

function App() {
  return (
    <>
      <AuthContextProvider>
        <ShoppingCartProvider>
          <NavBar />
          <div className="bg-[#F2F0F1]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/products/:id_producto"
                element={
                  <ProtectedRoute>
                    <ProductDetailPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/categories/:id_categoria/products"
                element={
                  <ProtectedRoute>
                    <CategoriesProductsPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
              <Route
                path="/pageCat"
                element={
                  <ProtectedRoute>
                    <PageCategories />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pageProd"
                element={
                  <ProtectedRoute>
                    <ProductoPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cartPage"
                element={
                  <ProtectedRoute>
                    <CarritoPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>

          <Formulario />
          <Footer />
        </ShoppingCartProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
