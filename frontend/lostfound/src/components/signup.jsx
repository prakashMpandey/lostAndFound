

import {React, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const URL = "http://localhost:3000/api/v1/user/register";

const Signup = () => {
const [user, SetUser] = useState({
  username:"",
  email:"",
  password:""
});
const navigate=useNavigate()

const  handleInput= (e)=>{
  let name=e.target.name;
  let value=e.target.value;

   SetUser({...user,[name]:value})

}
const handleSubmit=async (e)=>{

  e.preventDefault();
 
console.log(user)
const response=await fetch(URL,{method:"POST",headers: {
          'Content-Type': 'application/json'
        }
        ,body:JSON.stringify(user)})
  if(response.ok)
    {
      const data=await response.json()
      toast.success("user created successfully")
      navigate("/signin")
    }
    else{
      toast.error("kuch to gadbad hai")
      console.log("kuch gadbad hui h signup")
    }

 
}

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <main className="form-signin w-full max-w-sm p-6 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit}>
          {/* <img className="mb-4" src="" alt="" width="72" height="57"/> */}
          <h1 className="text-2xl font-bold mb-6 text-center">Create an account</h1>

          <div className="form-floating mb-4">
            <input
              type="text"
              className="form-control"
              id="floatingUsername"
              placeholder="Username"
              name="username"
              value={user.username}
              minLength={5}
              required
              onChange={handleInput}
            />
            <label htmlFor="floatingUsername">Username</label>
          </div>
          <div className="form-floating mb-4">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              name="email"
              placeholder="name@example.com"
              value={user.email}
              onChange={handleInput}
                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                title='please enter email as ex-abc@gmail.com'
            />
            <label htmlFor="floatingEmail">Email address</label>
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
               pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button className="btn btn-primary w-full py-2"  type="submit">
            Sign up
          </button>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <Link  to="/signin" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>

          <p className="mt-5 mb-3 text-body-secondary text-center capitalize">© lost and found</p>
        </form>
      </main>
    </div>
  );
};

export default Signup;
