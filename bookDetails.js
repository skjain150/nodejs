//Assignment 6: IN a seperate file : books.json: 10 books details
//get -- return the books in books.json
//post -- add a new book after validation to file books.json
//put and delete -- respective task;  

const http = require("http");
const fs = require("fs");
const url = require("url");
const qs = require("querystring");
//const path = require('book.json');  

const PORT = 3000;
const hostname = "localhost";


var app = http.createServer((request, response) => {
    if (request.method == "PUT") {
        if (request.url == "/book") {
            var fullData="";
            request.on("data",(chunk)=>{
                fullData +=chunk.toString();
            })
            request.on("end",()=>{
                var bookToBeUpdated =JSON.parse(fullData);
                console.log(bookToBeUpdated);

                var obj;
                fs.readFile('book.json','utf8', function(err,data){
                    if(err) throw err;
                    obj=JSON.parse(data);
                    var pos =obj.findIndex(item => item.bookId ==bookToBeUpdated.bookId);
                    console.log(pos);
                    if(pos >=0){
                        obj[pos].bookId=bookToBeUpdated.bookId;
                        obj[pos].bookName=bookToBeUpdated.bookName;
                        obj[pos].bookPrice=bookToBeUpdated.bookPrice;
                        
                        fs.writeFile("book.json",JSON.stringify(obj),(err)=>{
                         if(err){
                            console.log(`Error while writing:${err}`);
                        }
                        else{
                            console.log("write succesful")
                            response.end(JSON.stringify(obj));
                        }
                    }
                        )}
            else{
                response.end("Book id not exist.");
                    }
                });
            response.on("error",(err)=>{
                response.statusCode=401;
                response.end(`error :${err}`);
            })
        })
            response.end("PUT request completed")
        }
    }
    else if(request.method =="POST"){
        if(request.url =="/book"){
            var fullData="";
            request.on("data",(chunk)=>{
                fullData +=chunk.toString();
            })
            request.on("end",()=>{
                var bookToBeInserted =JSON.parse(fullData);
                console.log(bookToBeInserted);

                var obj;
                fs.readFile('book.json','utf8',function(err,data){
                    if(err) throw err;
                    obj=JSON.parse(data);
                    var pos =obj.findIndex(item => item.bookId ==bookToBeInserted.bookId);
                    console.log(pos);
                    if(pos >=0){
                        response.end("bookID already exist");
                    }
                    else{
                        obj.push(bookToBeInserted);
    
                        fs.writeFile("book.json",JSON.stringify(obj),(err) => {
                         if(err){
                            console.log(`Error while writing:${err}`);
                        }
                        else{
                            console.log("write succesful")
                            response.end(JSON.stringify(obj));
                        }
                    })
                }
                
            },
            request.on("error",(err)=>{
                response.statusCode=401;
                response.end(`error :${err}`);
            })
                )
        })

            }        else{
            response.end("POST request not allowed")
            }
        }
else if(request.method =="DELETE"){
    if(request.url =="/book"){
        var fullData="";
        request.on("data",(chunk)=>{
            fullData +=chunk.toString();
        })
        request.on("end",()=>{
            var bookToBeDeleted =JSON.parse(fullData);
            console.log(bookToBeDeleted);

            var obj;
            fs.readFile('book.json','utf8',function(err,data){
                if(err) throw err;
                obj=JSON.parse(data);
                var pos =obj.findIndex(item => item.bookId ==bookToBeDeleted.bookId);
                console.log(pos);
                if(pos >=0){
               obj.splice(pos,1);
            
                fs.writeFile("book.json",JSON.stringify(obj),(err)=>{
                    if(err){
                     console.log(`Error while writing:${err}`);
                     }
                    else{
                    console.log("delete succesful")
                    response.end(JSON.stringify(obj));
                        }
                    })   
            }
            else{
                response.end("bookID not exist");
                }
            }
        );
        request.on("error",(err)=>{
            response.statusCode=401;
            response.end(`error :${err}`);
        })
    }
        )
}
     else{
             response.end("DELETE request not allowed")
         }
}
    else if (request.method == "GET") {
        if (request.url == "/book"){
            const rStream = fs.createReadStream("book.json");
            rStream.pipe(response);
        }
        else if (request.url == "/") {
            console.log("Inside get request for /")
            console.log("After reading the file successfully")
              response.end("this is home page");
                }
            }
        else {
            response.write("hello");
            response.write("request receieved thanks!");
            response.end("bye");
        } 
    }
            )   
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})
        