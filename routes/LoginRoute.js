import express from 'express'
import UsersCtrl from '../controllers/UsersCtrl.js'

const router = express.Router()

router.get('/', (req, res, next) => {
    UsersCtrl.loginGet(req,res,next)
})

router.post('/', (req, res, next) =>{
    UsersCtrl.loginPost(req,res,next)
})


router.get('/register', (req, res, next) => {
    UsersCtrl.registerGet(req,res,next)
    
})

router.post('/register', (req, res, next) => {
    UsersCtrl.registerPost(req,res,next)
})

router.get('/logout', (req, res, next) => {
    UsersCtrl.logOut(req,res,next)
})

router.get('/test',(req,res,next)=>{
    res.send('123')
})

export default router