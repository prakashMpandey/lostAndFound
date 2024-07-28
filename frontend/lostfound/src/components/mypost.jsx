import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify'
import Card2 from './card2'

const Mypost = () => {
    const { getTokenFromLs } = useAuth()
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const accessToken = getTokenFromLs()

    // Fetch items on component mount
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/v1/post/myitems", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json' // Added Content-Type for consistency
                    }
                })

                
                if (response.ok ){
                    const data = await response.json()
                    if(data.length===0)
                    {
                        toast.success("no post found")
                    }
                    toast.success(data.message)  // Show success message
                    setItems(data.data)
                    setLoading(false)
                } else {
                    // Use the response's json error message if available
                    const errorData = await response.json()
                    setLoading(false)
                    toast.error(`Failed to fetch items: ${errorData.message || 'Unknown error'}`)
                }
            } catch (error) {
               
                toast.error('An error occurred while fetching items.')
            }
           
        }

        fetchItems()
    }, [])  
    
   if (loading) return <div>Loading...</div>;  

    const handleDelete = (id) => {
  
        setItems((prevItems) => prevItems.filter((item) => item._id !== id))
        console.log("Deleted item with ID:", id)
    }
   
    const handleUpdatedData = (updatedItem) => {
        console.log("I AM UPDATED")
        setItems((prevItems) =>
            prevItems.map((item) => (item._id === updatedItem._id ? updatedItem : item))
        );
        console.log("Updated item:", updatedItem);
    };
if(items.length<1) return <div><h1>no item found</h1></div>
    return (
        <div className='mx-auto mt-2'>
            {items.map((item) => (
                <Card2 key={item._id} user={item.createdBy} data={item} onUpdate={handleUpdatedData} onDelete={handleDelete} />
            ))}
        </div>
    )
}

export default Mypost
