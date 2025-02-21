import { BrowserRouter as Router } from 'react-router-dom';
import { TestConnection } from './components/shared/TestConnection';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <TestConnection />
      </div>
    </Router>
  );
}

export default App;