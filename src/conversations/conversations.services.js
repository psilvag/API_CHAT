
const conversationsControlleres=require('./conversations.controllers')


const getAllConversations=(req,res)=>{
    conversationsControlleres.findAllConversations()
    .then(data=>{
    res.status(200).json(data)
    })
    .catch(err=>{
        res.status(400).json({
            message:err.message
        })
    })
}


const getConversationById=(req,res)=>{
    const id=req.params.conversation_id
    conversationsControlleres.findConversationId(id)
    .then(data=>{
        if(data){
            res.status(200).json(data)
        }else {
            res.status(404).json({message: 'Invalid ID'})
        }
    })
    .catch(err=>{
        res.status(400).json({
            message:err.message
        })
    })
    
}
const getAllConversationsUserId=(req,res)=>{
    const userId=req.user.id
    conversationsControlleres.findAllConversationsUserId(userId)
    .then(data=>{
        if(data){
            res.status(200).json(data)
        }else {
            res.status(404).json({message:`You dont have conversations`})
        }
    })
    .catch(err=>{
        res.status(400).json({
            message:err.message
        })
    })
    
}

const getAllConversationsUserIdOwner=(req,res)=>{
    const userId=req.user.id
    conversationsControlleres.findAllConversationsUserIdOwner(userId)
    .then(data=>{
        if(data){
            res.status(200).json(data)
        }else {
            res.status(404).json({message:`You did not create any conversation`})
        }
    })
    .catch(err=>{
        res.status(400).json({
            message:err.message
        })
    })
    
}


const postConversation=(req,res)=>{
   const ownerId=req.user.id
   const{title,imageUrl,participantId}=req.body
   conversationsControlleres.createConversation({title,imageUrl,participantId,ownerId})
   .then(data=>{
    res.status(201).json(data)
   })
   .catch(err=>{
    res.status(400).json({
        message:err.message,
        fields:{
            title:'string',
            imageUrl:'string',
            participantId:'UUID'
        }
    })
   })
}

const patchConversation=(req,res)=>{
    const id=req.params.conversation_id
    const {title,imageUrl}=req.body
    conversationsControlleres.updateConversation(id,{title,imageUrl})
    .then(data=>{
        if(data){
            res.status(200).json({message: `Conversation edited succesfully with id: ${id}`})
        }else {
            res.status(404).json({message: `Conversation with id: ${id}, not found`})
        }
    })
    .catch(err=>{
        res.status(400).json({
            message:err.message
        })
    })
}


const deleteConversation=(req,res)=>{
    const id=req.params.conversation_id
    conversationsControlleres.deleteConversation(id)
    .then(data=>{
        if(data){
            res.status(204).json()
        }else {
            res.status(404).json({message: `Conversation with id:${id}, Not Found`})
        }
    })
    .catch(err=>{
        res.status(400).json({
            message:err.message
        })
    })
}


module.exports={
    getAllConversations,
    getAllConversationsUserId,
    getAllConversationsUserIdOwner,
    getConversationById,
    postConversation,
    patchConversation,
    deleteConversation
    
}