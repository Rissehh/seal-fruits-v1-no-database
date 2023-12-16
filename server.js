// import express
const express = require("express")

// import our fruits
// require will return the value of module.exports
const fruits = require("./models/fruits.js")

// create our app object
const app = express()

// middleware
app.use(express.static("public")) // use a "public" folder for files
// public/style.css -> /style.css
// public/app.js -> /app.js

// fruits index route
// get request to /fruits
// return all fruits
app.get("/fruits", (req, res) => {
    // res.send(fruits)
    // "index.ejs" => "./views/index.ejs"
    // {fruits} => {fruits:fruits}
    res.render("index.ejs", {fruits})
})

// express.urlencoded (prase url encoded bodies)
// add the data to req.body
app.use(express.urlencoded({extended: true}))







app.get("/fruits/new", (req, res) => {
    res.render("new.ejs")
})

app.post("/fruits", (req, res) => {
    const body = req.body
    if(body.readyToEat === "on") {
        body.readyToEat = true
    } else {
        body.readyToEat = false
    }
    fruits.push(body)
    res.redirect("/fruits")

    // res.send(body)
})
// fruits show route
// get request to /fruits/:id
// return a single fruit
app.get("/fruits/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // get the fruit from the array
    const fruit = fruits[id]
    // send the fruit as the response
    // res.send(fruit)

    // render the show.ejs template
    // res.render(template, data)
    // for the template assume "/views/"
    // "show.ejs" =>  ./views/show.ejs
    res.render("show.ejs", {fruit})
    // {fruit} is the same as {fruit:fruit}
})

// server listener to turn our server
app.listen(3000, () => {
    console.log('listening on port 3000')
})