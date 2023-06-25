import { Sequelize } from "sequelize"
import localConfig from './../config.js'

const getConn = (connName) => {
    console.log("-----"+connName+"------")
    return new Sequelize(localConfig.database.dbName,
        localConfig.database.user, localConfig.database.password,
        {
            host: localConfig.database.host,
            dialect: localConfig.database.kind,
            port: localConfig.database.port
            
        }
    )
}




export default {
    getConn,
}