var express=require("express");
var loginRouter=express.Router();
var path=require("path");
var jwt=require("jsonwebtoken");


var {checkUserCredentials,addUser}= require("../controller/userController")



loginRouter.get("/",(request,response)=>{
    var filePath=path.join(request.rootFolder,"public","login.html");
    response.sendFile(filePath);
})

loginRouter.post("/",(request,response)=>{
    
    var userToBeChecked={userName:request.body.txtUserName,password:request.body.txtPassword};
    var result=checkUserCredentials(userToBeChecked);
    if(result.msg )
    {
        // username and password are correct
        // generate the token and send it to the client
        const payload={userName:userToBeChecked.userName};
        const secret=process.env.secret;
        const options={expiresIn:"2d",issuer:"http://localhost"};
        jwt.sign(payload,secret,options,(err,token)=>{
            if(err)
            {
                response.status(500).send(err);
            }
            else
            {
                response.send({msg:"User authenticated",token:token});
            }
        })
        
    }
    else
    {
        response.send("Username and password do not match");
    }
    
})

module.exports=loginRouter;