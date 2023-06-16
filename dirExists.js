//Assignment4 : fs -- Check if a given directory exists or not
 // return a boolean value based on whether the dirName exists or not
var fs = require('fs');
fs.stat('./log8/6/2023', function(err) {
 if (!err) {
 console.log('file or directory exists');
 console.log(true);
 }
 else if (err.code === 'ENOENT') {
 console.log('file or directory does not exist');
 console.log(false);
 }
});

/*const fs=require("fs");
const directory="../sereverexp";

fs.access(directory,fs.constants.F_OK,(err)=>{
    if(err)
    {
        console.log(false)
    }
    else
    {
        console.log(true)
    }
})  */