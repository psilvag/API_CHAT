
const participantsControllers=require('./participants.controllers')

const getAllParticipantsInConversation=(req,res)=>{
      const conversationId=req.params.conversation_id
      participantsControllers.findAllParticipantsInConversation(conversationId)
      .then(data=>{
        res.status(200).json(data)
      })
      .catch(err=>{
        res.status(400).json({
            message:err.message
        })
      })
}

const getParticipantByIdInConversation=(req,res)=>{
    const conversationId=req.params.conversation_id
    const participantId=req.params.participant_id
    participantsControllers.findParticipantByIdInConversation(conversationId,participantId)
    .then(data=>{
        if(data){
            res.status(200).json(data)
        }else {
            res.status(404).json({message:`Invalid ID, this user does not exist in this conversation`})
        }
    })
    .catch(err=>{
        res.status(400).json({
            message:err.message
        })
    })
    
}

const postNewParticipantsInConversation=(req,res)=>{
    const {participantId}=req.body
    const conversationId=req.params.conversation_id
    participantsControllers.addNewParticipantsInConversation(conversationId,{participantId})
    .then(data=>{
        res.status(201).json({
            data,
            message:'User added succesfuly'})       
    })
    .catch(err=>{
        res.status(400).json({
            message:err.message,
            fields:{
                participantId:'uuid'
            }
        })
    })
    
}

const deleteParticipantByIdInConversation=(req,res)=>{
    const conversationId=req.params.conversation_id
    const participantId=req.params.participant_id
    participantsControllers.deleteParticipantByIdInConversation(conversationId,participantId)
    .then(data=>{
        if(data){
            res.status(204).json()
        }else {
            res.status(404).json({message:`Invalid ID, this user does not exist in this conversation`})
        }
    })
    .catch(err=>{
        res.status(400).json({
            message:err.message
        })
    })
    
}




module.exports={
    getAllParticipantsInConversation,
    getParticipantByIdInConversation,
    deleteParticipantByIdInConversation,
    postNewParticipantsInConversation
}