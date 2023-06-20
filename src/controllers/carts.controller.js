const {CartsService} = require("../service/index")
class CartsController{
getCarts= async (req,res)=>{
    try {
        const carts = await CartsService.getCarts()
        res.status(200).send({
            status: 'success',
            payload: carts
        })
        



    } catch (error) {
        console.log(error)
    }
}

CreateCart= async (request, response)=>{
    try {
        

        let result = await CartsService.addCart()


        res.status(200).send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        console.log(error)
    }
}

getById= async (req,res)=>{
    try {
        const {cid} = req.params
        let cart = await CartsService.getCartById(cid)
        res.render('carts',{
            status: 'success',
            payload: cart,
            carts:cart
        })
    } catch (error) {
        console.log(error)
    }
}

AddProduct=async (req, res)=>{
    try{
        const {cid} = req.params
        const {pid} = req.params
        
        const cart = await CartsService.addProduct(cid,pid)
        res.status(200).send({
            status: 'success',
            payload: cart
        })

    }catch(error){
        console.log(error)
    }
}
DeleteProduct=async (req, res)=>{
    try{
        const {cid} = req.params
        const {pid} = req.params
        
        const cart = await CartsService.deleteProduct(cid,pid)
        res.status(200).send({
            status: 'success',
            payload: cart
        })

    }catch(error){
        console.log(error)
    }
}

Deletecart=async (req, res)=>{
    try{
        const {cid} = req.params
    
        const cartdeleted = await CartsService.deleteCart(cid)
        res.status(200).send({
            status: 'success',
            payload: cartdeleted
        })

    }catch(error){
        console.log(error)
    }
}
UpdateCart=async (req, res)=>{
    try{
        const {cid} = req.params
        const {updatecart} = req.body
        const cart = await CartsService.updateCart(cid,updatecart)
        res.status(200).send({
            status: 'success',
            payload: cart
        })

    }catch(error){
        console.log(error)
    }
}
UpdateQuantity=async (req, res)=>{
    try{
        const {cid} = req.params
        const {pid} = req.params
        const {quantity} = req.body
        const cart = await CartsService.Updatequantity(cid,pid,quantity)
        res.status(200).send({
            status: 'success',
            payload: cart
        })

    }catch(error){
        console.log(error)
    }
}

}

module.exports= new CartsController()