import './App.css';
import Signup from './components/signup.jsx';
import Login from './components/login.jsx';
import Navbar from './components/navbar.jsx';
import Card from './components/card.jsx';
import Home from './components/home.jsx';
import Create from './components/create.jsx';

import Search from './components/search.jsx';
import Reply from './components/reply.jsx';
import MyMessage from './components/myMessage.jsx';
import Logout from './components/logout.jsx';
import Footer from './components/footer.jsx';
import Error from './components/error.jsx';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './store/auth.jsx';
import Mypost from './components/mypost.jsx';
import Forbidden from './components/forbidden.jsx';
import { useEffect } from 'react';

function App() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
 
  useEffect(() => {
    
  }, [isAuthenticated])
  

  return (
    <BrowserRouter basename="">
      <Navbar />
      <Routes>
        
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/home" element={isAuthenticated &&<Home />  } />
        <Route path="/post" element={isAuthenticated &&<Create />  } />
        <Route path="/search" element={isAuthenticated && <Search />  } />
        <Route path="/logout" element={isAuthenticated && <Logout /> } />
        <Route path="/mypost" element={isAuthenticated &&<Mypost />  } />
        <Route path="/messages" element={isAuthenticated && <MyMessage /> } />
      
        <Route path="/" element={isAuthenticated ? <home/> : <Navigate to="/signin" />} />
        
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
