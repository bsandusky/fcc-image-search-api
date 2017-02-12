'use strict'
const express = require("express")
const app = express()
const search = require("./search")

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("index.html")
})

app.get("/api/latest", (req, res) => {
    res.send("hello, world")
})

app.get("/api/search", (req, res) => {
    
    if (!req.query.q) {
        res.send({error: "No search term provided"})
    } else if (!req.query.offset) {
        req.query.offset = 1
    }
    
    search.get(req.query.q).then((response) => {
        
        let arr = []
        for (let i=0; i<req.query.offset; i++) {
            arr.push(response.data[i])
        }
        res.send(arr)
    })
})


app.listen(process.env.PORT, () => {
    console.log("Server running on " + process.env.IP + ":" + process.env.PORT)
})