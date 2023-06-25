import nedb from 'nedb'

/**
 * Dao基类，定义基本方法给其他类继承
 */
export default class BaseDao {
    /**
     * 构造函数，初始化内存式nedb数据库
     */
    constructor() {
        this.db = new nedb()
    }
    /**
     * 根据UUID查询一条数据
     * @param {String} id 主键uuid
     * @returns {Promise} 包含查询结果的Promise对象，其查询结果是个对象列表 
     */
    async findById(id) {
        return new Promise((res, rej) => {
            this.db.findOne({
                id: id
            }, (err, docs) => {
                if (err)
                    rej(err)
                else
                    res(docs)
            })
        })
    }

    /**
     * 查询满足条件的所有数据
     * @param {Object} condition 条件对象 
     * @returns {Promise} 包含查询结果的Promise对象，其查询结果是个对象列表
     */
    async find(condition) {
        return new Promise((res, rej) => {
            this.db.find(condition, (err, docs) => {
                if (err)
                    rej(err)
                else
                    res(docs)
            })
        })
    }

    /**
     * 插入一条数据
     * @param {Object} obj 要插入的数据对象 
     * @returns {Promise} 包含插入结果的Promise对象
     */
    async insert(obj) {
        return new Promise((res, rej) => {
            this.db.insert(obj, (err, docs) => {
                if (err)
                    rej(err)
                else
                    res(docs)
            })
        })
    }

    /**
     * 根据id更新一条数据
     * @param {String} id UUID
     * @param {Object} sets 包含更新信息的数据对象 
     * @returns {Promise} 包含更新结果的Promise对象，其结果为更新条目
     */
    async update(id, sets) {
        return new Promise((res, rej) => {
            this.db.update({ id }, {
                $set: sets
            }, (err, num) => {
                if (err)
                    rej(err)
                else
                    res(num)
            })
        })
    }

    /**
     * 根据UUID来删除一条数据
     * @param {String} id UUID 
     * @returns {Promise} 包含删除条目数的Promise的对象
     */
    async delete(id) {
        return new Promise((res, rej) => {
            this.db.remove({
                id: id
            }, (err, num) => {
                if (err)
                    rej(err)
                else
                    res(num)
            })
        })
    }

}