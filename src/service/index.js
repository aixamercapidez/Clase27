const ProductsDaoMongo = require("../dao/mongo/product.mongo")
const CartsDaoMongo = require("../dao/mongo/cart.mongo")
const MessageDaoMongo = require("../dao/mongo/message.mongo")




const ProductsService = new ProductsDaoMongo()
const CartsService = new CartsDaoMongo()
const MessageService = new MessageDaoMongo()

module.exports = {
ProductsService,
CartsService,
MessageService

}


