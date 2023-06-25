import { DataTypes, Model } from 'sequelize'
import DatabaseHelper from './../database/index.js'

const sequelize = DatabaseHelper.getConn('Comments')

class Comments extends Model {

}

Comments.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull:false
    },
    content:{
        type: DataTypes.TEXT,
        allowNull:false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull:false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull:false
    },
    fatherId: {
        type: DataTypes.TEXT,
        allowNull:true
    },
    ownerId:{
        type: DataTypes.TEXT,
        allowNull:false
    },
    ownerName: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, { sequelize })

export default Comments