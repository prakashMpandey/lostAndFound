import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js"

export default  checkUserAcess=asyncHandler(async(req,res,next)=>{
   try {
     if(req.user.role!="organiser")
         {
             throw new ApiError(400,"unauthorized access")
         }
     
     next()
   } catch (error) {
    throw new ApiError(400,"user is not authorized")
    
   }
})
