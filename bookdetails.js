//Assignment6 :IN a seperate file : books.json: 10 books details
//get -- return the books in books.json
//post -- add a new book after validation to file books.json
//put/delete -- respective task;  

const http = require("http");
const fs = require("fs");
const url = require("url");
const qs = require("querystring");

const PORT = 3000;
const hostname = "localhost";

var app = http.createServer((request, response) => {
    console.log("Request method url");
        var bookArr=[JSON.parse(jsonString)];
        console.log(`Customer address is:", ${jsonString}`);
       
        if (request.method == "GET") {
            console.log("Inside get request for /")
            if (urlObject.pathname == "/book") {
            // http://localhost:3000/book?bookId=101
            console.log("Query string", urlObject.query);
            var queryStringObject = qs.parse(urlObject.query);
            console.log("Query string object", queryStringObject);
            var { bookId } = queryStringObject;
                 var pos = bookArr.findIndex(item => item.bookId == bookId);
                 response.end(JSON.stringify(bookArr[pos]));
            }
            else if(request.method == "PUT"){
              if(request.url =="/addBook"){
                var data="";
                    request.on('data',(chunk)=>{
                        data += chunk.toString();
                    });
                    request.on("end",()=>{
                        data=JSON.parse(data);
                        const pos = bookArr.findIndex((item)=> item.bookId == data.bookId);
                        if(pos >=0){
                            bookArr[pos]= data;
                            response.end(JSON.stringify(bookArr));
                        }else{
                            response.end("book is not found")
                        }
                        })
                    }
                    response.write("hello");
                    response.end();
                }
            }
        })

        if (request.method =="POST"){
            if(request.url =="/book"){
             var fullData ="";
             request.on("data",(chunk) =>{
              fullData += chunk.toString();
               })  
             request.on("end",() =>{
                var booktoBeInserted =JSON.parse(fullData);
                var pos = empArr.findIndex(item => item.bookId == empToBeInserted.bookId);
           
           if (pos >=0){
            response.end("bookId already exists, insertion could not be done");
           }
           else{
             empArr.push(bookToBeInserted);
             response.end(JSON.stringify(empArr));
           }
           })
           request.on("error",(err) =>{
             response.statusCode =401;
            response.end(`Error :${err}`);
           })
        }
    }
           
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})

/*fs.readFile("./book.json", "utf8", (err, jsonString) => {
        if (err) {
         console.log("Error reading file from disk:", err);
        return;
               }
        else {  */