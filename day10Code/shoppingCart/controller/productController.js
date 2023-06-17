var {updateOneDoc,insertOneDoc,findAllDocs}=require("../model/productModel.js")


async function getAllProducts()
{
   var res=await findAllDocs();
   return res;
}
async function updateProducts(productToBeUpdated)
{
    try
    {
    var result=await updateOneDoc(productToBeUpdated);
    console.log("PUT request result in controller",result);
    return result;
    }
    catch(err)
    {
        console.log("Error ",err);
        returnData = { statusCode: 400, msg: err };
        return (returnData);
    }
}

async function insertProduct(productToBeInserted)
{
    try
    {
    var res=await insertOneDoc(productToBeInserted);
    return res;
    }
    catch(err)
    {
        console.log("Error ",err);
        returnData = { statusCode: 400, msg: err };
        return (returnData);
    }


}

module.exports={updateProducts,insertProduct,getAllProducts};