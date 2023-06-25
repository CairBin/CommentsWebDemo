import UsersDao from './../daos/UserDao.js'
import Users from './../models/Users.js'
import BaseSer from './BaseSer.js'
export default class UsersSer extends BaseSer{
    constructor() {
        super(Users,new UsersDao())
    }

    /**
     * 根据用户名查询数据
     * @param {String} name 用户名
     * @returns 查询结果的JSON对象数组
     */
    async findByNameAsync(name) {
        var user = await this.cacheDb.find({ username: name })
        if (user.length == 0) {
            return this.remoteDb.findAll({
                where: {
                    username:name
                }
            })

        }

        return user
    }
}