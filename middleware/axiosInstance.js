const axios = require('axios')
const instance = axios.create({
    baseURL: 'https://services.odata.org/v4/northwind/northwind.svc'
})

module.exports = instance