import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import dotenv from "dotenv";


dotenv.config();


cloudinary.config({ 
 cloud_name:process.env.CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        const uploadOptions={
            resource_type:"image",
            timeout:100000
        }
        
        if (!localFilePath) return null

        console.log(localFilePath)
        const response = await cloudinary.uploader.upload(localFilePath, {uploadOptions})
        
        
        fs.unlinkSync(localFilePath) 
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) 
       
        return error
    }
}

const deleteOnCloudinary= async(publicURL) =>{
    try {
            const publicId = publicURL.split("/").pop().split(".")[0];
            console.log(publicId)
            const response =await cloudinary.uploader.destroy(publicId, (result)=>{ console.log(result) });
        
            return response

    } catch (error) {
        return error
    }
    
    }

export {uploadOnCloudinary,deleteOnCloudinary}