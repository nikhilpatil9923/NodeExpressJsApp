const express = require('express')
const app = express()
const env = require('dotenv') //to use different fiff env for systems like for den and port
const Products_local = require('./data/data.json') //json data from file
const axios = require('axios') //axios instance to access nortwind
const localProduct = require("./Router/localProducts") //defining route for localproduct file
const northwindProducts = require("./Router/NortwindsrvProducts") //defining route for northproducts


env.config({
    path: './config/config.env'
})

//to do the post call we have to add a middleware , without this post call will return null
const {
    json
} = require('express')
app.use(json())
app.use(express.urlencoded({
    extended: false
}))

app.use('/api/v1/Products', localProduct) //using local product file
app.use('/api/v1/Northwind/Products', northwindProducts) //using northwind product file , so whenever my route finds this /api/v1/Northwind/Products it will trigger northwindProducts middleware 


const PORT = process.env.PORT || 3000

//get root
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.send('<h1 style="color:red;">Hello Express</h1>')

})
//get local products
//http://localhost:4000/api/v1/Products ---postman get url

// app.get('/api/v1/products', (req, res) => {
//     res.setHeader('Content-Type', 'application/json') //if we are using this we will directly get data in json in postman app
//     res.status(200).send(JSON.stringify(Products_local))
// })

//post call
//similarly we can perform other cruds operations
// app.post('/api/v1/products', (req, res) => {
//     const payload = req.body
//     Products_local.Products.push(payload)
//     console.log(payload)
//     res.setHeader('Content-Type', 'application/json') //if we are using this we will directly get data in json in postman app
//     res.status(200).send(JSON.stringify(Products_local))
// })

//access northwind product services using nodejs
//mode1 to access northwind
//app.get('/api/v1/Northwind/Products', (req, res) => {
//app.get('/api/v1/Northwind/Products', async (req, res) => { //if we are doing any async call like await then we have to make the function aslo async
    //mode1 to access northwind
    //http://localhost:4000/api/v1/Northwind/Products ----postman request url
    //     axios.get('https://services.odata.org/v4/northwind/northwind.svc/Products?$format=json').then((results) => {
    //         console.log(results)
    //         res.setHeader('Content-Type', 'application/json')
    //         res.status(200).send(JSON.stringify(results.data.value))
    //     })

    //mode2 to accessnorthwind in different way
    // const axios_instance = axios.create({
    //     baseURL: 'https://services.odata.org/v4/northwind/northwind.svc'
    // })
    // axios_instance.get('/Products').then( (results) => {
    //     res.setHeader('Content-Type', 'application/json')
    //     res.status(200).send(JSON.stringify(results.data.value))
    // })

    //mode3 async and await
//     try {
//         const results = await axios_instance.get('Products')
//         res.setHeader('Content-Type', 'application/json')
//         res.status(200).send(JSON.stringify(results.data.value))


//     } catch (error) {
//         res.status(400)
//     }
// })

//filter query $filter
//http://localhost:4000/api/v1/Northwind/Products/SupplierID=2
// app.get('/api/v1/Northwind/Products/:id', async (req, res) => {
//     const ID = req.params.id
//     const field = ID.match(/\S+(?==)/g)[0]
//     const value = ID.split('=').pop()
//     console.log(value)

//     const axios_instance = axios.create({
//         baseURL: 'https://services.odata.org/v4/northwind/northwind.svc'
//     })

//     try {
//         const results = await axios_instance.get('Products', {

//             params: {
//             $filter: `${field} eq ${value}`
//             }
//         })
//         res.setHeader('Content-Type', 'application/json')
//         res.status(200).send(JSON.stringify(results.data.value))


//     } catch (error) {
//         res.status(400)
//     }

// })

//by performing all this crud operations code is not readable and scalable so thats when route and controller concept came into picture to mudularize and organize code structure


app.listen(PORT, console.log(`listening to port ${PORT} in ${process.env.NODE_ENV} server`)) 
