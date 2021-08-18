const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https"); // api
app.set('view engine','ejs'); //this also means you created a view folder uske andr all ejs files i.e html wale code
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
let data1 = '';
let data2 = '';
let problem = [];
let problem2 = [];
let uniqueCandidate1 = [];
let uniqueCandidate2 = [];
/*
app.get("/", function(req,res){

  res.render("index.ejs", {
    welcome: problem
    });
});*/
app.get("/",function(req,res){

  res.render("index.ejs");
});



app.post("/",function(req,res){
  
  const query1 = req.body.cfName1; //profile 1 input 1;
  const query2 = req.body.cfName2; //profile 2 intput 2;
  
 
  let candidate1 = query1;
  let candidate2 = query2;
  let codeforcesURLC1 = 'https://codeforces.com/api/user.status?handle=' + query1;
  let codeforcesURLC2 = 'https://codeforces.com/api/user.status?handle=' + query2;
  //'https://codeforces.com/api/user.status?handle=priyanshjha99';
  
  https.get(codeforcesURLC1, (resp) => {
   data1 = '';
   problem.splice(0, problem.length)

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data1 += chunk;
  });
  resp.on('end', () => {
    
    const value = JSON.parse(data1); 

    for(let i =0;i<value.result.length;i++){
        if(value.result[i].problem.rating  && value.result[i].verdict === "OK") //filter's to fetch data accordingly.
   problem.push(value.result[i].problem.name); 
    }
  
    problem.forEach((c) => {
        if (!uniqueCandidate1.includes(c)) {
            uniqueCandidate1.push(c);
        }
    });
   console.log(uniqueCandidate1.length); //ab mreko distict krna hai.
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});


//2nd candidatee 

https.get(codeforcesURLC2, (resp) => {
  data2 = '';
  problem2.splice(0, problem2.length);

 resp.on('data', (chunk) => {
   data2 += chunk;
 });
 resp.on('end', () => {
   const value = JSON.parse(data2);

   for(let i =0;i<value.result.length;i++){
       if(value.result[i].problem.rating && value.result[i].verdict === "OK") 
  problem2.push(value.result[i].problem.name);
   }
   problem2.forEach((c) => {
    if (!uniqueCandidate2.includes(c)) {
        uniqueCandidate2.push(c);
    }
});
console.log(uniqueCandidate2.length);
  // console.log(problem2);
 });
}).on("error", (err) => {
 console.log("Error: " + err.message);
});


//NOW arr -> uniqueCandidate1[] contains all the questions attemped by Candidate 1 (ACCEPTED ONLY)
//Now arr -> uniqueCandidate2[] contains all the questions attemped by Candidate 2  (ACCEPTED ONLY)



res.redirect("/"); 

})




app.listen(5000,function(){
  console.log("Server started at port 5000");
})

