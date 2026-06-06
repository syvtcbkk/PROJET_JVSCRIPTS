import { useState } from 'react';
import type { User } from './types';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import CreateCardPage from './pages/CreateCardPage';
import QuizPage from './pages/QuizPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('/');
  const [user, setUser] = useState<User | null>(null);
  const [quizData, setQuizData] = useState<any>(null);

  const navigate = (page: string, data?: any) => {
    if (data) {
      setQuizData(data);
    }
    setCurrentPage(page);
  };

  const handleLogin = (connectedUser: User) => {
    setUser(connectedUser);
    setCurrentPage('/');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('/');
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (currentPage === '/quiz') {
    return <QuizPage quizData={quizData} user={user} navigate={navigate} onLogout={handleLogout} />;
  }

  if (currentPage === '/creer-carte') {
    if (user.role === 'admin') {
      return <CreateCardPage user={user} navigate={navigate} onLogout={handleLogout} />;
    }
    return <Dashboard user={user} navigate={navigate} onLogout={handleLogout} />;
  }

  return <Dashboard user={user} navigate={navigate} onLogout={handleLogout} />;
}