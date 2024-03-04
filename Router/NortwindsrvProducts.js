const express = require('express')
const router = express.Router()
const instance = require('../middleware/axiosInstance')
//http://localhost:4000/api/v1/northwind/products/
router.route('/').get(async(req,res) => {
    try {
        const results = await instance.get('/Products');
        res.setHeader('Content-Type', 'application/json')
        res.status(200).send(JSON.stringify(results.data.value))


    } catch (error) {
        res.status(400)
    }
})
//This line is exporting the router object, which is an instance of express.Router(). By doing this, you make the router available for use in other parts of your application.
module.exports = router