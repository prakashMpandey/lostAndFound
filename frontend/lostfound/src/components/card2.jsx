
import "./card.css"
import Delete from "./delete";
import Respond from "./respond";
import Update from "./update";
const Card2 = (props) => {

    const handleDeleteOnSuccess=()=>{
        console.log(props.data._id)
        props.onDelete(props.data._id)

    }
    const handleUpdate=(updatedData)=>{
      if(props.onUpdate)
      {
        props.onUpdate(updatedData)
        console.log("updatedData")
      }
    }
    console.log(props)
 
  return (
    <div className="container  bg-white shadow-lg overflow-hidden border-gray-200 rounded-md text-black ">
      <div className="header  border-gray-300">
      <div className="border-gray-300 flex justify-between w-full items-center">
        <h3 className="bg-blue-600 py-2 px-3 text-white text-md font-semibold rounded-sm category">{props.data.category}</h3>
        <h3 className="text-gray-600 text-md">{new Date(props.data.createdAt).toLocaleDateString()}</h3>
      </div>
      
      </div>
      <hr />
      <div className="info p-2 flex flex-col gap-2">
        <h1 className="text-lg font-semibold">Item Name:{" "}
         <span className="text-xl text-green-900 font-bold">{props.data.name}</span></h1>
        <h3 className="text-gray-700">Posted by:{props.user.username}</h3>
      </div>
     

      <div className="content p-2 ">
        
          <img className="left-image object-cover rouded-lg md:w-1/2" src={props.data.image} alt={props.data.image} />
        <div className="right flex-1">
        <h3 className="font-medium mb-1 text-lg" >Description:</h3>
          <p className="text-gray-700 mb-2">{props.data.description}</p>
          
         
      
            <h3 className="flex items-center gap-1">Status:{" "}{props.data.status?<img src="claimed.avif" className="w-32 h-32 object-cover" style={{}}/>:<span className="text-md text-red-500 font-medium">moderate</span>}</h3>
          
  
           
         
         
          


          <span ><h4 className="text-gray-600 mb-2"><b>Email:</b>{props.user.email}</h4></span>

         
         {/* {!(props.data.status)&&<Respond  type={props.data.category === 'lost' ? 'respond' : 'claim'}  id={props.data._id} />} */}
         <div className="actions flex gap-2 justify-end">
          
         { !(props.data.status)&&<Update  id={props.data._id} onUpdate={handleUpdate} data={props.data}s/>}
           <Delete onSuccess={handleDeleteOnSuccess}  id={props.data._id}/> 
           </div>
         
        </div>
      </div>
    </div>
   
   
  );
};

export default Card2;

