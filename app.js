const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https"); // api
app.set('view engine','ejs'); //this also means you created a view folder uske andr all ejs files i.e html wale code
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
let data1 = '';
let problem = [];

app.get("/", function(req,res){

  res.render("index.ejs", {
    welcome: problem
    });
});


app.post("/",function(req,res){
  
  const query1 = req.body.cfName1; //profile 1 input 1;
  const query2 = req.body.cfName2; //profile 2 intput 2;
  console.log(query1);
  console.log(query2);
  
  //=priyanshjha will be replaced by query1 and query2;
  https.get('https://codeforces.com/api/user.status?handle=priyanshjha99', (resp) => {
   data1 = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data1 += chunk;
  });
  resp.on('end', () => {
    //console.log(JSON.parse(data1));
    const value = JSON.parse(data1);

    for(let i =0;i<value.result.length;i++){
        if(value.result[i].problem.rating == '1200') //filter's to fetch data accordingly.
   problem.push(value.result[i].problem.name + " "); //all problems solved by user.
    }

   // console.log(problem);
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});

res.redirect("/"); 

})




app.listen(3000,function(){
  console.log("Server started at port 3000");
})

console.log('hellos');
console.log('okay');