import {DataTypes, Model } from 'sequelize'
import DatabaseHelper from './../database/index.js'

const sequelize = DatabaseHelper.getConn('Users')

class Users extends Model{

}


Users.init({
    id: {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull: false,
        primaryKey:true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull:false
    }
}, { sequelize })


export default Users