
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import ProductDetailPage from './Pages/product-detail-page';
import CategoriesProductsPage from './Pages/categories-products-page';
import Login from "./Pages/login";
import Home from "./Pages/home-page";
import { ShoppingCartProvider } from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NotFound from "./Pages/NotFound";
import PageCategories from "./Pages/testing-categorias";
import ProductoPage from "./Pages/testing-producto";
import Formulario from "./components/Formulario";


function App() {

  return(
    <>
      
      <AuthContextProvider>
        <ShoppingCartProvider>
          <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/products/:id_producto" element={<ProductDetailPage />}/>
                <Route path="/categories/:id_categoria/products" element={<CategoriesProductsPage/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="*" element={<NotFound/>} />
                <Route path="/pageCat" element={<PageCategories/>} />
                <Route path="/pageProd" element={<ProductoPage/>} />

            </Routes>
          <Formulario/>
          <Footer/>
        </ShoppingCartProvider>
      </AuthContextProvider>
      
    </>
    
    
  )
  
}

export default App
