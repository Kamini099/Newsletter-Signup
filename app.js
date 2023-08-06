//jshint esversion:6

const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");


const app=express();
app.use(express.static("public"));// to make the css and images as a public while running local host
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  var firstName=req.body.fName;
  var lastName=req.body.lName;
  var email=req.body.email;

  var data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName,
        }
      }
    ]
  }

  var jasonData=JSON.stringify(data);

  var options={
    url:"https://us21.api.mailchimp.com/3.0/lists/4bd98e32da",
    method:"POST",
    headers:{
      "Authorization":"kamini1 924cc90187b563eb621f47c51ee1558a-us21"
    },
    body:jasonData
  };
  request(options,function(error,response,body){
    if(error){
      res.sendFile(__dirname+"/failure.html");
    }else{
      if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
      }
      else{
        res.sendFile(__dirname+"/failure.html");
      }
    }
  });
});

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000");
});


// 924cc90187b563eb621f47c51ee1558a-us21
// 4bd98e32da
