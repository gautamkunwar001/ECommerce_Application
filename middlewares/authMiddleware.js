import JWT from "jsonwebtoken";
import userModels from "../models/userModels.js";

// protect Routes token base
// next function is used to validate user
// next execute after req and before response
export const requireSignIn = async (req, res, next) => {
    // tokens are avilable in headers and 
    // there is authorization 
   try{
    const decode = JWT.verify(
        req.headers.authorization,
         process.env.JWT_SECRET);
         req.user = decode;
         next();
   } 
     catch (error) {
      console.log(error);
    
   }
};

// admin access
export const isAdmin = async(req,res,next) => {
    try {
        const user =  await userModels.findById(req.user._id);
        if(user.role !== 1) {
            return res.status(404).send ({
                success: false,
                message: "Unauthorized Access",
            });
        } 
      else {
            next();
      }
        
    }
    catch(error) {
        console.log( error);
        res.status(401).send({
            success: false,
                error,
            message: "Error in admin middleware",
        });
    }
};
