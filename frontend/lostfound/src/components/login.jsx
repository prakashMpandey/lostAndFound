import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth.jsx';
import { toast } from 'react-toastify';

const URL = "http://localhost:3000/api/v1/user/login";

const Login = () => {
  const [user, setUser] = useState({
    loginInput: "",
    password: ""
  });

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const { storeTokenInLs } = useAuth();  

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {

      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
       
  
      });

      if (response.ok&&response.status===200) {
        const data = await response.json();
       toast.success(data.message)  

        setUser({ loginInput: "", password: "" });
        storeTokenInLs(data.data.accessToken); 
        setLoading(false)
        navigate('/home');
      } else {
        const errorData = await response.json();
(errorData.message)?toast.error(errorData.message):toast.error("username or password is incorrect")
           // Show error message from backend
      }

    } catch (error) {
      console.error(error);
      toast("unexpected error occured",{position:"top-center"});
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <main className="form-signin w-full max-w-sm p-6 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold mb-6 text-center">Please sign in</h1>

          <div className="form-floating mb-4">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="email or username"
              onChange={handleInput}
              name="loginInput"
              autoFocus
              value={user.loginInput}
              required
              minLength={2}
            />
            <label htmlFor="floatingInput">Email address or Username</label>
          </div>
          <div className="form-floating mb-4">
            <input
              name="password"
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={user.password}
              onChange={handleInput}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-check mb-4">
            <p className="mt-4 text-center text-gray-600">
              Want to create a new Account?{' '}
              <Link to="/signUp" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
          <button className={`btn btn-primary w-full py-2 ${loading&&"bg-red-500"}` }type="submit" disabled={loading}>
            Sign in
          </button>
          <p className="mt-4 text-center text-gray-500 caption-bottom capitalize">© lost and found</p>
        </form>
      </main>
    </div>
  );
};

export default Login;
