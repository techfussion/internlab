import BrowseCompany from '@/pages/company/BrowseCompany';
import Home from '@/pages/Home';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/authContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { DataProvider } from '@/context/DataContext';
import Profile from '@/pages/company/profile/Profile';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/companies" element={<BrowseCompany />} />
            <Route path="/companies/profile" element={<Profile />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/engine/overview" element={<><p>Hello protected</p></>} />
            </Route>
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;