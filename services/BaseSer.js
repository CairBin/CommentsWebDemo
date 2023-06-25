/**
 * 服务层基类，定义通用的基本功能
 * 调用Dao层使用nedb作为缓存数据库
 * 用于给其他服务层的类继承
 */
export default class BaseSer{

    /**
     * 构造器，用于初始化
     * @param {*} seqDao sequelize的Model静态对象
     * @param {*} nedbDao nedb的Dao层对象
     */
    constructor(seqDao,nedbDao) {
        this.cacheDb = nedbDao
        this.remoteDb = seqDao
        this.remoteDb.sync()    //模型同步
    }

    /**
     * 查询一条数据，优先考虑缓存，缓存没有则从远程数据库获取并插入到本地缓存
     * @param {String} id UUID 
     * @returns {Array} 包含查询结果JSON对象的数组
     */
    async findAsync(id) {
        var cacheData = await this.cacheDb.findById(id)
        if (cacheData.length != 0)
            return cacheData

        var res = await this.remoteDb.findByPk(id)
        for (var i = 0; i < res.length(); i++){
            this.cacheDb.insert(res[i].toJSON())
        }
        return res
    }

    /**
     * 查询表（或缓存数据集）中的所有数据
     * @returns {Array} 包含查询结果的JSON对象的数组
     */
    async findAllAsync() {
        var data = await this.cacheDb.find({})
        console.log('Cache database data number：', data.length)
        if (data.length == 0) {
            var res = await this.remoteDb.findAll()
            for (var i = 0; i < res.length; i++) {
                this.cacheDb.insert(res[i].toJSON())
            }
            return res
        } else {
            return data
        }
    }

    /**
     * 插入一条数据
     * @param {Model} data 模型层的实例
     */
    async createAsync(data) {
        data.save()
        this.cacheDb.insert(data.toJSON())
    }
    
    /**
     * 更新一条数据
     * @param {Model} data 对应模型层的实例对象
     */
    async updateAsync(data) {
        data.save()
        this.cacheDb.deleteAsync(data.id)
        this.cacheDb.insert(data.toJSON())
    }

    /**
     * 根据id删除一条数据
     * @param {String} id UUID 
     * @returns {boolean} 删除是否成功
     */
    async deleteAsync(id) {
        var userModel = await this.findAsync(id)
        if (userModel.length!=0) {
            this.cacheDb.deleteAsync(id)
            this.remoteDb.destroy({
                where: {
                    id:id
                }
            })
            return true

        } else {
            return false
        }
    }

}