import mongoose,{Schema} from "mongoose"

const messageSchema=new Schema({
    item:{
        type:Schema.Types.ObjectId,
        ref:"Item"
        
    },
    messenger:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
        
    },
    message:{
        type:String
    },
    proof:{
        type:String,
        default:""
    },
    receiver:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
        
    },
    contact:{
        type:String
    }


},
{timestamps:true})
messageSchema.index({item:1,receiver:1,messenger:1})

export const Message=mongoose.model("Message",messageSchema)