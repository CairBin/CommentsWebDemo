import express from 'express'
import commentsCtrl from './../controllers/CommentsCtrl.js'

const router = express.Router()

router.get('/',(req,res,next)=>{
    commentsCtrl.showAllCommentsAsync(req,res,next)
})

router.get('/insert', (req, res, next) => {
    commentsCtrl.loadingInsertPage(req,res,next)
})

router.post('/insert', (req, res, next) => {
    commentsCtrl.insertPost(req,res,next)
})

router.get('/comments/:ownerName', (req, res, next) => {
    commentsCtrl.queryOnesComments(req,res,next)
})

router.get('/replay/id=:replayId;authorName=:authorName',(req,res,next)=>{
    commentsCtrl.replayGet(req,res,next)
})

router.post('/replay/id=:replayId;authorName=:authorName',(req,res,next)=>{
    commentsCtrl.replayPost(req,res,next)
})
export default router