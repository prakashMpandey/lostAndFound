import React from 'react'
import Scard from './searchCard.jsx'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../store/auth.jsx';
import { useState } from 'react';
const Search = () => {
  const {getTokenFromLs}=useAuth()
  const accessToken=getTokenFromLs()
  const location = useLocation();
  const {query } = location.state ;
  const [items, setItems] = useState([])
  const [loading, setLoading ]=useState(true)
useEffect(() => {
  console.log(query)
 const resultFunction=async ()=>{

  const data=await fetch(`http://localhost:3000/api/v1/post/searchItem?query=${query}`,{method:'get',headers:{Authorization:`Bearer ${accessToken}`}})
  setLoading(false)
  if(data.ok)
  {
  const result=await data.json()
  console.log(result)
  setItems(result.data)
 
  }
 }
 resultFunction()
},[query])

if(loading) return <div><h2>Loading...</h2></div>


  return (
    <div className='' style={{maxWidth:"70vw"}}>
       { items.length>0?<h1 className='text-2xl my-4'>Search Result found for <span className='font-semibold'>{query} -</span></h1>:<h1 className='text-2xl my-4'>no search result found for <span className='font-semibold'>{query} -</span></h1>}
       <div className='flex gap-2'>
         
       {     items.map((item) => (
           <Scard key={item._id }  data={item}/>
        
           
                    ))}
       </div>
  
      

    
    </div>
  )
}

export default Search
