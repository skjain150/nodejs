const assert=require("assert");
const chai=require("chai");
const expect=chai.expect;
var request=require("supertest");

const {app,getPort}=require("../mainApp.js");

describe("app start",function()
{
    describe('checkForPORT', () => { 
        it("should return 3002",function()
        {
            var port=getPort();
            assert.strictEqual(port, 3002)

        })
     })
})

describe("Products",function(){
    describe("GET /Products", function()
    {
        it("should return 200 ok with several products",async function()
        {
            var response=await request(app)
            .get("/products")
            .expect(200)
            .expect("Content-Type",/json/)
            var data =response.body;
            expect(data).to.be.an("array");
            expect(data).length.to.be.greaterThan(0);
        })
    })
})