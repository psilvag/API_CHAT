
const Messages=require('../models/messages.models')
const Users=require('../models/users.models')
const uuid=require('uuid')

const createMessage = async (obj) => {
    const data = await Messages.create({
        id: uuid.v4(),
        userId : obj.userId,
        conversationId: obj.conversationId,
        message: obj.message
    })
    return data
}


const findAllMessagesByConversationId=async(conversationId)=>{
    const data= await Messages.findAll({
        where:{
            conversationId:conversationId
        }
    })
    return data
}

const findMessageById=async(conversationId,messageId)=>{
    const data= await Messages.findOne({
        where:{
            conversationId:conversationId,
            id:messageId
       
        }
    })
    return data
}

const deleteMessage=async(conversationId,messageId)=>{
    const data=await Messages.destroy({
        where:{
            conversationId:conversationId,
            id:messageId
        }
    })
    return data
}


module.exports = {
    createMessage,
    findAllMessagesByConversationId,
    findMessageById,
    deleteMessage
}