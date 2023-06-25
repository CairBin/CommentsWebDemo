const logErrors = (err,req,res,next)=>{
    console.log(err.stack)   
}

const clientError = (err, req, res, next)=>{
    if (req.xhr) {
        res.status(500).send({ error: 'Something blew up!' });
    } else {
        next(err);
    }
}

const errorHandler = (err,req,res,next)=>{
    res.status(500)
    res.render('error',{
        title:'Error',
        error:err
    })
}

export default {
    logErrors,
    clientError,
    errorHandler
}