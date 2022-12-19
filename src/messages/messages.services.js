

const messagesControllers=require('./messages.controllers')


const postMessage=(req,res)=>{
    const userId=req.user.id
    const conversationId=req.params.conversation_id
    const {message}=req.body 
    messagesControllers.createMessage({message,userId,conversationId})
    .then(data=>{
        res.status(201).json(data)
    })
    .catch(err=>{
        res.status(400).json({
            message:err.messague,
            fields:{
                message:'Text'
            }
        })
    })

}

const getAllMessagesByConversationId=(req,res)=>{
       const conversationId=req.params.conversation_id
       messagesControllers.findAllMessagesByConversationId(conversationId)
       .then(data=>{
         if(data){
            res.status(200).json(data)
         }
         else{
            res.status(404).json({
                message:`Conversation whit ${conversationId} not found`
            })
         }
       })
       .catch(err=>{
        res.status(400).json({
            message:err.message
        })
       })
}

const getMessageById=(req,res)=>{
    const messageId=req.params.message_id
    const conversationId=req.params.conversation_id
    messagesControllers.findMessageById(conversationId,messageId)
    .then(data=>{
      if(data){
         res.status(200).json(data)
      }
      else{
         res.status(404).json({
             message:`Message whit ${messageId} not found`
         })
      }
    })
    .catch(err=>{
     res.status(400).json({
         message:err.message
     })
    })
}

const deleteMessage=(req,res)=>{
    const conversationId=req.params.conversation_id
    const messageId=req.params.message_id
    messagesControllers.deleteMessage(conversationId,messageId)
    .then(data=>{
      if(data){
         res.status(204).json()
      }
      else{
         res.status(404).json({
             message:`Message whit ${messageId} not found`
         })
      }
    })
    .catch(err=>{
     res.status(400).json({
         message:err.message
     })
    })
}





module.exports={
 postMessage,
 getAllMessagesByConversationId,
 getMessageById,
 deleteMessage
}

    