'use strict'
const fetch = require("node-fetch")
const DB = require("./db")
const rootUrl = 'https://api.imgur.com/3/gallery/search/'
const clientId = process.env.CLIENT_ID || '65f54a1b1f25f87'

module.exports = {

    get(query) {
        return fetch(rootUrl + "?q=" + query, {
            method: 'GET',
            headers: {
                'Authorization': 'Client-ID ' + clientId
            }
        })
            .then((response) => {
                let db = new DB()
                db.saveSearchQuery(query)
                return response.json()
        
            }).catch((err) => {
                throw err
            })
    }
}