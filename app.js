'use strict'
const express = require("express")
const app = express()

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("index.html")
})

app.get("/api/latest", (req, res) => {
    res.send("hello, world")
})

app.get("/api/search", (req, res) => {
    res.send(req.query.q + " " + req.query.offset)
})


app.listen(process.env.PORT, () => {
    console.log("Server running on " + process.env.IP + ":" + process.env.PORT)
})