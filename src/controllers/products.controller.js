class ProductsController{
   getProducts= async (req, res) => {
        try {
           
    
          
            const {first_name} = req.session.user
            const {last_name} = req.session.user
            const {email} = req.session.user
           
            const {role} = req.session.user
            
            
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
            let product = await productManager.getProductById(pid)
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
    
            let result = await productManager.addProduct(newProduct)
    
    
            res.status(200).send({
                status: 'success',
                payload: result
            })
        } catch (error) {
            console.log(error)
        }
    }

   UpdateProduct= async (req, res) => {
        try {
            const { pid } = req.params
            const updateProduct = req.body
    
            let updated = await productManager.updateProduct(pid, updateProduct)
    
    
            res.status(200).send({
                status: 'success',
                payload: updated
            })
        } catch (error) {
            console.log(error)
        }
    }
  DeleteProduct=  async (req, res) => {
        try {
            const { pid } = req.params
            let product = await productManager.deleteProduct(pid)
            res.status(200).send({
                status: 'success',
                payload: product
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports= new(ProductsController)