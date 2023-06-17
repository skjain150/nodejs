var express=require("express");
var axios=require("axios");
var hbs=require("hbs");
const PORT=3002;
function getPort()
{
    return PORT;
}
var app=express();
// instantiations

// configuration setup
app.set("view engine","hbs");
hbs.registerHelper("addCurrency",function( value)
{
    return "Rs. "+value;
})

hbs.registerHelper("printAsMenu",function(menuItemsArr)
{
    var liArr=menuItemsArr.map(item => ("<li>"+item+"</li>"));
    var ulElement="<ul>"+liArr.join("\n")+"</ul>";
    return ulElement;
})
//any other folder which contains the views templates
//app.set("views","path to the folder containing the templates")

app.use(express.urlencoded({extended:false}));
app.use(express.json())

app.get("/",(request,response)=>{
    // connect to service jwt service and get the home page
    var serverUrl="http://localhost:3001/";
    axios.get(serverUrl)
    .then((responseFromJWT)=>{
        //console.log(responseFromJWT);
        response.send(responseFromJWT.data);
    })
    .catch((err)=>{
        response.send(err);
    })
});

app.get("/products",(request,response)=>{
    // get request to shopping cart project
    var serverUrl="http://localhost:3000/products";
    axios.get(serverUrl)
    .then((responseFromShoppingCart)=>{
        // response .data -- data in the json format
        response.json(responseFromShoppingCart.data);
        //var productsArr=responseFromShoppingCart.data;
        //response.render("products",{productsArr:productsArr})
    })
    .catch((err)=>{
        response.send(err);
    })
})

app.post("/products",(request,response)=>{
    var serverUrl="http://localhost:3000/products";
    var productToBeAdded=request.body;
    axios.post(serverUrl,productToBeAdded)
    .then((responseFromShoppingCart)=>{
        var msg=responseFromShoppingCart.data;
        response.send(msg);
    })
    .catch((err)=>{
        response.send(err);
    })
})

app.get("/about",(request,response)=>{
    var companyDetails={
        companyName:"DXC",
        location:"India"
    }
    var menuArr=["About","Login","Signup","Products"]
    response.render("about",{menuArr:menuArr,companyDetails:companyDetails});

})
app.listen(PORT,()=>{
    console.log("Server starting up at Port :"+PORT)
})

module.exports={app,getPort};