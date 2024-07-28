import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const Respond = (props) => {
  const [content, setContent] = useState({
    contact: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [proof, setProof] = useState(null);
  const { getTokenFromLs } = useAuth();

  const handleChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  const handleProof = (e) => {
    const file = e.target.files[0];
    setProof(file);
  };


  
 const handleSubmit = async (e) => {
    e.preventDefault();
   
    const accessToken = getTokenFromLs();
    const formData = new FormData();
    formData.append("proof", proof);
    formData.append("message", content.message);
    formData.append("contact", content.contact);

    setLoading(true);
    console.log(props.id)
    try {
      const response = await fetch(`http://localhost:3000/api/v1/post/${props.id}/${props.receiver}/writemessage`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        body: formData
      });

      if (response.ok) {
        console.log(await response.json());
        // Hide the modal manually
        toast.success("Your message has been sent successfully!");
        const modal = document.getElementById(`responseModal-${props.id}`);
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
       
      } else {
        alert("Message could not be sent");
      }
    } catch (error) {
      alert("something went wrong")
    } finally {
      setLoading(false);
    }
  };
if(loading){<div>loading...</div>}
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#responseModal-${props.id}`}
      
      >
        Respond
      </button>

      <div
        className="modal fade"
        id={`responseModal-${props.id}`}
        tabIndex="-1"
        aria-labelledby={`responseModalLabel-${props.id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`responseModalLabel-${props.id}`}>
                Write a Message
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-left">
              <form id={`form-${props.id}`} onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor={`message-${props.id}`} className="form-label">Message</label>
                  <textarea
                    rows={3}
                   
                    name="message"
                    value={content.message}
                    placeholder="Enter message ...."
                    className="form-control"
                    id={`message-${props.id}`}
                    maxLength={300}
                    onChange={handleChange}
                    minLength={10}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor={`contact-${props.id}`} className="form-label">Contact:</label>
                  <input
                    type="text"
                    required={props.required||false}
                    placeholder="Email or phone number"
                    value={content.contact}
                    name="contact"
                    onChange={handleChange}
                    className="form-control"
                    id={`contact-${props.id}`}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor={`proof-${props.id}`} className="form-label">Proof</label>
                  <input
                    type="file"
                    required={props.required||false}
                    name="proof"
                    onChange={handleProof}
                    className="form-control"
                    id={`proof-${props.id}`}
                    aria-describedby="fileHelp"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    disabled={loading}
                    className={`btn btn-secondary ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className={`btn btn-primary ${loading&&'bg-red-600'}`}
                    disabled={loading}

                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Respond;
