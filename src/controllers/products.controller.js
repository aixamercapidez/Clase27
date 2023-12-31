const {ProductsService} = require("../service/index")
const { productModel } = require('../dao/mongo/model/product.model.js')
const {userModel} = require('../dao/mongo/model/user.model')

class ProductsController{
   getProducts= async (req, res) => {
        try {
           
    
          
            const {first_name} = req.session.user
            const {last_name} = req.session.user
            const {email} = req.session.user
            let userDB = await userModel.findOne({email})
            let role = userDB.role
            //const {role} = req.session.user
            
            
            const { page = 1 } = req.query
            const { limit = 10 } = req.query
            const {category} = req.query
            const {status} = req.query
            const { sort } = req.query
            let sortOptions
            if (sort === 'asc') {
    
                sortOptions = { price: 1 };
    
            } else if (sort === 'desc') {
    
                sortOptions = { price: -1 };
    
            }
    let query ={}
            if(category){
                query={category:category}
            }
            if(status){
                query={status:status}
            }
           let products = await productModel.paginate(query,{ limit: limit, page: page, lean: true,sort: sortOptions})
  //  let products = await ProductsService.getProducts()
            
            const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages } = products
          
            
        



            res.render('products', {
                status: 'success',
                products: docs,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                totalPages,
                first_name,
                last_name,
                role
            })
        
        } catch (error) {
            console.log(error)
        }
    }

   getById= async (req, res) => {
        try {
            const { pid } = req.params
            let product = await ProductsService.getProductById(pid)
            res.status(200).send({
                status: 'success',
                payload: product
            })
        } catch (error) {
            console.log(error)
        }
    }

  AddProduct=  async (req, res) => {
        try {
            const newProduct = req.body
    
            let result = await ProductsService.addProduct(newProduct)
            const {email} = req.session.user
            let userDB = await userModel.findOne({email})
            let role = userDB.role
    if (role != "admin"){
        res.status(401).send({
            status: 'acces denied',
            
        })
    }else{
            res.status(200).send({
                status: 'success',
                payload: result
            })}
        } catch (error) {
            console.log(error)
        }
    }

   UpdateProduct= async (req, res) => {
        try {
            const { pid } = req.params
            const updateProduct = req.body
    
            let updated = await ProductsService.updateProduct(pid, updateProduct)
            const {email} = req.session.user
            let userDB = await userModel.findOne({email})
            let role = userDB.role
    if (role != "admin"){
        res.status(401).send({
            status: 'acces denied',
            
        })
    }else{
    
            res.status(200).send({
                status: 'success',
                payload: updated
            })}
        } catch (error) {
            console.log(error)
        }
    }
  DeleteProduct=  async (req, res) => {
        try {
            const { pid } = req.params
            let product = await ProductsService.deleteProduct(pid)

            const {email} = req.session.user
            let userDB = await userModel.findOne({email})
            let role = userDB.role
    if (role != "admin"){
        res.status(401).send({
            status: 'acces denied',
            
        })
    }else{
            res.status(200).send({
                status: 'success',
                payload: product
            })}
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports= new ProductsController()