import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import {Item} from "../models/item.model.js"
import { Message } from "../models/message.model.js"
import {  deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.utils.js"


const createPost=asyncHandler(async(req,res)=>{
    try {
        const {itemName,description,category}=req.body
        console.log(req)
        
        if(!(itemName||description||category)){
            console.log("no field found")
            throw new ApiError(400,"all fields are required")
        }
        console.log(itemName,description,category)
        
           const itemLocalPath=req.file?.path
        console.log("itemLocalPath",itemLocalPath)
           if(!itemLocalPath)
               {
                   console.log("item image is required")
                   console.log("image local path not found")
               }
       
           const cloudinaryImage=await uploadOnCloudinary(itemLocalPath)
           if(!cloudinaryImage)
               {
                   console.log("image url not found")
               }
               console.log("cloudinarry:",cloudinaryImage)
           
    
        const item= await Item.create({
            name:itemName,
            description:description,
            category:category,
          image:cloudinaryImage?.url ||"",
          createdBy:req.user
    
    
        })
        
        console.log(item)
        console.log(item.createdBy)
        const itemResponse=await item.populate("createdBy","username email")
        
        return res.status(200).json(new ApiResponse(200,itemResponse,"item posted successfully"))
    
    } catch (error) {
        return res.status(500).json(new ApiError(500,"tabiyat kuch kharab h"))
        
    }
})
const editPost=asyncHandler(async(req,res)=>{
   try {
     const {itemId}=req.params
     if(!itemId)
         {
             console.log("param id not found")
         }
  
     const {itemName,description}=req.body
     console.log(itemName,description)
     
     if(!(itemName||description))
         {
             console.log("no field specified")
             throw new ApiError(400,"no field specified")
         }
 
     const item=await Item.findByIdAndUpdate(itemId,{$set:{name:itemName,description:description}},{new:true})
     
     if(!item)
         {
             console.log("item does not exist")
         }
         console.log("item")
 
return res.status(200).json(new ApiResponse(200,item,"item details edited successfully"))
    
   } catch (error) {
    return res.json(new ApiError(501,"internal server error"))

    
   }
    

    

})
const deletePost=asyncHandler(async(req,res)=>{
    const {itemId}=req.params

    if(!itemId)
    {
        console.log("item id required")
    }

    const deletedItem=await Item.findByIdAndDelete(itemId);
    const deleteMessages=await Message.deleteMany({item:itemId})

    console.log("item deleted",deletedItem)
    
    deleteOnCloudinary(deletedItem.image)
console.log(deletedItem,deleteMessages)

res.status(200).json(new ApiResponse(200,deletedItem,"item deleted successfully"))

})
const getItemDetails= asyncHandler(async (req,res)=>{

  try {
      const {itemId}=req.params
  console.log(itemId)
      if(!itemId)
      {
          console.log("item id not received")
      }
  
      const item=await Item.findById(itemId)
      
      if(!item)
      {
          console.log('no item found')
      }
      console.log("item details",item)
  
     return res.status(200).json(new ApiResponse(200,item,"item details found"))
  } 
  catch (error) {
    
    return res.json(new ApiError(500,"unable to find item"))
  }
    
})

const getItems=asyncHandler(async(req,res)=>{
    try {
        const items=await Item.find().populate("createdBy","username email")
        if(!items)
        {
            console.log("items not found")
        }
    
        console.log("items found are",items)
    
     

        return res.status(200).json(new ApiResponse(200,items,"items found successfully"))
    } catch (error) {
        
        return res.json(new ApiError(500,"something went wrong")) 
    }

})

const getAllMyItems=asyncHandler(async(req,res)=>{
   try {
     const userID=req.user._id
 
     const items=await Item.find({createdBy:userID}).populate("createdBy","username email _id")
     
 
     if(!items)
     {
       return res.status(200).json(new ApiResponse(200,[],"no message found"))
     }
     
       
    return res.status(200).json(new ApiResponse(200,items,"items fetched successfully"))
 
   } catch (error) {
    return res.status(500).json(new ApiError(505,"dont know what's the problem"))
   }

})
const deleteAllMyPost=asyncHandler(async(req,res)=>{
    const {userID}=req.user._id
    
    const deletedItems=await Item.deleteMany({"informer":userID})
    
    return res.status(200).json(200,deletedItems,"all items deleted")
})
const searchItem=asyncHandler(async(req,res)=>{
   try {
     const  {query}=req.query
 
     if(!query)
     {
         console.log("no item name found")
         return null
     }
     const items=await Item.find({name:{$regex: query, $options: "i"}})
     if(!items)
     {
        console.log("item not found",items)
        return res.status(404).json(new ApiError(404,"no item found"))
 
     }
     console.log("search results",items)
 
     return res.status(200).json(new ApiResponse(200,items,"items found successfully"))
   } catch (error) {
    console.log("error")
    return res.status(504).json(new ApiError(504,"lunch time ke baad aana"))
   }
    
})

const claimItem=async(req,res)=>{
try {
    
        const itemID=req.params.itemId
        console.log("item id",itemID)
        const item=await Item.findById(itemID)
        if(!item)
            {
                console.log(item)
            }
        
            console.log("item",item)

            console.log(req.user._id,item.createdBy._id)

        // if(req.user._id!=item.createdBy._id)
        //     {
        //        throw new ApiError(400,"error occured")
        //     }
        


       
         if(item.status)
        {
         
          return 0;
        }
       
        item.status="true"
        await item.save({validateBeforeSave:false})

       return res.status(200).json(new ApiResponse(200,{item},"status changed successfully"))
       
    
} catch (error) {
    return res.status(500).json(new ApiError(500,'status cannot be changed'))
    
}
}





export {createPost,claimItem,editPost,deletePost,getItems,getAllMyItems,getItemDetails,deleteAllMyPost,searchItem}