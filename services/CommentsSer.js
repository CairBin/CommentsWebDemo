import BaseSer from "./BaseSer.js";
import CommentsDao from "../daos/CommentsDao.js";
import Comments from './../models/Comments.js'
export default class CommentsSer extends BaseSer{
    constructor() {
        super(Comments,new CommentsDao())
    }

    /**
     * 根据评论所属用户的用户名，查询该用户的所有数据
     * @param {String} ownerName 所属用户的用户名
     * @returns {Array} 包含查询结果JSON对象的数组
     */
    async findAllByOwnerNameAsync(ownerName) {
        var comments = await this.cacheDb.find({
            ownerName
        })

        if (comments.length == 0) {
            return await this.remoteDb.findAll({
                where: {
                    ownerName:ownerName
                }
            })
        }

        return comments
    }
}