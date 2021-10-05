exports.createProduct = (req, res, next) => {
    const message = "Create Product Success"

    res.json({
        message: message,
        data: {
            id: 1,
            name: req.body.name,
            price: 8000
        }
    })
    next()
    console.log(message)
    // console.log(req.body)
}

exports.readProduct = (req, res, next) => {
    res.json({
        message: "Read Product Success",
        data: {
            id: 2,
            name: "Sari Gandum",
            price: 8000
        }
    })
    next()
}

exports.updateProduct = (req, res, next) => {
    res.json({
        message: "Update Product Success",
        data: {
            id: 3,
            name: "Sari Gandum",
            price: 8000
        }
    })
    next()
}

exports.deleteProduct = (req, res, next) => {
    res.json({
        message: "Delete Product Success",
        data: {
            id: 4,
            name: "Sari Gandum",
            price: 8000
        }
    })
    next()
}