import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Product from './pages/Product';
import Learn from './pages/Learn';
import Visualization from './pages/Visualization';
import Team from './pages/Team';
import Course from './pages/Course';

/**
 * App - Root component with React Router.
 * Demonstrates: React Router (BrowserRouter, Routes, Route), Component composition.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="learn" element={<Learn />} />
          <Route path="visualization" element={<Visualization />} />
          <Route path="team" element={<Team />} />
          <Route path="course" element={<Course />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
