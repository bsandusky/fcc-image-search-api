'use strict'
const express = require("express")
const app = express()
const search = require("./search")
const DB = require("./db")

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("index.html")
})

app.get("/api/latest", (req, res) => {
    let db = new DB()
    db.getSearchQueries((results) => {
        
        for (let i=0; i<results.length; i++) {
            results[i].timestamp = new Date(results[i].timestamp).toISOString()
        }
        
        res.send(results)
    })
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