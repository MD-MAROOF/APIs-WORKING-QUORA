const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
uuidv4();

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "Maroof",
        content: "I love programming"
    },

    {
        id: uuidv4(),
        username: "Arham",
        content: "I do not like studying"
    },

    {
        id: uuidv4(),
        username: "Ruhaan",
        content: "I love studying"
    },

];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});


app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    // res.send("post requests works !")
    res.redirect("/posts");
});


app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});





app.get("/posts/:id", (req, res) => {
    let { id } = req.params;

    let post = posts.find((p) => id === p.id);

    res.render("show.ejs", { post });
});



app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
});


app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.send("patch request working");
});


app.delete("/posts/:id", (req,res)=>{
    let { id } = req.params;
     let post = posts.find((p) => id === p.id);
     res.send("delete success");
});

app.listen(8080, () => {
    console.log("listening to port 8080");

});