
const Conversations=require('../models/conversations.model')
const Participants=require('../models/participants.model')
const Users=require('../models/users.models')
const uuid=require('uuid')


const findAllConversations=async()=>{
    const data= await Conversations.findAll({
        include:{               
            model:Participants, 
            include:{
                model:Users,   
                attributes:{
                    exclude:['password','role','status','isVerified','createdAt','updatedAt']
                }                    
                
            }
        }
       
    })
    return data
}

const findAllConversationsUserId=async(userId)=>{
   const data= await Conversations.findAll({
    include:{
        model:Participants,
         where:{
             userId:userId
         }
  
     }
    })
   return data
}

const findAllConversationsUserIdOwner=async(userId)=>{
    const data= await Conversations.findAll({
        where:{
            userId:userId
        }
     })
    return data
 }


const findConversationId=async(id)=>{
    const data =await Conversations.findOne({
        where:{
            id:id
        },
        include:{
            model:Participants,
            include:{
                model:Users
            }
        }
    })
    return data
}


const createConversation=async(obj)=>{
    const newConversation= await Conversations.create({
        id:uuid.v4(),
        userId:obj.ownerId,// creador de la conversacion viene de req.user
        title:obj.title,
        imageUrl:obj.imageUrl
    })

    const participant1 =await Participants.create({
        id:uuid.v4(),
        userId:obj.ownerId,
        conversationId:newConversation.id
       
    })
    const participant2= await Participants.create({
        id:uuid.v4(),
        userId:obj.participantId,
        conversationId:newConversation.id,
    })
    return{
        participant1,
        participant2,
        newConversation
    } 
}


const updateConversation=async(id,obj)=>{
    const data=await Conversations.update(obj,{
        where:{
            id:id
        }
    })
    return data[0]
}

const deleteConversation=async(id)=>{
    const data=await Conversations.destroy({
        where:{
            id:id
        }
    })
    return data
}


module.exports={
    findAllConversations,
    findAllConversationsUserId,
    findAllConversationsUserIdOwner,
    findConversationId,
    createConversation,
    updateConversation,
    deleteConversation
}