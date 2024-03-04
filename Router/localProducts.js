const express = require('express')
const router = express.Router()
const data = require("../data/data.json")

//http://localhost:4000/api/v1/Products/
router.route('/').get((req,res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(data)
})

router.route('/').post((req,res) => {
    let payload = req.body
    data.Products.push(payload)
    res.status(201).send(JSON.stringify({
        msg: 'data creation is successfull'
    }))
})

module.exports = router