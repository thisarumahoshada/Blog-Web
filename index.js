import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const titleArr = [];
const blogs = [];


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.render("index.ejs");
});

app.get("/writeBlog", (req,res) => {
    res.render("write.ejs");
});

app.post("/write", (req,res) => { 
    
    var blogTitle = req.body["nTitle"]; 
    var blogBody = req.body["nBlog"];

    blogs.push({
        title: blogTitle,
        body: blogBody
    });
    
    titleArr.push(req.body["nTitle"]);

    res.render("index.ejs", {
        blogTitles: titleArr,
    });
});



app.get("/read/:id", (req,res) => {

        var selectedID = req.params.id;
        var selectedTitle = blogs[selectedID].title;
        var selectedBody = blogs[selectedID].body;

        res.render("read.ejs", { 
        title : selectedTitle,
        body: selectedBody,
        id : selectedID
    });
});

app.post("/update/:id", (req,res) => {

    var currentID = req.params.id;
    var currentTitle = blogs[currentID].title;
    var currentBody = blogs[currentID].body;
    res.render("update.ejs", {
        title: currentTitle,
        body: currentBody,
        id: currentID
    });
    
});

app.post("/updated/:id", (req,res) => {

    var currentID = req.params.id;
    var updatedBody = req.body["uBody"];
    blogs[currentID].body = updatedBody;
    console.log(blogs);
    res.render("index.ejs", {
        blogTitles: titleArr
    });
});



app.get("/home", (req,res) => {
    res.render("index.ejs", {
        blogTitles: titleArr,
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});