import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import {Item} from "../models/item.model.js"
import { Message } from "../models/message.model.js"
import {  uploadOnCloudinary } from "../utils/cloudinary.utils.js"
import nodemailer from "nodemailer"
import { User } from "../models/user.model.js"
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'prakashmanipandey685@gmail.com', 
        pass: '' 
    }
});
const sendEMail=async (to, subject, text)=>{
    try {
        const info={from: 'prakashmanipandey685@gmail.com', // Sender address
        to: to, 
        subject:"A new response received for your item",
        text:"a new response for your posted item is received on lost and found.com ,you can have a look about it as soon as possible",
 }
        
        await transporter.sendMail(info)

    
    } 
    catch (error) {
        
    }

}
const writeMessage=asyncHandler(async(req,res)=>{
   try{
    const { itemId, receiver } = req.params;

    
    if (!itemId || !receiver) {
        throw new ApiError(400, "Item ID and receiver are required.");
    }
    const { message, contact } = req.body;
    if (!(message || contact)) {
        throw new ApiError(400, "At least one of message or contact must be provided.");
    }

 
    const proofLocalPath = req.file?.path;
    if (!proofLocalPath) {
        throw new ApiError(400, "Proof image is required.");
    }
    const item = await Item.findById(itemId);
    if (!item) {
        throw new ApiError(404, "Item not found.");
    }

   
    
    const cloudinaryImage = await uploadOnCloudinary(proofLocalPath);
    if (!cloudinaryImage) {
        throw new ApiError(500, "Failed to upload image.");
    }

    const receiverUser = await User.findById(receiver);
    if (!receiverUser) {
        throw new ApiError(404, "Receiver not found.");
    }

 
    const newMessage = await Message.create({
        message,
        proof: cloudinaryImage.url || "",
        contact,
        messenger: req.user,
        receiver: receiverUser||item.createdBy,
        item: item
    });

    // Respond with the new message
    if (!newMessage) {
        throw new ApiError(503, "Failed to create new message.");
    }

    return res.status(200).json(new ApiResponse(200, newMessage, "New message received."));
} 
catch (error)
 {
    return res.status(error.statusCode || 500).json(new ApiError(error.statusCode || 500, error.message || "Server error."));
}



    
})

const deleteMessage=asyncHandler(async(req,res)=>{
    const {messageId}=req.params
    
    if(!messageId) {console.log("no message id found")}
    
    const deletedMessage=await Message.findByIdAndDelete(messageId)

    console.log(deleteMessage)
    return res.status(200).json(new ApiResponse(200,{},"message deleted successfully"))
    
    
})

const editMessage=asyncHandler(async(req,res)=>{
 
    try {
         const {messageId}=req.params
         
       const {message,contact}=req.body
       
       if(!(message||contact))
       {
        console.log("no field found")
       }

       let prooflocalPath=req.file?.path
       let proof
       if(prooflocalPath){proof=await uploadOnCloudinary(prooflocalPath)}
    
       const newMessage=await Message.findByIdAndUpdate(messageId,{$set:{message:message,contact:contact,proof:proof?.url}})
    
       if(!newMessage)
       {
        console.log("message not found")
        return 0
       }
       
       return res.status(200).json(new ApiResponse(200,newMessage,"message updated successfully"))
    } catch (error) {
        return res.status(500).json(new ApiError(500,"server down hai"))
    }
       
})
const getAllMessages=asyncHandler(async(req,res)=>{
    
    const {itemId}=req.params

    console.log(itemId)

    const messages=await Message.find({item:itemId})
    console.log(messages)
        
    })
const getAllMyMessages=asyncHandler(async(req,res)=>{
    const messages=await Message.find({receiver:req.user._id}).populate('item').populate('messenger',"username _id email").exec()
console.log(messages)
return res.json({data:messages})
console.log(req.user)
})

export {getAllMessages,writeMessage,editMessage,deleteMessage,getAllMyMessages}