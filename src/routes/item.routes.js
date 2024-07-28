import { Router } from "express"
import {upload} from "../middlewares/multer.middleware.js"
import { verifyToken } from "../middlewares/authentication.middleware.js"
import { claimItem, createPost,deleteAllMyPost,deletePost,editPost, getAllMyItems, getItemDetails, getItems, searchItem} from "../controllers/item.controller.js"
const router=Router()
router.route("/createitem").post(verifyToken,upload.single("image"),createPost)
router.route("/edititem/:itemId").post(upload.none(),editPost)
router.route("/getItems").get(verifyToken,getItems)
router.route("/itemDetails/:itemId").get(verifyToken,getItemDetails)
router.route("/myitems").get(verifyToken,getAllMyItems)
router.route("/deleteItem/:itemId").delete(verifyToken,deletePost)
router.route("/deletemyItems").delete(verifyToken,deleteAllMyPost)
router.route("/:itemId/claimItem").patch(verifyToken,claimItem)
router.route("/searchItem").get(verifyToken,searchItem)


export default router
