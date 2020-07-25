var express=require("express");
    app=express();
    bodyParser=require("body-parser");
    mongoose=require("mongoose");
    
    mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true,useUnifiedTopology: true }).then(() => {
    console.log('connected to DB!');
}).catch(err =>{
    console.log('ERROR',err.message);
})

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//schema 
var campgroundSchema= new mongoose.Schema({
    name:String,
    image: String,
    description: String
});

 var Campground=mongoose.model("Campground",campgroundSchema);
// Campground.create({
//     name: "Granite hill", 
//     image: "https://inteng-storage.s3.amazonaws.com/img/iea/MRw4y5ABO1/sizes/camping-tech-trends_md.jpg ",
//     description :"this ia s huge one"
// },function(err,campground)
// {
//     if(err)
//     {
//         console.log(err);
//     }
//     else{
//         console.log("newly created campground")
//         console.log(campground);
//     }
// })


app.get("/",function(req,res){
    res.render("landing");
})
//INDEX
app.get("/campgrounds", function(req,res){
   // get all campground from DB
         Campground.find({},function(err,allCampgrounds){
              if(err)
              {
                  console.log(err);
              }
              else{
                res.render("index",{campgrounds: allCampgrounds});
              }
         });
   
})
//CREATE-ADD NEW CG
app.post("/campgrounds" , function(req,res){
    //res.send("you hit the post route")
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var newCampground={name: name ,image: image,description: desc};
    //create a new campground and save to db
    Campground.create(newCampground,function(err,newlyCreated)
    {
        if(err)
        {
            console.log(err);
        }
        else{
            //rediresct back to campgroung page
            res.redirect("/campgrounds");
        }
    })
})
//NEW 
app.get("/campgrounds/new",function(req,res){
    res.render("new");
})
//show
app.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
if(err)
{
    console.log(err);
}
else{
    res.render("show",{campground:foundCampground});
}
    });
})
var port=3000;
app.listen(port,function(){
    console.log("Yelp camp has started");
})