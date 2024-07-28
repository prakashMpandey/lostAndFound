import mongoose,{Schema} from "mongoose";

const itemSchema= new Schema({
    name:{
        type:String,
       
        trim:true,
        required:true
    },
    description:{
        type:String,
        required:true
        
    },
   
    category:{
        type:String,
        enum:["lost","found"],
        default:true
        
     },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    
    image:{
        type:String,
        default:""
    },
    status:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

export const Item=mongoose.model("Item",itemSchema)