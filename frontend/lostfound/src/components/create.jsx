import React, { useState } from 'react';
import "./create.css";
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const URL = "http://localhost:3000/api/v1/post/createitem";


const Create = () => {
  const [text, setText] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false)
  const navigate=useNavigate()
  const [category, setCategory] = useState('lost');
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setText({ ...text, [name]: value });
  };

  const handleSelect = (e) => {
    setCategory(e.target.value);
  };

  const { getTokenFromLs } = useAuth();

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.name || !text.description || !category || !image) {
      alert('Please fill out all fields and upload an image.');
      return;
    }
    setLoading(true); 

    const accessToken = getTokenFromLs();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("itemName", text.name);
    formData.append("description", text.description);
    formData.append("category", category);

   try {

     const response = await fetch(URL, {
       method: 'POST',
       headers: {
         Authorization: `Bearer ${accessToken}`,
       },
       body: formData,
     });
 
     if (response.ok) {
     
       toast.success("post submitted successfully")
       setCategory("");
       setImage(null);
       setText({ name: "", description: "" });
       
       navigate("/home")
     } else {
      
       toast.error("post submission failed")
       setCategory("");
       setImage(null);
       setText({ name: "", description: "" });
       
     }
   } catch (error) {
    alert("fetch error",error)
   }
   finally{
    setLoading(false)
   }
  };
  if (loading) return <div>Loading...</div>;
  return (
    <>
  
      <h1 className='my-2 p-1 font-bold text-2xl text-center'>Post item as Lost or Found</h1>
      <h2 className='text-center'>Please provide genuine information only and don't provide any private information</h2>
      <div className='create-container mx-auto text-black'>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            minLength={10}
            value={text.name}
            name="name"
            placeholder='Enter item name'
            style={{ marginBottom: '10px' }}
            onChange={handleChange}
          />

          <label htmlFor="category">Category:</label>
          <select
            name="category"
            value={category}
            onChange={handleSelect}
            id="category"
            style={{ marginBottom: '10px' }}
          >
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>

          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            placeholder="Enter description here in 100 words"
            rows={5}
            value={text.description}
            style={{ marginBottom: '10px' }}
            onChange={handleChange}
          ></textarea>

          <label htmlFor="file">Upload image:</label>
          <input
            type="file"
            name="image"
            style={{ marginBottom: '10px' }}
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button disabled={loading}  className={`rounded-md px-4 py-2 text-white ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`} type='submit'>Submit</button>
        </form>
      </div>
    </>
  );
};

export default Create;
