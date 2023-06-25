import UsersSer from '../services/UsersSer.js'
import hashHelper from '../utils/md5.js'
import Users from '../models/Users.js'
const usersSer = new UsersSer()

const loginGet = (req, res, next) => {
    if (req.session.loginUser) {
        res.redirect('/')
    }
    res.render('login', {
        title: 'Login Page',
    })
}

const loginPost = (req, res, next) => {
    const { username, password } = req.body
    usersSer.findByNameAsync(username).then((users) => {
        if (users.length == 0) {
            res.json({ ret_code: 500, ret_msg: 'Information error' })
        } else {
            if (users[0].password == hashHelper.md5Text(password)) {
                req.session.loginUser = username
                
                res.json({
                    ret_code: 200,
                    data: {
                        id: users[0].id
                    },
                    ret_msg: 'Success'
                })
            } else {
                res.json({ ret_code: 500, ret_msg: 'Information Error' })
            }
        }
    }).catch((err) => {
        res.status(500)
        console.log(err)
    })
    
}

const logOut = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err)
            res.json({ ret_code: 500, ret_msg: 'Error' })
            return
        }
        res.clearCookie('SESSION_ID');
        res.redirect('/login')
    })
}


const registerGet = (req, res, next) => {
    res.render('register', {
        title:'Reigster'
    })
}

const registerPost = (req, res, next) => {
    const { username, password } = req.body
    if (username == '' || password == '') {
        res.status(500)
    } else {
        usersSer.findByNameAsync(username).then((data) => {
            if (data.length !=0)
                res.json({ ret_code: 500, ret_msg: 'Duplicate username' })
            else {
                usersSer.createAsync(Users.build({ username: username, password: hashHelper.md5Text(password) }))
                
                res.json({ret_code:200,ret_msg:'Success'})
            }
        })
    }
}

export default {
    loginGet,
    loginPost,
    logOut,
    registerGet,
    registerPost
}