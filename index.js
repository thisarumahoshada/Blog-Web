import express from "express";
import bodyParser from "body-parser";



const app = express();
const port = 3000;

const blogArr = [];
const titleArr = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.render("index.ejs");
});

app.get("/writeBlog", (req,res) => {
    res.render("write.ejs");
    console.log("In write Blog")
});



app.post("/write", (req,res) => { 
    titleArr.push(req.body["nTitle"]);
    blogArr.push(req.body["nBlog"]);
    res.render("index.ejs", {
        newBlog: req.body["nBlog"],
        blogTitles: titleArr,
        blogDes: blogArr
    });
    console.log(blogArr);
    console.log(titleArr);
});

app.get("/read/:id", (req,res) => {

        var idv = req.params.id

        var selectedT = titleArr[idv]
        var selectedB = blogArr[idv]

        console.log(selectedT)

        res.render("read.ejs", { 
        newBlog: req.body["nBlog"],
        blogTitles : selectedT,
        blogDes: selectedB

        //....read/2
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});