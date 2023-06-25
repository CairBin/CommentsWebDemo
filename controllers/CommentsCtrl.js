import CommentsSer from './../services/CommentsSer.js'
import Comments from './../models/Comments.js'
const commentsSer = new CommentsSer()

const sessionCheck = (req,res,callback) => {
    if (req.session.loginUser) {
        callback()
    } else {
        res.redirect('/login')
    }
}

const showAllCommentsAsync = async (req, res, next) => {
    sessionCheck(req, res, () => {
        commentsSer.findAllAsync().then((data) => {
            res.render('index', {
                title: 'Comments',
                comments: data
            })
        }).catch((err) => {
            res.render('error', {
                title: 'Error Stack',
                error: err
            })
        })
    })
}

const loadingInsertPage = (req, res, next) => {
    sessionCheck(req, res, () => {
        res.render('insert', {
            title:'Write Your Comment',
            isNotReplay:true
        })
    })
}

const insertPost = (req, res, next) => {
    sessionCheck(req, res, () => {
        var { title, content,id} = req.body
        console.log(req.body)
        if (title && content && id) {
            commentsSer.createAsync(Comments.build({
                title: title,
                content: content,
                ownerId: id,
                ownerName:req.session.loginUser
            }))
            res.json({
                ret_code: 200,
                ret_msg:'Success'
            })
        } else {
            res.json({
                ret_code: 500,
                ret_msg:'Error'
            })
        }
    })
}

const queryOnesComments = (req, res, next) => {
    sessionCheck(req, res, () => {
        var ownerName = req.params.ownerName
        if (!ownerName)
            res.redirect('404.html')
        else {
            commentsSer.findAllByOwnerNameAsync(ownerName).then((data) => {
                res.render('index', {
                    title: ownerName + ' Comments',
                    comments:data
                })
            }).catch((err) => {
                console.log(err)
            })
        }
    })
}

const replayGet = (req,res,next)=>{
    sessionCheck(req,res,()=>{
        var {replayId,authorName} = req.params
        res.render('insert',{
            title:'Replay '+authorName,
            isNotReplay:false,
            replayId:replayId,
            ownerName:authorName
        })
    })
}

const replayPost = (req,res,next)=>{
    sessionCheck(req,res,()=>{
        var {title,content,id,replayId} = req.body
        console.log(req.body)
        if(title && content && id && replayId){
            commentsSer.createAsync(Comments.build({
                fatherId:replayId,
                ownerName:req.session.loginUser,
                title:title,
                content: content,
                ownerId:id
            }))
            res.json({ret_code:200,ret_msg:'Success'})
        }else{
            res.json({ret_code:500,ret_msg:'Information error'})
        }
    })
}

export default {
    showAllCommentsAsync,
    loadingInsertPage,
    insertPost,
    queryOnesComments,
    replayGet,
    replayPost
}