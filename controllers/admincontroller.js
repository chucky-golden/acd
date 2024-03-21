const Category = require('../models/category')
const SubCategory = require('../models/subcategory')
const Newsletter = require('../models/newsletters')
const Blog = require('../models/blog')
const { compressSent } = require('../middlewares/compressdata')


// add subcategory
const adminSubCategory = async (req, res) => {
    try{
        if(req.body.admin_email != req.admin.email){
            return res.json({ message: 'invalid or expired token' })
        }
        
        let info = {
            categoryid: req.body.categoryid,
            name: req.body.name
        }

        const subcategory = await new SubCategory(info).save()
        if(subcategory !== null){
            res.json({ message: 'subcategory uploaded' })
        }else{
            res.json({ message: 'error uploading subcategory' })
        }
        
        
    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}


// fetch subcategory
const adminGetSubCategory = async (req, res) => {
    try{

        let response = await SubCategory.find().sort({ createdAt: -1 })
        if(response !== null){

            const compressedData = await compressSent(response);
            res.json({ data: compressedData })
        }
        else {
            res.json({ message: 'error handling request' })
        } 

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}


// fetch subcategory by id
const adminGetSubCategoryById = async (req, res) => {
    try{
        
        let subcatid = req.params.id
        let response = await SubCategory.findOne({ _id: subcatid }) 
        if(response !== null){
            res.json({ data: response })
        }
        else {
            res.json({ message: 'error handling request' })
        } 

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}


// edit category
const adminSubEditCat = async (req, res) => {
    try{
        if(req.body.admin_email != req.admin.email){
            return res.json({ message: 'invalid or expired token' })
        }

        if(req.body.action == 'edit'){

            const category = await SubCategory.updateOne({ _id: req.body.subcategoryid }, 
                {
                    $set:{
                        name: req.body.name
                    }
                }
            )
    
            if(category !== null){
                res.json({ message: 'subcategory updated' })
            }else{
                res.json({ message: 'error updating subcategory' })
            }

        }else{
            const result = await SubCategory.findByIdAndDelete(req.body.subcategoryid)

            if(result !== null){
                res.json({ message: 'subcategory deleted' })
            }else{
                res.json({ message: 'error deleting subcategory' })
            }

        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}




// add category
const adminCategory = async (req, res) => {
    try{
        if(req.body.admin_email != req.admin.email){
            return res.json({ message: 'invalid or expired token' })
        }
        
        let info = {
            title: req.body.title
        }

        const category = await new Category(info).save()
        if(category !== null){
            res.json({ message: 'category uploaded' })
        }else{
            res.json({ message: 'error uploading category' })
        }
        
        
    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// fetch category
const adminGetCategory = async (req, res) => {
    try{

        let categories = await Category.find().sort({ createdAt: -1 })
        if(categories !== null){
            const sub = await SubCategory.find()

            let categoriesDetails = []

            categories.forEach(data => {
                let details = []
                for(let x = 0; x < sub.length; x++){
                    if(data._id === sub[x].categoryid){
                        details.push(sub[x])  
                    }
                }
                let sendData = {...data._doc, subcategories: details }
                categoriesDetails.push(sendData)
            })

            const compressedData = await compressSent(categoriesDetails);
            res.json({ data: compressedData })
        }
        else {
            res.json({ message: 'error handling request' })
        } 

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}


// fetch category by id
const adminGetCategoryById = async (req, res) => {
    try{
        
        let catid = req.params.id
        let response = await Category.findOne({ _id: catid }) 
        if(response !== null){
            res.json({ data: response })
        }
        else {
            res.json({ message: 'error handling request' })
        } 

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// edit category
const adminEditCat = async (req, res) => {
    try{
        if(req.body.admin_email != req.admin.email){
            return res.json({ message: 'invalid or expired token' })
        }

        if(req.body.action == 'edit'){

            const category = await Category.updateOne({ _id: req.body.categoryid }, 
                {
                    $set:{
                        title: req.body.title
                    }
                }
            )
    
            if(category !== null){
                res.json({ message: 'category updated' })
            }else{
                res.json({ message: 'error updating category' })
            }

        }else{
            const result = await Category.findByIdAndDelete(req.body.categoryid)

            if(result !== null){
                res.json({ message: 'category deleted' })
            }else{
                res.json({ message: 'error deleting category' })
            }

        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}




// add blog
const adminBlog = async (req, res) => {
    try{
        if(req.body.admin_email != req.admin.email){
            return res.json({ message: 'invalid or expired token' })
        }
        
        let info = {
            header: req.body.header,
            link: req.body.link
        }

        const blog = await new Blog(info).save()
        if(blog !== null){
            res.json({ message: 'blog header uploaded' })
        }else{
            res.json({ message: 'error uploading blog header' })
        }
        
        
    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// fetch blog
const adminGetBlog = async (req, res) => {
    try{

        let response = await Blog.find().sort({ createdAt: -1 })
        if(response !== null){
            const compressedData = await compressSent(response);
            res.json({ data: compressedData })
        }
        else {
            res.json({ message: 'error handling request' })
        } 

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}


// fetch category
const adminGetBlogById = async (req, res) => {
    try{
        
        let blogid = req.params.id
        let response = await Blog.findOne({ _id: blogid }) 
        if(response !== null){
            res.json({ data: response })
        }
        else {
            res.json({ message: 'error handling request' })
        } 

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// edit blog
const adminEditBlog = async (req, res) => {
    try{
        if(req.body.admin_email != req.admin.email){
            return res.json({ message: 'invalid or expired token' })
        }

        if(req.body.action == 'edit'){

            const blog = await Blog.updateOne({ _id: req.body.blogid }, 
                {
                    $set:{
                        header: req.body.header,
                        link: req.body.link
                    }
                }
            )
    
            if(blog !== null){
                res.json({ message: 'blog updated' })
            }else{
                res.json({ message: 'error updating blog' })
            }

        }else{
            const result = await Blog.findByIdAndDelete(req.body.blogid)

            if(result !== null){
                res.json({ message: 'blog deleted' })
            }else{
                res.json({ message: 'error deleting blog' })
            }

        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}




// fetch emails for newsletters
const newsletters = async (req, res) => {
    try{
        let response = await Newsletter.find() 
        if(response !== null){
            const compressedData = await compressSent(response);
            res.json({ data: compressedData })
        }
        else {
            res.json({ message: 'error handling request' })
        } 

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}


module.exports = {
    adminCategory,
    adminGetCategory,
    adminGetCategoryById,
    adminEditCat,
    adminBlog,
    adminGetBlog,
    adminGetBlogById,
    adminEditBlog,
    newsletters,
    adminSubCategory,
    adminGetSubCategory,
    adminGetSubCategoryById,
    adminSubEditCat
}