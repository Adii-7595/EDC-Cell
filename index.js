const express = require("express");
const app = express();
const port = 3000;

const path = require("path")
app.use(express.static(path.join(__dirname, "/public/css")))
app.use(express.static(path.join(__dirname, "/public/js")))
app.use(express.static(path.join(__dirname, '/image')));



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"))


app.get("/", (req, res) => {
    res.render("index");
});



app.get("/service", (req,res)=>{

    res.render("service");
});

app.get("/apply", (req,res)=>{
    res.render("form");

});
app.get("/achievements", (req,res)=>{
    res.render("achievement");

});
app.get("/login", (req,res)=>{
    res.render("login");

});







// const mongoose = require("mongoose");
// const mongoURL = "mongodb://127.0.0.1:27017"
// mongoose.connect(mongoURL).then(()=>{
//     console.log("Connected to mongodb");

// }).catch((e)=>{
//     console.log(e);
// })


app.listen(port,()=>{
    console.log(`The server is running on port : ${port}`);
})