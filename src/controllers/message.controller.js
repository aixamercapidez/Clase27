class MessageController{
   getMessage= async (req,res)=>{
        try {
            const message = await messageManager.getmessage()
            res.status(200).send({
                status: 'success',
                payload: message
            })
            
        } catch (error) {
            cconsole.log(error)
        }
    }
  Addmessage=  async (req, res)=>{
        try {
            
            const newmessage = req.body
            let result = await messageManager.addmessage(newmessage)
    
    
            res.status(200).send({
                status: 'success',
                payload: result
            })
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports= new(MessageController)