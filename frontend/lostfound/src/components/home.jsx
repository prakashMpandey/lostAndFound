import  { useEffect, useState } from 'react';
import Card from './card'; 
import './home.css'; 
import { Link } from 'react-router-dom';
import { useAuth } from '../store/auth.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
toast
const Home = () => {
  const navigate=useNavigate()
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const {getTokenFromLs}=useAuth()
  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const accessToken=getTokenFromLs()
      //   if (!accessToken) {
      
      //  navigate('/signin');
      //     return;
      //   }
         
         console.log(accessToken)
        const response = await fetch("http://localhost:3000/api/v1/post/getItems", { method: "GET",
          headers: {Authorization:`Bearer ${accessToken}`
          
        }});
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched items:', data); 
        const shuffledItems = data.data.sort(() => Math.random() - 0.5);

        setItems(shuffledItems);
       

  
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.warning("something went wrong try again")
      }
      finally {
        setLoading(false);  
      }
    }
    fetchItems();
  

  },[]);

  if (loading) return <div>Loading...</div>;
  
  return (
    // <div className="home-container">
    //   <div className="card-container">
    
    //   </div>
    // </div>
    <div className="home-container mx-auto">
       {items.map(item => (
          <Card key={item._id} data={item} />
        ))}

      
    </div>
  );
};

export default Home;
