// import express
const express = require("express")

// import morgan
const morgan = require("morgan")
// import method override
const methodOverride = require("method-override")

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

app.use(morgan("dev"))
app.use(methodOverride("_method"))

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

app.delete("/fruits/:id", (req, res) => {
    const id = req.params.id
    fruits.splice(id, 1)
    res.redirect("/fruits")

})

app.get("/fruits/:id/edit", (req, res) => {
const id = req.params.id
const fruit = fruits[id]
res.render("edit.ejs", {fruit, id})
})

// UPDATE ROUTE - Receive the form data, updates the fruit
// PUT to /fruits/:id
// Update the specified fruit, then redirect to index
app.put("/fruits/:id", (req, res) => {
    // get the id
    const id = req.params.id
    // get the body
    const body = req.body
    // convert readyToEat to true or false
    if(body.readyToEat === "on"){
        body.readyToEat = true
    } else {
        body.readyToEat = false
    }
    // swap the old version with the new version
    fruits[id] = body
    // redirect back to the index page
    res.redirect("/fruits")
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
    res.render("show.ejs", {fruit, id})
    // {fruit} is the same as {fruit:fruit}
})

// server listener to turn our server
app.listen(3000, () => {
    console.log('listening on port 3000')
})