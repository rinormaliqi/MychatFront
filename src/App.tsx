import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ChatApp from './components/ChatApp';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/chat" 
          element={
            <ProtectedRoute>
              <ChatApp />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="*" 
          element={
            <div className="text-center p-10 text-red-600 font-bold text-2xl">
              404 - Page Not Found
            </div>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
