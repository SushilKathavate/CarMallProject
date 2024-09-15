import logo from './logo.svg';
import './App.css';
import Dashboard from './common/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Dashboard />
      </Router>
    </div>
  );
}

export default App;
