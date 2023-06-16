var express=require("express");
var path=require("path");
const PORT=3000;
var app=express();

//handle the various endpoints
app.get("/",(request,response)=>{
    response.send("request received thanks!!");
})

app.get("/image",(request,response)=>{
    //send an image as a response -readFile,stream
    var filePath=path.join(__dirname,"avni.png");
    response.sendFile(filePath);
})

app.get("/toc",(request,response)=>{
    //send an pdf as a response -readFile,stream
    var filePath=path.join(__dirname,"toc.pdf");
    response.sendFile(filePath);
})

app.get("/home",(request,response)=>{
    //send a homepage as a response -readFile,stream
    var filePath=path.join(__dirname,"index.html");
    response.sendFile(filePath);
})

app.get("/emp",(request,response)=>{
    //send a json as a response -readFile,stream
    response.json(empArr);
})

app.listen(PORT,(err)=>{
    console.log(`server is running at ${PORT}`);
    console.log(app);
}
)