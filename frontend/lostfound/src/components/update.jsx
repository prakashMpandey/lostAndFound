import React from 'react'
import { useState } from 'react';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const Update = (props) => {



  const [content, setContent] = useState({
    name:props.data.name,
    description:props.data.description
  });

  const [loading, setLoading] = useState(false);
  
  const { getTokenFromLs } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent({ ...content, [name]: value });
  };




  
 const handleSubmit = async (e) => {
    e.preventDefault();
   
    const accessToken = getTokenFromLs();
    const formData = new FormData();
    
    formData.append("itemName", content.name);
    formData.append("description", content.description);

    setLoading(true);
    console.log(props.id)
    try {
      const response = await fetch(`http://localhost:3000/api/v1/post//edititem/${props.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        body: formData
      });

      if (response.ok) {
       const data=await response.json()
        const updatedData=data.data
        if (props.onUpdate) {
          props.onUpdate(updatedData); 
          console.log("i am called")
        }
        // Hide the modal manually
        toast.success("your post is updated");
        const modal = document.getElementById(`exampleModal-${props.id}`);
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
       
      } else {
        alert("Message could not be sent");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };












  return (
   <> 
 
<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#exampleModal-${props.id}`}>
  Update
</button>


<div className="modal fade" id={`exampleModal-${props.id}`} tabIndex="-1" aria-labelledby={`exampleModalLabel-${props.id}`} aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id={`exampleModalLabel-${props.id}`}>Update Your Item Details</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      
      <form id={`form-${props.id}`} onSubmit={handleSubmit}>
  <div className="mb-3">
    <label   htmlFor={`name-${props.id}`}   className="form-label">Name</label>
    <input type="text"  name="name" onChange={handleChange} className="form-control" value={content.name}  id={`name-${props.id}`} aria-describedby="emailHelp" />
 
  </div>

  <div className="mb-3">
    <label htmlFor={`description-${props.id}`} className="form-label">Description</label>
    <textarea rows={3} name="description" onChange={handleChange} className="form-control" value={content.description} id={`description-${props.id}`} />
  </div>
 
  <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </div>
</form>
      





      </div>
   
    </div>
  </div>
</div>
   </>
  )
}

export default Update
