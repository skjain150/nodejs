//Assignment 3 : Create a new directory : log07062023; Create a new file with the name dailyLog.log and add the content : "07/06/2023"
const fs = require("fs");
const directoryName="log08062023";
const fileContent ="08/06/2023";
const generateddirectoryName="log"+new Date().toLocaleDateString();
//(new Date.getDay()+new Date.getYear()
//console.log(generateddirectoryName);

//create the directory
fs.mkdir("directoryName",(err) => {
 if(err)
 {
   console.error("an error:",err);
 }else{
   console.log("directory created");
//create the file inside the directory
 fs.writeFile(`${directoryName}/${fileName}`,fileContent,(err) =>{
  if(err)
  {
   console.error("an error:",err);
  }else
  {
   console.log("file created successfully");
  }
 });
}
}); 
