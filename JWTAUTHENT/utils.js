const jwt=require("jsonwebtoken");

function validateToken(request,response,next)
{
    // custom middleware
    const authorisationHeader=request.headers.authorization;
    if(authorisationHeader)
    {
        const token=authorisationHeader.split(" ")[1];//bearer token
        const secret= process.env.secret;
        const options={expiresIn:"2d",issuer:"http://localhost"};
       jwt.verify(token,secret,options,(err,result)=>{
        if(err)
        {
            response.status(402).send(err);
        }
        else
        {
            request.authenticated=true;
            next();
        }
       })
    }
    else
    {
        response.status(201).send("Authorisation error, Token missing ")
    }
    
}

module.exports=validateToken;