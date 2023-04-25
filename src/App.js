import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/navbar';
import AppRouter from './components/AppRouter/AppRouter';
import { useContext } from 'react';
import { Context } from '.';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from './components/Loader/Loader';

function App() {
  const { auth } = useContext(Context)
  const [user, loading, error] = useAuthState(auth)

  if (loading) {
    return <Loader />
  }

  return (
    <BrowserRouter basename='/online-chat-react'>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
