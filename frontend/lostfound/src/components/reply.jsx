import React from 'react'
import { useAuth } from '../store/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Respond from './respond'
import { useState } from 'react'
const Reply = (props) => {


  
const {getTokenFromLs}=useAuth()
const accessToken=getTokenFromLs()


  const userId=props.user._id

  

  



const deleteHandler=async function(){
    
   const response= await fetch(`http://localhost:3000/api/v1/post/deleteMessage/${props.data._id}`,{method:"delete",  headers: {Authorization:`Bearer ${accessToken}`}})
    console.log("delete ho gya")
    if(response.ok)
    {
      toast.success("message deleted successfully")
      props.onDelete(props.data._id)

    }
    else{
      toast.error("message cannot be deleted")
    }
   
  }


  


  const claimHandler=async()=>{

    
    const response=await fetch(`http://localhost:3000/api/v1/post/${props.data.item._id}/claimItem`,{method:"PATCH",headers:{Authorization:`Bearer ${accessToken}`}})
  
    if(!response.ok)
    {
      toast.error("it cannot be updated")
      throw new Error("failed to claim")
      
    }
     console.log(response)
    console.log("clicked")
    toast.success("message accepted")
    props.onClaim(props.data.item._id)
  }

  return(
    <div className="container overflow-hidden shadow-md rounded-md border-gray-200 flex flex-col text-wrap text-black" style={{width:"100%",marginBlock:"10px",boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease"}}>
      <div className="header border-gray-300">
      
      <h3 className="bg-blue-600 px-3 py-1 rounded-md category">{props.data.item.category}</h3>
      <h3>Date:{ new Date(props.data.createdAt).toDateString()}</h3>
      
      </div>
      <hr />
      <div className="info flex items-center justify-between">
        <h1 className='p-1'>Item Name:{" "} <span className="text-xl capitalize text-green-900 font-semibold">{props.data.item.name}</span></h1>
        <h3 className='p-1 capitalize '>response by:{" "}{props.data.messenger.username}</h3>
      </div>
      <hr />

      <div className="content flex-col  mt-1">
        
          <img className="left-image md:w-1/2 md:min-h-min"  src={props.data.proof} alt={props.data.proof} />
        <div className="right ">
        <h3 className="font-medium" >Response:</h3>
          <p className="mb-2 text-md text-gray-600">{props.data.message}</p>
          
        <div className='flex gap-2 items-center'>
        <h3 >Status:{" "}</h3>
          {props.data.item.status?<img  src="claimed.avif" className="  right-0 w-20 h-20 object-cover" style={{}}/>: <span className="text-md text-red-500 font-medium"><h2 className="text-md">moderate</h2></span>}

         </div>
          
          <div>
          <h3>Contact:</h3>
          <span><h4 className="my-1 text-gray-600 mb-2"><b>email</b>:{" "}{props.data.messenger.email}</h4></span>
          <h4 className=''><b>Phone:{" "}</b>{props.data.contact}</h4>
          </div>

        <div className='flex gap-2 justify-end'>
        {props.data.item.createdBy === userId && !props.data.item.status &&
          <button className='btn btn-secondary inline-block bg-orange-700 text-white' onClick={claimHandler}>
            {props.data.item.category === 'lost' ? 'accept' : 'claim'}
          </button>
        }  
       {!props.data.item.status&& <Respond receiver={props.data.messenger._id} id={props.data.item._id} type={props.data.item.category === 'lost' ? 'respond' : 'claim'}  />}
        <button className='btn btn-primary inline-block' onClick={deleteHandler}>Delete</button>
       
        </div>
        </div>
      </div>
    </div>
  )
}

export default Reply;
