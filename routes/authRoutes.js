import express from "express";
import { registerController,
        loginController,
        testController,
        forgotPasswordController,
        updateProfileController
      
     } from "../controllers/registerController.js";
import { isAdmin,requireSignIn } from "../middlewares/authMiddleware.js";
// import  { forgotPasswordController } from "./../controllers.authController";

// router object
const router = express.Router();


// routing 
// register

router.post("/register", registerController);

// login || post
router.post("/login", loginController);

//  forgot-password 
router.post("/forgot-password", forgotPasswordController

);
// test route
router.get("/test", requireSignIn, isAdmin , testController);

// protected user route auth
router.get("/user-auth", requireSignIn, (req,res) => {
        res.status(200).send({ ok: true });
});

// protected admin route auth
router.get("/admin-auth", requireSignIn,isAdmin ,(req,res) => {
        res.status(200).send({ ok: true });
});


// update profile 
router.put("/profile", requireSignIn, updateProfileController);


export default router;


