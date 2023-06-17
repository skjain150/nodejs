//Assignment 5:Create a server and login screen login.html should get loaded
//Form : Username, password ; Submit

const http=require("http");
const fs=require("fs");
const PORT=3000;
const hostname="localhost"
var app=http.createServer((request,response)=>{

    if(request.method == "GET")
    {
        if(request.url == "/")
        {
           response.end("This is home page");
        }
        if(request.url == "/login")
        {
           const rstream=fs.createReadStream("login1.html");
            rstream.pipe(response);
        }
    }
        else
        {

        }
    });          

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})
