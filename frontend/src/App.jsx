import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedAdminRoute from "./utils/protect";

import Landing from './pages/Landing';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import CreateBlog from './pages/admin/createBlog';
import Dashboard from './pages/admin/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/signup" element={<Signup />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
