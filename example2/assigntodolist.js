//Assignment 7:Create a server using express
//Todo obj : description, data, status(complete/pending),todoId
//Create a todo app.

var express=require("express");
var path= require("path");// core module
var fs=require("fs");

const PORT=3000;
var taskArr=[{taskId:101,taskDis:"login",data:"office1",status1:"inprogress"},
{taskId:102,taskDis:"checkmails",data:"office1",status1:"complete"},
{taskId:103,taskDis:"officework",data1:"office3",status1:"pending"},
{taskId:104,taskDis:"Teammeeting",status1:"complete"},
{taskId:105,taskDis:"lunch",status1:"pending"}];

var logPath=path.join(__dirname,"log","dailyLog2.log")
var wStream=fs.createWriteStream(logPath,{flags:"a"});

var app=express();

//inbuilt middleware: 
app.use(express.urlencoded());
app.use(express.json());

app.use(express.static("public"));

app.use((request,response,next)=>{
    wStream.write(`\n${request.method};${request.url}; ${new Date()}`);
    next();
})
//various endpoints 

app.delete("/task",(request,response)=>{
    var taskToBeDeleted=request.body;
    if(taskToBeDeleted !={})
    {
        if(taskToBeDeleted.taskId)
        {
        var pos=taskArr.findIndex(item => item.taskId == taskToBeDeleted.taskId);
        if(pos >=0)
        {
            taskArr.splice(pos,1);
            response.send("task deleted successfully");
        }
        else
        {
            response.send("No record found");
        }
    }
    else
    {
        response.send("taskId to be deleted is missing")
    }
    }
})

app.put("/task/markcomplete/:taskId",(request,response)=>{
   
    var taskToBeUpdated=request.body;
    
    if(taskToBeUpdated != {})
    {
        if(taskToBeUpdated.taskId)
        {
            // check for the existence of the record in Array
                var pos= taskArr.findIndex(item => item.taskId == taskToBeUpdated.taskId)
                if(pos >=0)
                {
                    // record is present
                    taskArr[pos].status1='complete';
                    response.send("Data has been updated successfully")
                }
                else
                {
                    // record is not present
                    response.send("No record found with the matching taskId");
                }
            }
            else
            {
                response.status(400).send("not match");
            }

        }
        else
        {
            response.status(400).send("task Id missing in the data to be updated");
        }
    }) 

/*app.get("/task",(request,response)=>{
    //http://localhost:3000/task?taskId=101
    
    response.send(`taskId : ${request.taskId}, taskdis : ${request.taskDis}}`);   
    
})

/*app.get("/login",(request,response)=>{
    var filePath=path.join(__dirname,"public","login.html");
    response.sendFile(filePath);
})  */
app.post("/task",(request,response)=>{
    var taskDataTobeInserted=request.body;
    console.log("task to be inserted",taskDataTobeInserted);
    if((taskDataTobeInserted != {}))
        if(taskDataTobeInserted.taskId)
     {
         var pos=taskArr.findIndex(item => item.taskId ==taskDataTobeInserted.taskId);
         if(pos >=0)
         {
            // record already exists;
             response.status(400);
             response.send("task Id to be inserted already exists");
         }
         else
         {
             // insertion allowed
             taskArr.push(taskDataTobeInserted);
             console.log("task arr",taskArr);
             response.json(taskArr);
         }
     }
     else
     {
         response.status(400).send("Please enter the task Id.. taskId misssing")
     }
    
})   

app.get("/",(request,response)=>{
    response.send("Request received Thank U !!!!!!!");
})

app.get("/home",(request,response)=>{
    var filePath=path.join(__dirname,"index.html");
    response.sendFile(filePath);
})  

app.get("/task",(request,response)=>{
    response.json(taskArr);
})  

app.listen(PORT,(err)=>{
    console.log(`Server is running at ${PORT}`);
    //console.log(app);
}) 