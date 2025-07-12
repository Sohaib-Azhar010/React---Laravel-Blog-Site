import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../src/components/dashboard/AuthContext';
import ProtectedRoute from '../src/components/dashboard/ProtectedRoute';
import DashboardRedirect from '../src/components/dashboard/DashboardRedirect';

import Home from './pages/Home';
import Blogs from './pages/Blogs';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import SingleBlog from './pages/SingleBlog';

import AdminDashboard   from './components/dashboard/AdminDashboard';
import AuthorDashboard  from './components/dashboard/AuthorDashboard'; 

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/"       element={<Home />} />
          <Route path="/blogs"  element={<Blogs />} />
          <Route path="/blogs/read" element={<SingleBlog />} />
          <Route path="/about"  element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login"  element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* unified entry  /dashboard */}
          <Route path="/dashboard" element={<DashboardRedirect />} />

          {/* admin‑only */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            {/* add other admin routes here */}
          </Route>

          {/* author‑only */}
          <Route element={<ProtectedRoute allowedRoles={['author']} />}>
            <Route path="/author/dashboard" element={<AuthorDashboard />} />
            {/* author routes */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
