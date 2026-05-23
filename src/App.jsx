import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import BlogDetails from './pages/BlogDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/product/:id" element={<ProductDetails />} />
       <Route path="/blog/:id" element={<BlogDetails />} />
      </Routes>
    </Router>
  );
}

export default App;