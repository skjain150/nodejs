//Assignment2: 1. Copy the contents of a file into another file: fs.copyFile
const fs = require('fs');
 
console.log("details of file1:",
    fs.readFileSync("text1.txt", "utf8"));
 
fs.copyFile("text1.txt", "text5.txt", (err) => {
    if (err) {
        console.log("Error :", err);
    } else {
        console.log("copied_file:",
            fs.readFileSync("text5.txt", "utf8"));
    }
});