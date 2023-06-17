const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://skjain1602:San15ask@cluster0.fm6y7x6.mongodb.net/?retryWrites=true&w=majority";

const mongoClient = new MongoClient(uri);
var returnData ={};


async function updateOneDoc(productToBeUpdated){
    try{
        var client = await mongoClient.connect();
        console.log("connected successfully to the client");
        var dbName = client.db("DXCDB");
        var collName = dbName.collection("products");
        var filterDoc = {productId:productToBeUpdated.productId};
        var updateDoc ={ $set: {price: productToBeUpdated.price}};
        var result=await collName.updateOne(filterDoc,updateDoc)
    console.log("result: " ,result);
    console.log("inside model file")
        if (result.matchedCount == 0 && result.modifiedCount==0){
                returnData ={ statusCode: 200, msg: "No matching documents"}
                return(returnData);
            }
            if(result.matchedCount == 1 && result.modifiedCount==0){
                returnData ={statusCode:200, msg:"matched document found"}
                return(returnData);
            }
            if(result.matchedCount == 1 && result.modifiedCount==1){
                returnData ={statusCode:200, msg:"updated succesful"};
                return(returnData);
            }
            mongoClient.close();
        }
        
    catch(err) {
        console.log(`Error : ${err})`);
        returnData ={statusCode:400,msg:err};
        return(returnData);
    }

    async function deleteOneDoc(collName) {
        try {
            var client = await mongoClient.connect();
            console.log("Connected successfully to the client");
            var dbName = client.db("DXCDB");
            var collName = dbName.collection("products");
            var doc =
                { productId: "P203" }
    
            collName.deleteOne(doc).then((res) => {
                if (res.deletedCount == 1) {
    
                    return ("Deletion is successfull!!", res);
                }
                else {
                    return ("No matching record found to be delete");
                }
            })
                .catch((err) => {
                    console.log(err);
                })
    
            mongoClient.close();
        }
        catch (err) {
            console.log(`Error : ${err})`);
        }
    
    }

async function findProductsById(collName) {
    //var filterDoc={productId:"P101"};

    //var filterDoc ={price : {$gt:10000,$lt:20000}};
    /*
    // function which returns all the docs which have the word "iphone" in the name and price > 10000

     var filterDoc = {
        $and: [
            { name: /iphone/i },
            { price: { $gt: 10000 } }
        ]
    } 
    */
    try {
        var client = await mongoClient.connect();
        console.log("Connected successfully to the client");
        var dbName = client.db("DXCDB");
        var collName = dbName.collection("products");
        //findProductsById(collName);
        mongoClient.close();
    }
    catch (err) {
        console.log(`Error : ${err})`);
    }
    var projectionDoc = { _id: 0 }
    var cursor = collName.find(filterDoc, { projection: projectionDoc });
    var productsArr = await cursor.toArray();
    console.log("Docs with filter doc : ", filterDoc, "Is", productsArr);
}
    

// insert a single doc
async function insertOneDoc(productToBeInserted) {
    try {
        var client = await mongoClient.connect();
        console.log("Connected successfully to the client");
        var dbName = client.db("DXCDB");
        var collName = dbName.collection("products");
        var res=await collName.insertOne(productToBeInserted)
            if (res.insertedId) {
            var returnData={statusCode:200,msg:"Product inserted successfully with productId:"+productToBeInserted.productId};
              return (returnData)
            }
            else
            {
                var returnData={statusCode:400,msg:"Product could not be inserted with productId:"+productToBeInserted.productId};
                return (returnData);
            }
        mongoClient.close();
    }
    catch (err) {
        console.log(`Error : ${err})`);
        returnData = { statusCode: 400, msg: err };
        return (returnData);

    }   
}
/*async function insertOneDoc(collName) {
    var docsToBeInserted = { productId: "P401", price: 16666, name: "Google pixel" };
        
    collName.insertOne(docsToBeInserted)
        .then((res) => {
            console.log("Result", res);
            if(res.insertedId)
            {
                console.log("Document inserted successfully")
            }
            
        })
        .catch((err) => {
            console.log(`Error : ${err})`);
        })
}  */
async function findAllDocs() {
    try {
        var client = await mongoClient.connect();
        console.log("Connected successfully to the client");
        var dbName = client.db("DXCDB");
        var collName = dbName.collection("products");
        //await insertDocs(collName);
        var cursor = collName.find();// return all the docs
        var productsArr = [];
        productsArr = await cursor.toArray();
        console.log("Products Array ", productsArr);
        mongoClient.close();
        var returnData={statusCode:200,msg:productsArr};
        return productsArr;
    }
    catch (err) {
        console.log(`Error : ${err}`);
        returnData ={statusCode:400,msg:err};
    return(returnData);
    }
}
 

async function insertDocs(collName) {
    try {
        var client = await mongoClient.connect();
        console.log("Connected successfully to the client");
        var dbName = client.db("DXCDB");
        var collName = dbName.collection("products");
         //findProductsById(collName);
         mongoClient.close();
        }
        catch (err) {
            console.log(`Error : ${err})`);
        }
    var docsToBeInserted = [
        { productId: "P201", price: 6666, name: "Samasung flip" },
        { productId: "P202", price: 8888, name: "Samsung fold" },
        { productId: "P203", price: 78787, name: "Iphone 13" }
    ]
    collName.insertMany(docsToBeInserted)
        .then((res) => {
            console.log("Result", res);
            console.log("Number of docs inserted ",res.insertedCount)
        })
        .catch((err) => {
            console.log(`Error : ${err})`);
        })
}

async function run() {
    try {
        var client = await mongoClient.connect();
        console.log("Connected successfully to the client");
        var dbName = client.db("DXCDB");
        var collName = dbName.collection("products");
        //await insertDocs(collName);
        
        await insertOneDoc(collName);
        var cursor = collName.find();// return all the docs
        var productsArr = [];
        productsArr = await cursor.toArray();
        console.log("Products Array ", productsArr);

        //findProductsById(collName);
        mongoClient.close();
    }
    catch (err) {
        console.log(`Error : ${err}`);
    }
}
    }
    module.exports={updateOneDoc,insertOneDoc,findAllDocs}