import BrowseCompany from '@/pages/company/BrowseCompany';
import Home from '@/pages/Home';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/authContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { DataProvider } from '@/context/DataContext';
import Profile from '@/pages/company/profile/Profile';
import AdminDashboard from './pages/admin/Page';
import { CompaniesManagement } from './pages/admin/company/Page';
import { DomainsManagement } from './pages/admin/domain/Page';
import SubmissionManagement from './pages/admin/submissions/Page';
import FindPlacemennt from './pages/domain/find-placement/FindPlacement';
import { JobProvider } from './context/use-context';
import ProfileForm from './pages/user/profile/page';
import BookmarksPage from './pages/user/bookmarks/Page';
import ReviewsPage from './pages/user/reviews/Page';
import SubmissionsPage from './pages/user/submissions/Page';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <JobProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/Placements" element={<FindPlacemennt />} />
              <Route path="/companies" element={<BrowseCompany />} />
              <Route path="/:companiesName/profile" element={<Profile />} />
            {/* <Route path="/:companiesName/description" element={<Description />} /> */}

              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/companies" element={<CompaniesManagement />} />
              <Route path="/admin/domains" element={<DomainsManagement />} />
              <Route path="/admin/submissions" element={<SubmissionManagement />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/adminn" element={<AdminDashboard />} />
                <Route path="/profile" element={<ProfileForm />} />
                <Route path="/bookmarks" element={<BookmarksPage />} />
                <Route path="/reviews" element={<ReviewsPage />} />
                <Route path="/submissions" element={<SubmissionsPage />} />
              </Route>
            </Routes>
          </Router>
        </JobProvider>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;