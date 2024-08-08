import React from 'react'
import Respond from './respond';

const  Scard= (props) => {
  

  console.log(props)
  return (
    
      <div className='  card' style={{width:'20rem'}}>
     <div>
     <img  src={props.data.image==="image file not found"?  "https://pbs.twimg.com/media/CGlWZuUWcAEbgKl.jpg":props.data.image } className="card-img-top" alt="..." />
     </div>
      <div className="card-body">
    <h5 className="card-title capitalize">{props.data.name}</h5>
    <p className="card-text">{props.data.description}</p>
    <br />
  
   
   {!props.data.status? <button><Respond  receiver={props.data.createdBy}   id={props.data._id} status={props.data.status}/></button>:<span className=' text-blue-500 text-xl capitalize '><h2>it has been claimed</h2></span>
   }
    
  </div>
</div>
   

    
  )
 

}

export default Scard;
