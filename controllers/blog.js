require('../config/db')
const Blogs = require('../models/blog')
const blogsValidation = require('../validations/blogs')
const authController = require('./auth')
const fs = require('fs')

exports.findAllBlogsSortBy = async (req, res) => {
    try {
        let dataBlogs
        if (req.params.sortItem === "Title, Z-A") {
            dataBlogs = await Blogs.find(
                {
                    tags: { $nin: ["Beranda"] },
                    active: true    
                }).sort( { title: -1 } )
        } else if (req.params.sortItem === "Title, A-Z") {
            dataBlogs = await Blogs.find(
                {
                    tags: { $nin: ["Beranda"] },
                    active: true    
                }).sort( { title: 1 } )
        } else if (req.params.sortItem === "Oldest") {
            dataBlogs = await Blogs.find(
                {
                    tags: { $nin: ["Beranda"] },
                    active: true    
                }).sort( { updatedAt: 1 } )
        } else if (req.params.sortItem === "Latest") {
            dataBlogs = await Blogs.find(
                {
                    tags: { $nin: ["Beranda"] },
                    active: true    
                }).sort( { updatedAt: -1 } )
        }

        const tempDataBlogs = new Array()

        for (let index = 0; index < dataBlogs.length; index++) {
            const element = dataBlogs[index].updatedAt;
            const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const test = new Date(element);

            tempDataBlogs.push({
                _id: dataBlogs[index]._id,
                title: dataBlogs[index].title,
                subtitle: dataBlogs[index].subtitle,
                description: dataBlogs[index].description.length <= 320? dataBlogs[index].description : `${dataBlogs[index].description.slice(0,320)}...`,
                image: dataBlogs[index].image,
                tags: dataBlogs[index].tags.toString(),
                active: dataBlogs[index].active,
                publisher: dataBlogs[index].publisher,
                updatedAt: `${days[test.getDay()]}, ${test.getDate()} ${months[test.getMonth()]} ${test.getFullYear()} ${test.getHours()}:${test.getMinutes()}:${test.getSeconds()}`
            })
            
        }

        const message = `fetched ${dataBlogs.length} Blogs`

        res.status(201).json({
            message: message,
            data: tempDataBlogs,
        })
        console.log(`${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

exports.findBlogByTitle = async (req, res) => {
    try {
        let message

        const param = req.params.title
        const title = param.replace("%20"," ")

        const dataBlogs = await Blogs.find({
            title: title,
            active: true    
        }).sort( { updatedAt: -1 } )

        if (!dataBlogs) {
            message = `Blog not Found`
            res.json({
                message: message,
                data: tempDataBlogs,
            }).status(400)
            console.log(`${message}`)
        }
        console.log(dataBlogs)

        const tempDataBlogs = new Array()

        for (let index = 0; index < dataBlogs.length; index++) {
            const element = dataBlogs[index].updatedAt;
            const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const test = new Date(element);

            tempDataBlogs.push({
                _id: dataBlogs[index]._id,
                title: dataBlogs[index].title,
                subtitle: dataBlogs[index].subtitle,
                description: dataBlogs[index].description,
                image: dataBlogs[index].image,
                tags: dataBlogs[index].tags.toString(),
                active: dataBlogs[index].active,
                publisher: dataBlogs[index].publisher,
                updatedAt: `${days[test.getDay()]}, ${test.getDate()} ${months[test.getMonth()]} ${test.getFullYear()} ${test.getHours()}:${test.getMinutes()}:${test.getSeconds()}`
            })
            
        }

        message = `fetched ${dataBlogs.length} Blogs`

        res.status(201).json({
            message: message,
            data: tempDataBlogs,
        })
        console.log(`${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

exports.findBlogsByKey = async (req, res) => {
    try {
        // console.log(req.params.blogKey)
        const tags = ["Berita", "Kegiatan"]
        let dataBlogs
        if (tags.includes(req.params.blogKey)) {
            dataBlogs = await Blogs.find(
            {
                tags: { $in: req.params.blogKey},
                active: true    
            }).sort( { updatedAt: -1 } )
        } else if(req.params.blogKey === "Semua") {
            dataBlogs = await Blogs.find(
                {
                    tags: { $nin: ["Beranda"] },
                    active: true    
                }).sort( { updatedAt: -1 } )
        } else {
            dataBlogs = await Blogs.find({
                title: req.params.blogKey,
                active: true    
            }).sort( { updatedAt: -1 } )
            console.log(dataBlogs)
        }

        const tempDataBlogs = new Array()

        for (let index = 0; index < dataBlogs.length; index++) {
            const element = dataBlogs[index].updatedAt;
            const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const test = new Date(element);

            tempDataBlogs.push({
                _id: dataBlogs[index]._id,
                title: dataBlogs[index].title,
                subtitle: dataBlogs[index].subtitle,
                description: dataBlogs[index].description.length <= 320? dataBlogs[index].description : `${dataBlogs[index].description.slice(0,320)}...`,
                image: dataBlogs[index].image,
                tags: dataBlogs[index].tags.toString(),
                active: dataBlogs[index].active,
                publisher: dataBlogs[index].publisher,
                updatedAt: `${days[test.getDay()]}, ${test.getDate()} ${months[test.getMonth()]} ${test.getFullYear()} ${test.getHours()}:${test.getMinutes()}:${test.getSeconds()}`
            })
            
        }

        const message = `fetched ${dataBlogs.length} Blogs`

        res.status(201).json({
            message: message,
            data: tempDataBlogs,
        })
        console.log(`${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

exports.findAllBlogs = async (req, res) => {
    try {
        const dataBlogs = await Blogs.find(
            {
                tags: { $nin: ["Beranda"] },
                active: true    
            }).sort( { updatedAt: -1 } )

        const tempDataBlogs = new Array()

        for (let index = 0; index < dataBlogs.length; index++) {
            const element = dataBlogs[index].updatedAt;
            const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const test = new Date(element);

            tempDataBlogs.push({
                _id: dataBlogs[index]._id,
                title: dataBlogs[index].title,
                subtitle: dataBlogs[index].subtitle,
                description: dataBlogs[index].description.length <= 320? dataBlogs[index].description : `${dataBlogs[index].description.slice(0,320)}...`,
                image: dataBlogs[index].image,
                tags: dataBlogs[index].tags.toString(),
                active: dataBlogs[index].active,
                publisher: dataBlogs[index].publisher,
                updatedAt: `${days[test.getDay()]}, ${test.getDate()} ${months[test.getMonth()]} ${test.getFullYear()} ${test.getHours()}:${test.getMinutes()}:${test.getSeconds()}`
            })
            
        }

        const message = `fetched ${dataBlogs.length} Blogs`

        res.status(201).json({
            message: message,
            data: tempDataBlogs,
        })
        console.log(`${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// findBeranda
exports.findBeranda = async(req, res) => {
    try {
        const dataBlogs = await Blogs.find(
            {
                tags: { $in: ["Beranda"] },
                active: true    
            })

        const message = `fetched ${dataBlogs.length} Blogs`

        res.status(201).json({
            message: message,
            data: dataBlogs,
        })
        console.log(`${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// findBlogs
exports.findBlogs = async (req, res) => {

    try {
        const dataBlogs = await Blogs.aggregate([
            {
                $sort: { updatedAt: -1 }
            }
        ])

        const username = await authController.getUsername(req.user._id)
        
        const message = `fetched ${dataBlogs.length} Blogs`

        res.status(201).json({
            message: message,
            data: dataBlogs
        })
        console.log(`${username} ${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// createBlogs
exports.createBlogs = async (req, res) => {
    try {
        let message
        const username = await authController.getUsername(req.user._id)

        if (!req.file) {
            message = "Image not uploaded"
            res.json({
                status: "error",
                message: message,
            }).status(400)
            console.log(`error: ${message}`)
        }
        const reqData = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            publisher: username,
            description: req.body.description,
            tags: req.body.tags,
            active: req.body.active,
            image: req.file.path
        }

        // validate request
        await blogsValidation.createBlogs(reqData)

        const dataBlog = await Blogs.create(reqData)


        message = `Blog ${dataBlog.title} created successfully`

        res.json({
            status: "success",
            message: message,
            data: dataBlog
        }).status(201)
        console.log(`${message} by ${username}`)
        if (req.file) {
            console.log(`Image of ${dataBlog.title} (${dataBlog.image}) added successfully by ${username}`)
        }
    } catch (error) {
        res.json({
            status: "error",
            message: error.message,
        }).status(400)
        console.log(`error: ${error}`)
    }
}

// updateBlogs
exports.updateBlogs = async (req, res) => {

    try {
        const username = await authController.getUsername(req.user._id)
        
        const blogs = await Blogs.findById(req.params.blogId)
        let message
        
        if (!blogs) {
            message = `Blog not Found`
        } else {
            if (req.file) {
                const reqData = {
                    title: req.body.title,
                    subtitle: req.body.subtitle,
                    publisher: username,
                    description: req.body.description,
                    tags: req.body.tags,
                    active: req.body.active,
                    image: req.file.path
                }
                // validate request
                await blogsValidation.createBlogs(reqData)
                await Blogs.updateOne({ _id: req.params.blogId }, reqData)
                try {
                    fs.unlinkSync(blogs.image)
                } catch(err) {
                    console.error(err)
                }
            } else {
                // validate request
                const reqData = {
                    title: req.body.title,
                    subtitle: req.body.subtitle,
                    publisher: username,
                    description: req.body.description,
                    tags: req.body.tags,
                    active: req.body.active,
                }
                await blogsValidation.updateBlogs(reqData)
                await Blogs.updateOne({ _id: req.params.blogId }, reqData )
            }
            if (blogs.title === req.body.title) {
                message = `Blog ${blogs.title} updated successfully`
            } else {
                const updatedBlogs = await Blogs.findById(req.params.blogId)
                message = `Blog ${blogs.title} updated to ${updatedBlogs.title} successfully`
            }
        }

        res.json({
            status: "success",
            message: message,
            data: blogs,
        }).status(201)
        console.log(`${message} by ${username}`)

        if (req.file) {
            const updatedBlogs = await Blogs.findById(req.params.blogId)
            console.log(`${blogs.image} removed and ${updatedBlogs.image} added successfully by ${username}`)
        }
    } catch (error) {
        res.json({
            status: "error",
            message: error.message,
        }).status(400)
        console.log(`error: ${error}`)
    }
}

// deleteBlogs
exports.deleteBlogs = async (req, res) => {
    try {
        const username = await authController.getUsername(req.user._id)

        const deletedBlogs = await Blogs.findById(req.params.blogId)
        let message
        
        if (!deletedBlogs) {
            message = `Blogs not found`
        } else {
            await Blogs.deleteOne({ _id: req.params.blogId })
            try {
                fs.unlinkSync(deletedBlogs.image)
            } catch(err) {
                console.error(err)
            }
            message = `Blog ${deletedBlogs.title} deleted successfully`
        }

        res.json({
            status:"success",
            message: message,
            data: deletedBlogs
        }).status(201)
        console.log(`${message} by ${username}`)
        console.log(`Image of ${deletedBlogs.title} (${deletedBlogs.image}) removed successfully by ${username}`)
    } catch (error) {
        res.json({
            status:"error",
            message: error.message,
        }).status(400)
        console.log(`error: ${error}`)
    }
}