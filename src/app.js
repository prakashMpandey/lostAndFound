import express,{json} from "express"
import cookieParser from "cookie-parser"

import cors from "cors"

const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true

}))
app.use(json({
    limit:"15kb"
}))
app.use(express.urlencoded({extended:true,limit:"15kb"}))

app.use(express.static("public"))
app.use(cookieParser())


//routes
import userRouter from "./routes/user.routes.js"
import itemRouter from "./routes/item.routes.js"
import messageRouter from "./routes/message.routes.js"
app.use("/api/v1/user",userRouter);
app.use("/api/v1/post",itemRouter)
app.use("/api/v1/post",messageRouter)
export {app}

