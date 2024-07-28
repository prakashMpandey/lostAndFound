import { Router } from "express"
import {upload} from "../middlewares/multer.middleware.js"
import { verifyToken } from "../middlewares/authentication.middleware.js"
import { editMessage,getAllMyMessages, getAllMessages, writeMessage,deleteMessage } from "../controllers/message.controller.js"

const router=Router()

router.route("/:itemId/:receiver/writemessage").post(verifyToken,upload.single("proof"),writeMessage)
router.route("/editmessage/:messageId").post(verifyToken,upload.single("proof"),editMessage)
router.route("/deletemessage/:messageId").delete(verifyToken,upload.none(),deleteMessage)
router.route("/:itemId/messages").get(verifyToken,upload.none(),getAllMessages)
router.route("/messages").get(verifyToken,getAllMyMessages)
export default router
