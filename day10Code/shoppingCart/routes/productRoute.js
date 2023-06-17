var express=require("express");
var productRouter=express.Router();

var {getAllProducts,updateProducts,insertProduct}=require("../controller/productController")

productRouter.get("/",async (request,response)=>{
    var result=await getAllProducts();
    response.status(result.statusCode).json(result.msg);
})
productRouter.get("/:pId",(request,response)=>{
   

})
productRouter.post("/",async (request,response)=>{
    var productToBeInserted=request.body;
    var result=await insertProduct(productToBeInserted);
    response.status(result.statusCode).send(result.msg)


})
productRouter.put("/:pId?",async (request,response)=>{
    var productIdToBeUpdated=request.params.pId;
    var productToBeUpdated=request.body;
    if(productIdToBeUpdated)
    {
        if(productIdToBeUpdated == productToBeUpdated.productId )
        {
            var result= await updateProducts(productToBeUpdated);
            console.log("Result in productRoute",result);
            response.status(result.statusCode).send(result.msg);
        }
        else
        {
            response.status(400).send("ProductId in the params and the body section do not match")
        }
    }
    else
    {
        response.status(400).send("Product Id missing in the params, product could not be updated");
    }
})
productRouter.delete("/:pId",(request,response)=>{})

module.exports=productRouter;
