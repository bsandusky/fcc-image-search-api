'use strict'
const mongo = require("mongodb").MongoClient
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/test"

module.exports = class DB {
    
    constructor() {}
    
    saveSearchQuery(query) {
        
        mongo.connect(url, (err, db) => {
            if (err) throw err
            db.collection('search_queries').insertOne({query: query, timestamp: Date.now()})
            db.close()
        })
    }
    
    getSearchQueries(callback) {
        
        mongo.connect(url, (err, db) => {
            if (err) throw err
            db.collection('search_queries').find({}, {_id: 0, query: 1, timestamp: 1}).sort({timestamp: -1}).toArray((err, results) => {
                if (err) throw err
                callback(results)
                db.close()
            })
        })
    }
}