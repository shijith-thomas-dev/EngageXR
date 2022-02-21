// Importing the module
const express= require("express")
const logger = require("../config/winston.config")
const UserService = require("../services/user.service")
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth.middleware")

// Creating express Router
const router=express.Router()
  
// Handling login request
router
.post("/register", (req,res)=>{
    logger.info("Inside the create user")
    const {Email, Password} = req.body
    if (!(Email && Password)){
        return res.status(400).send({
            "msg": "Failed",
            "reason": "Email and Password are mandatory input"
        })
    }
    
    let result = UserService.createUser(req.body)
    result.then(data=>{
        if (data.hasOwnProperty('errors')) {
            throw data["errors"][0]["message"]
        }
        
        logger.info("Creating the user with token")
        return res.status(201).json({
            "msg": "Success",
            "data": data
        })
    })
    .catch(err => {
        logger.error(JSON.stringify(err))
        if (err.hasOwnProperty('errors')) {
            err =  err["errors"][0]["message"]
        }
        if (err.hasOwnProperty('parent')) {
            err =  err["parent"]["detail"]
        }
        return res.status(400).json({
            "msg": "Failed",
            "reason": err
        })
    })
    
   
})
.post("/login", async (req,res) => {
    const {Email, Password} = req.body

    // Validate user input
    if (!(Email && Password)) {
        res.status(400).send("All input is required");
    }

    // Validate if user exist in our database
    const user = await UserService.getUserByEmail(Email);

    if(user){
        if (user.length == 1 && user[0]["Password"] === Password ){
            const token = jwt.sign(
                { user_id: user.id, Email },
                `${process.env.TOKEN_KEY}`,
                {
                  expiresIn: "1h",
                }
              );
        
            // save user token
            user.token = token;
            
            // user
            res.status(200).json({
                "msg": "Success",
                "data": user,
                "token": token
            });
        }
        else{
            res.status(401).json({
                "msg": "Failed",
                "reason": "Login Failed"
            }) 
        }
        
    }
    else{
        res.status(401).json({
            "msg": "Failed",
            "reason": "Login Failed"
        })
    }
})
.delete("/deregister", authMiddleware, (req,res) => {
    let result;
    
    result = UserService.deleteUserByEmail(req.body.Email) 
    
    result.then(data=> {
        if (data){
            return res.status(204).end()
        }
        throw 'unable_to_delete_user'
        
    })
    .catch(err => {
        return res.status(404).json({
            "msg": "Failed",
            "reason": err
        })
    })
})


module.exports=router