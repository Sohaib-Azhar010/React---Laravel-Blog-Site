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

import AdminDashboard from './components/dashboard/AdminDashboard';
import AuthorDashboard from './components/dashboard/AuthorDashboard';
import BlogsShow from './components/dashboard/authorPages/BlogsShow';
import BlogsCreate from './components/dashboard/authorPages/BlogsCreate';
import CategoriesShow from './components/dashboard/authorPages/CategoriesShow';
import ShowCategories from './components/dashboard/adminPages/ShowCategories';
import CreateCategories from './components/dashboard/adminPages/CreateCategories';
import ManageAuthors from './components/dashboard/adminPages/ManageAuthors';
import EditCategories from './components/dashboard/adminPages/EditCategories';


import { Editor } from '@tinymce/tinymce-react';
import BlogsEdit from './components/dashboard/authorPages/BlogsEdit';

function App() {
  return (

    <>

      
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/read" element={<SingleBlog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* unified entry  /dashboard */}
            <Route path="/dashboard" element={<DashboardRedirect />} />

            {/* admin‑only */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/categories/show" element={<ShowCategories />} />
              <Route path="/admin/categories/create" element={<CreateCategories />} />
              <Route path="/admin/categories/:id/edit" element={<EditCategories />} />
              <Route path="/admin/authors" element={<ManageAuthors />} />
            </Route>

            {/* author‑only */}
            <Route element={<ProtectedRoute allowedRoles={['author']} />}>
              <Route path="/author/dashboard" element={<AuthorDashboard />} />
              <Route path="/author/cetegories/show" element={<CategoriesShow />} />
              <Route path="/author/blogs/show" element={<BlogsShow />} />
              <Route path="/author/blogs/create" element={<BlogsCreate />} />
              {/* <Route path="/author/blogs/:id/edit" element={<BlogsEdit />} />  */}
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
