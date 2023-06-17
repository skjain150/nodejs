var express=require("express");
var productRoute=express.Router();

var {getAllProducts}=require("../controller/productController");
productRoute.get("/",async (request,response)=>{
   var result= await getAllProducts();
   response.status(result.statusCode).json(result.msg);
})
productRoute.get("/:pId",()=>{
  var productId=request.params.pId;
    if(!productId)
    {
        response.send("productId missing, details could not be fetched");
    }
    else
    {
        var result=getProduct(productId);
        response.status(result.statusCode).send(result.data);
    }
})

productRoute.post("/",async(request,response)=>{
     var productToBeInserted=request.body;
     var result=await insertProduct(productToBeInserted);
     response.status(result.statusCode).send(result.msg)
})
productRoute.put("/:pId",async (request,response)=>{
    var productToBeUpdated=request.params.pId;
    var productToBeUpdated=request.body;
    if(productToBeUpdated)
    {
      if(productToBeUpdated==productToBeUpdated.productId)
      {
         var result=await updateProducts(productToBeUpdated);
         console.log("result in product route",result);
         response.status(result.statusCode).send(result.msg);
      }
      else{
        response.send("ProductId in the param and the body not match ")
      }
    }
    else{
      response.status(400).send("productId missing in param,product could not")
    }
})
productRoute.delete("/:pId",()=>{
  var productDataTobeDeleted=request.params.pId;
    if(productDataTobeDeletedDataTobeDeleted)
    {
        var result=deleteproduct(productDataTobeDeletedDataTobeDeleted);
        response.status(result.statusCode).send(result.data);
    }
    else
    {
        response.send("product to be deleted is missing in the params");
    }
})

module.exports=productRoute;