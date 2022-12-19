
const router=require('express').Router()
const passportJWT=require('../middlewares/auth.middleware')

const participantValidate=require('../middlewares/participantValidate.middleware')
const messagesServices=require('../messages/messages.services')
const conversationsServices=require('./conversations.services')
const participantsServices=require('../participants/participants.services')

//======================================CONVERSATIONS ALL/ME/OWNER===================================================
router.route('/')
    .get(passportJWT.authenticate('jwt',{session:false}),conversationsServices.getAllConversations)
    .post(passportJWT.authenticate('jwt',{session:false}),conversationsServices.postConversation)

router.route('/me')
    .get(passportJWT.authenticate('jwt',{session:false}),conversationsServices.getAllConversationsUserId)

router.route('/me/owner')
    .get(passportJWT.authenticate('jwt',{session:false}),conversationsServices.getAllConversationsUserIdOwner)

//======================================CONVERSATIONS===================================================
router.route('/:conversation_id')
    .get(passportJWT.authenticate('jwt',{session:false}),conversationsServices.getConversationById)
    .patch(passportJWT.authenticate('jwt',{session:false}),conversationsServices.patchConversation)
    .delete(passportJWT.authenticate('jwt',{session:false}),conversationsServices.deleteConversation)

//======================================CONVERSATIONS-MESSAGES===================================================
router.route('/:conversation_id/messages')
    .get(passportJWT.authenticate('jwt',{session:false}),participantValidate,messagesServices.getAllMessagesByConversationId)
    .post(passportJWT.authenticate('jwt',{session:false}),participantValidate,messagesServices.postMessage)
    

router.route('/:conversation_id/messages/:message_id')
    .get(passportJWT.authenticate('jwt',{session:false}),participantValidate,messagesServices.getMessageById)
    .delete(passportJWT.authenticate('jwt',{session:false}),participantValidate,messagesServices.deleteMessage)

//======================================CONVERSATIONS-PARTCIPANTS===================================================
router.route('/:conversation_id/participants')
    .get(passportJWT.authenticate('jwt',{session:false}),participantsServices.getAllParticipantsInConversation)
    .post(passportJWT.authenticate('jwt',{session:false}),participantValidate, participantsServices.postNewParticipantsInConversation)

router.route('/:conversation_id/participants/:participant_id')
    .get(passportJWT.authenticate('jwt',{session:false}),participantsServices.getParticipantByIdInConversation)
    .delete(passportJWT.authenticate('jwt',{session:false}),participantValidate,participantsServices.deleteParticipantByIdInConversation)



module.exports=router
