import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import BlogDetails from './pages/BlogDetails';
import Checkout from './pages/Checkout';
import AllProducts from './pages/AllProducts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/product/:id" element={<ProductDetails />} />
       <Route path="/blog/:id" element={<BlogDetails />} />
       <Route path="/checkout" element={<Checkout />} />
       <Route path="/products" element={<AllProducts />} />
      </Routes>
    </Router>
  );
}

export default App;