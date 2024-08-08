import React, { useState, useEffect } from 'react';
import Reply from './reply';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
const MyMessage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [userData, setUserData] = useState(); 
 
  const { getTokenFromLs,loggedInUser } = useAuth();

const user= ()=>{
  loggedInUser()
        .then(user=>{
          setUserData(user)
        }
      ).catch(error=>{console.log(error)})

}
 


  useEffect(() => {

    const fetchMessages = async () => {
      try {
        user()
       
        const accessToken = getTokenFromLs();
        const response = await fetch("http://localhost:3000/api/v1/post/messages", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
         
        }

        const data = await response.json();
        setMessages(data.data);
        console.log(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      } 
    };

    fetchMessages();
  }, [getTokenFromLs]);
  
  const handleDelete=(id)=>{

    
    setMessages((prevItems) => prevItems.filter((item) => item._id !== id))
    console.log("Deleted item with ID:", id)
  }
 
  const handleUpdate=(id)=>{
    setMessages((prevItems)=>prevItems.map((item)=>item._id===id))
    console.log("namaste bhai")
  }
  const claimUpdate=(id)=>{
     const index=messages.findIndex(message=>message.item._id===id)

     if(index!==-1)
     {
      const updatedMessages=[...messages];
      updatedMessages[index].item.status=true;
      setMessages(updatedMessages);
     }

  }

  if (loading) return <div>Loading...</div>;  // Show a loading indicator while fetching data
if(messages.length===0) return <div>no message to show</div>
  
return (
    <div className='mx-auto flex justify-evenly flex-wrap' style={{ width: "fit-content", maxWidth: "80vw" }}>
     
      {messages.map(message => (
        <Reply key={message._id} data={message} user={userData} onDelete={handleDelete} onClaim={claimUpdate} onUpdate={handleUpdate}/>
      ))}
    </div>
  );
};

export default MyMessage;
