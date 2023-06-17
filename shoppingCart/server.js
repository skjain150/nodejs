//imports
var express=require("express");
var fs=require("fs");
var path=require("path");
var morgan=require("morgan");

var empRouter= require("./routes/employeeRoute");
var productRoute=require("./routes/productRoute");
// initialisations
const PORT=3000;


var app=express();

// configuration set up
app.set("port",PORT);

// middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(express.static("public"));
app.use(morgan("dev"));// for logging purpose

console.log("Hello");
// endpoints or routes
app.use("/employee",empRouter);
app.use("/product",productRoute);

//app.use("/login",empRouter);
app.get("/",(request,response)=>{
    // return the home page
    var filePath=path.join(__dirnamee,"public","index.html")
    response.sendFile(filePath);
})


// boot up server
app.listen(PORT,(err)=>{
    if(!err)
    {
        console.log(`Server is running at port : ${PORT}`);
    }
    else
    {
        console.log(err)
    }
})





