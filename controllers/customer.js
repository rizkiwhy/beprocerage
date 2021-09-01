require('../config/db')
const Customers = require('../models/customer')

// findCustomers
exports.findCustomers = async (req, res, next) => {

    try {
        const dataCustomers = await Customers.find()
        const message = `${dataCustomers.length} customers fetched`

        res.status(201).json({
            message: message,
            data: dataCustomers
        })
        console.log(message)
    } catch (error) {
        console.log(`error: ${error}`)
    }
}

// createCustomers
exports.createCustomers = async (req, res, next) => {
    try {
        const dataCustomers = await Customers.create({
            name: req.body.name
        })
        const message = `${dataCustomers.name} created successfully`
        res.status(201).json({
            message: message,
            data: dataCustomers
        })
        console.log(message)
    } catch (error) {
        console.log(`error: ${error}`)
    }
}

// findCustomersById
exports.findCustomersById = async (req, res, next) => {

    try {
        const dataCustomers = await Customers.findById(req.params.customerId)
        let message

        !dataCustomers ?
            message = `Customer not found` :
            message = `${dataCustomers.name} fetched successfully`

        res.status(201).json({
            message: message,
            data: dataCustomers
        })
        console.log(message)
    } catch (error) {
        console.log(`error: ${error}`)
    }
}

// updateCustomers
exports.updateCustomers = async (req, res, next) => {
    try {
        await Customers.updateOne({ _id: req.params.customerId }, { name: req.body.name })
        const updatedDataCustomers = await Customers.findById(req.params.customerId)
        let message

        !updatedDataCustomers ?
            message = `Customer not found` :
            message = `${updatedDataCustomers.name} updated successfully`

        res.status(201).json({
            message: message,
            data: updatedDataCustomers
        })
        console.log(message)
    } catch (error) {
        console.log(`error: ${error}`)
    }
}

// deleteCustomers
exports.deleteCustomers = async (req, res, next) => {
    try {
        const deletedDataCustomers = await Customers.findById(req.params.customerId)
        await Customers.deleteOne({ _id: req.params.customerId })
        let message

        !deletedDataCustomers ?
            message = `Customer not found` :
            message = `${deletedDataCustomers.name} deleted successfully`

        res.status(201).json({
            message: message,
            data: deletedDataCustomers
        })
        console.log(message)
    } catch (error) {
        console.log(`error: ${error}`)
    }
}