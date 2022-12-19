const Users = require('./users.models')
const Conversations=require('./conversations.model')
const Participants=require('./participants.model')
const Messages=require('./messages.models')

const initModels = () => {

    //?Users-conversations
    Users.hasMany(Conversations)
    Conversations.belongsTo(Users)

    //?Users-messages
    Users.hasMany(Messages)
    Messages.belongsTo(Users)

    //? usuarios - participaciones  pivote table between users - conversations
    
    //?Users-participants 
    Users.hasMany(Participants)
    Participants.belongsTo(Users)

    //?Conversations-messages
    Conversations.hasMany(Messages)
    Messages.belongsTo(Conversations)

    //?Conversations-participants
    Conversations.hasMany(Participants)
    Participants.belongsTo(Conversations)






}

module.exports = initModels