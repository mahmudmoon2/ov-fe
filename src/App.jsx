import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import BlogDetails from './pages/BlogDetails';
import Checkout from './pages/Checkout';
import AllProducts from './pages/AllProducts';
import SearchResults from './pages/SearchResults';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/product/:id" element={<ProductDetails />} />
       <Route path="/blog/:id" element={<BlogDetails />} />
       <Route path="/checkout" element={<Checkout />} />
       <Route path="/products" element={<AllProducts />} />
       <Route path="/search" element={<SearchResults />} />
       <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;