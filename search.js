'use strict'
const fetch = require("node-fetch")
const rootUrl = 'https://api.imgur.com/3/gallery/search/'
const clientId = '65f54a1b1f25f87'

module.exports = {

    get(query) {
        return fetch(rootUrl + "?q=" + query, {
            method: 'GET',
            headers: {
                'Authorization': 'Client-ID ' + clientId
            }
        })
            .then((response) => {
            return response.json()
        
            }).catch((err) => {
                throw err
            })
    }
}