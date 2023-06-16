//calculator program
function addNums(...p1)
{
    var sum=0;
    for(let i=0;i<p1.length;i++)
    {
        sum+=p1[i];
    }
    return sum;
}
function subNums(...p1)
{
    var sum=p1[0];
    for(let i=1;i<p1.length;i++)
    {
        sum-=p1[i];
    }
    return sum;
}
function mulNums(...p1)
{
    var sum=p1[0];
    for(let i=1;i<p1.length;i++)
    {
        sum*=p1[i];
    }
    return sum;
}
function divNums(p1,p2)
{
   return p1/p2;
}

function getReminder(p1,p2)
{
   return p1%p2;
}


module.exports={
    addNums:addNums,
    subNums:subNums,
    mulNums:mulNums,
    divNums:divNums,
    getReminder
}