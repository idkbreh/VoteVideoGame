module.exports = (req,res,next) =>{
    if(!req.session.userId){ // ถ้าไม่มี session
        return res.redirect('/login')
    }
    next()
}