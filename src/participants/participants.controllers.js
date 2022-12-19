
const Participants=require('../models/participants.model')
const Users = require('../models/users.models')
const uuid=require('uuid')

const findAllParticipantsInConversation=async(conversationId)=>{
    const data= await Participants.findAll({
        where:{
            conversationId:conversationId
        },
        include:{
            model:Users,
            attributes:{
                exclude:['email','password','role','isVerified','phone']
            }
        }
    })
    return data
}

const findParticipantByIdInConversation=async(conversationId,participantId)=>{
    const data=await Participants.findOne({
        where:{
            conversationId:conversationId,
            userId:participantId
            
        },
        include:{
            model:Users,
            attributes:{
                exclude:['email','password','role','phone','isVerified']
            }
        }
        
    })
    return data
}

// busca un participante en especifico para validar que este dentro de la conversacion
const findParticipantConversations=async(userId,conversationId)=>{
    const data=await Participants.findOne({
        where:{
            userId:userId,
            conversationId:conversationId
        }
    })
    return data
}

const addNewParticipantsInConversation=async(conversationId,obj)=>{
    const data= await Participants.create({
      id:uuid.v4(),
      userId:obj.participantId,
      conversationId:conversationId
     })
     
    return data
}

const deleteParticipantByIdInConversation=async(conversationId,participantId)=>{
    const data=await Participants.destroy({
        where:{
            conversationId:conversationId,
            userId:participantId
            
        }
       
        
    })
    return data
}




module.exports={
    findAllParticipantsInConversation,
    findParticipantConversations,
    findParticipantByIdInConversation,
    deleteParticipantByIdInConversation,
    addNewParticipantsInConversation
}