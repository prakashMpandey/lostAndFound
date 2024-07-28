import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import Search from "./search";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Navbar = () => {

    const {getTokenFromLs}=useAuth()
    const accessToken=getTokenFromLs()

    const [query, setQuery] = useState('');
    const [isDisabled, setDisabled] = useState(false);
const {isAuthenticated}=useAuth()
    const navigate=useNavigate()
    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const submitHandler =async  (e) => {
        // Handle the search functionality
        
     try {
       

       if(query==="")
       {
        
        setDisabled(true)
        
        
       }
       else{
        setDisabled(false)
       navigate("/search",{state:{query:query}})
       }
         
         }
         
           
   
     catch (error) {
        console.error('Search request failed', error);
        toast('An error occurred during the search');
    }
    finally{
        setDisabled(false)
    }
    };

  
    if(accessToken) { 
   
return (

     
        <nav className="nav-links flex gap-6 bg-blue-600 p-2 text-white text-lg font-medium">
            {/* Left Side: Logo and Links */}
            <div className="flex flex-1 gap-2 items-center ">
                <div className="nav-logo">
                    <img src="vite.svg" className="h-10" alt="Logo" />
                </div>
              
                <div className="nav-links flex gap-4">
                    <NavLink
                        to="/home"
                        className={({ isActive }) => `hover:text-yellow-400 transition-colors duration-300 ${isActive ? 'text-yellow-400' : ''}`}
                    >
                        Home
                    </NavLink>
                  
                    <NavLink
                        to="/post"
                        className={({ isActive }) => `hover:text-yellow-400 transition-colors duration-300 ${isActive ? 'text-yellow-400' : ''}`}
                    >
                        Post
                    </NavLink>
                    <NavLink
                        to="/messages"
                        className={({ isActive }) => `hover:text-yellow-400 transition-colors duration-300 ${isActive ? 'text-yellow-400' : ''}`}
                    >
                        Messages
                    </NavLink>
                    <NavLink
                        to="/mypost"
                        className={({ isActive }) => `hover:text-yellow-400 transition-colors duration-300 ${isActive ? 'text-yellow-400' : ''}`}
                    >
                        History
                    </NavLink>
                    <NavLink
                        to="/logout"
                        className={({ isActive }) => `hover:text-yellow-400 transition-colors duration-300 ${isActive ? 'text-yellow-400' : ''}`}
                    >
                        Log out
                    </NavLink>
                </div>
            </div>

            {/* Right Side: Search Input and Button */}
            <div className="flex flex-1 justify-end mx-2 items-center gap-1">
                <input
                    type="text"
                    className="border-2 border-white rounded-md px-2 py-1 text-black outline-none focus:border-green-400"
                    name="item"
                    required={true}
                    value={query}
                    onChange={handleChange}
                    placeholder="Search..."
                />
                <button
                    className="bg-green-600 rounded-md px-4 py-1 text-white hover:bg-green-700 transition-colors duration-300"
                    onClick={submitHandler} disabled={isDisabled}
                >
                search
                </button>
            </div>
        </nav>
    );}
    else{
       return ( <nav className="flex justify-between items-center bg-blue-600 h-20 text-white mx-auto shadow-lg p-2">
                 <div className="flex flex-1 items-center justify-between p-2 text-lg">
                <div className="nav-logo flex gap-2 flex-wrap">
                    <img src="vite.svg" className="h-10" alt="Logo" />
                    <div className="">
                <h2 className="font-semibold text-3xl text-orange-500 p-1">Lost <span className="text-gray-200">And </span>Found</h2>
                </div>
                </div>
               
              
                <div className="nav-links flex justify-around gap-3 mr-2 text-lg">
                    <NavLink
                        to="/signin"
                        className={({ isActive }) => `hover:text-yellow-400 transition-colors duration-300 ${isActive ? 'text-yellow-400' : ''}`}
                    >
                        sign in
                    </NavLink>
                  
                    <NavLink
                        to="/signup"
                        className={({ isActive }) =>`hover:text-yellow-400 transition-colors duration-300 ${isActive ? 'text-yellow-400' : ''}`}
                    >
                        sign up
                    </NavLink>
                    </div>
                    </div>

         </nav>)
    }
  
};

export default Navbar;

               