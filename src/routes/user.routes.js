import {deleteAccount,registerUser,logOutUser,loginUser,changeDetails,changePassword, loggedInUser} from "../controllers/user.controller.js"
import { Router } from "express"
import {upload} from "../middlewares/multer.middleware.js"
import { verifyToken } from "../middlewares/authentication.middleware.js"

const router=Router()
router.route("/register").post(upload.none(),registerUser)
router.route("/login").post(upload.none(),loginUser)
router.route("/logout").get(verifyToken,logOutUser)
router.route("/DeleteAccount").get(verifyToken,deleteAccount)
router.route("/loggedIn").get(verifyToken,loggedInUser)


export default router