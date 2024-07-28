
import "./card.css"
import Respond from "./respond";
const Card = (props) => {

 
  return (
    <div className="container h-30 bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 text-black">
      <div className="header p-2.5 border-gray-300">
     <div className="flex justify-between  items-center w-full">
       
     <h3 className="bg-blue-600 px-3 py-1 text-white text-md font-semibold rounded-md category">{props.data.category}</h3>
      <h3 className="text-gray-600 text-md">{new Date(props.data.createdAt).toLocaleDateString()}</h3>
      
     </div>
      </div>
      <hr />
      <div className="info flex p-2 flex-col justify-between">
        <h1>Item Name: {" "}
        <span className="text-xl text-green-900 font-semibold">{props.data.name}</span></h1>
        <h3 className="text-gray-700 font-semibold text-lg">Posted by:{props.data.createdBy.username}</h3>
      </div>
      <hr />

      <div className="content p-2  mt-2">
        
          <img className="left-image  md:w-1/2 object-cover rounded-lg" src={props.data.image} alt={props.data.image} />
        <div className="right flex-1 ">
        <h3 className="font-medium mb-1 text-lg" >Description:</h3>
          <p className="mb-2 text-gray-700 ">{props.data.description}</p>
          
         
      
            <h3 className="flex items-center gap-2">Status:{" "}
            {props.data.status?<img src="claimed.avif" className="right-0 w-24 h-24 object-cover" style={{}}/>: <span className="text-md text-red-500 font-medium"><h2 className="text-md">moderate</h2></span>}</h3>
          
  
     
         
         
          


          <span className="text-md text-red-500 font-medium"><h4 className="text-gray-600 mb-2"><b>Email</b>:{" "}{props.data.createdBy.email}</h4></span>

         
         {!(props.data.status)&&<Respond required={true} receiver={props.data.createdBy._id} type={props.data.category === 'lost' ? 'respond' : 'claim'}  id={props.data._id} />}
        
        </div>
      </div>
    </div>
   
   
  );
};

export default Card;
