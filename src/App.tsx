import { BrowserRouter as Router } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Sidebar } from './components/chat/Sidebar';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <Router>
      <MainLayout sidebar={user ? <Sidebar /> : null}>
        {/* TODO: Router content */}
        <div className="p-4">
          <h1>Bienvenue sur Ange</h1>
        </div>
      </MainLayout>
    </Router>
  );
}

export default App;