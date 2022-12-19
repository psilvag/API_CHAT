const {DataTypes} = require('sequelize')
const db = require('../utils/database')
const Users=require('./users.models')
const Conversations=require('./conversations.model')

const Messages = db.define('messages',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    userId: {
        type:DataTypes.UUID,
        references:{
        key:'id',
        model:Users
       }
    },
    conversationId:{
        type:DataTypes.UUID,
        references:{
        key:'id',
        model:Conversations
        
        }
    },
    message:{
        type:DataTypes.TEXT,
        allowNull:false
    }
})

module.exports = Messages