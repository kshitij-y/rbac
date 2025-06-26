import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedAdminRoute from "./utils/protect";

import Landing from './pages/Landing';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import CreateBlog from './pages/admin/createBlog';
import Dashboard from './pages/admin/dashboard';
import EditBlog from './pages/admin/editBlog';
import BlogView from './pages/BlogView';
import Profile from './pages/Profile';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/blog/:id" element={<BlogView />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <Dashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/createBlog"
          element={
            <ProtectedAdminRoute>
              <CreateBlog />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/editBlog/:id"
          element={
            <ProtectedAdminRoute>
              <EditBlog />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
