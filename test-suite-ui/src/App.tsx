import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  // Get base name from Vite's BASE_URL
  const basename = import.meta.env.BASE_URL;
  
  return (
    <Router basename={basename}>
      <div className="app">
        <header className="app-header">
          <div className="container">
            <h1 className="app-title">Test Feature Viewer</h1>
          </div>
        </header>
        
        <main className="app-main">
          <div className="container">
            <Routes>
              {/* All routes go to HomePage, which handles query strings */}
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </div>
        </main>
        
        <footer className="app-footer">
          <div className="container">
            <p>Test Feature Management System</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

