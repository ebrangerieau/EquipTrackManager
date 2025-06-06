import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Equipment from './pages/Equipment';
import Contracts from './pages/Contracts';
import Interventions from './pages/Interventions';
import ImportExport from './pages/ImportExport';
import Settings from './pages/Settings';
import Support from './pages/Support';
import GettingStarted from './pages/guides/GettingStarted';
import Documentation from './pages/guides/Documentation';
import { useThemeStore } from './store/themeStore';
import { useRequireAuth } from './hooks/useRequireAuth';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useRequireAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return currentUser ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark' || 
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    root.classList.remove('light', 'dark');
    root.classList.add(isDark ? 'dark' : 'light');
  }, [theme]);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="equipment" element={<Equipment />} />
            <Route path="contracts" element={<Contracts />} />
            <Route path="interventions" element={<Interventions />} />
            <Route path="import-export" element={<ImportExport />} />
            <Route path="settings" element={<Settings />} />
            <Route path="support" element={<Support />} />
            <Route path="support/getting-started" element={<GettingStarted />} />
            <Route path="support/documentation" element={<Documentation />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;