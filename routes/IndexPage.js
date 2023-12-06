module.exports = (req,res) => {
    res.render('index.ejs',{Schoolabb : process.env.SCHOOL_AS_AKA ,success: req.flash('loginSuccess'),ID:req.session.userId,
    danger: req.flash('danger')})
}