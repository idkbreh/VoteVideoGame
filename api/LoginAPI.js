const bcrypt = require('bcrypt')
const User = require('../models/users')

module.exports = (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    User.findOne({ Email: email }).then((user) => {
        console.log(user)

        if (user) {
            let cmp = bcrypt.compare(password, user.Password).then((match) => {
                if (match) {
                    // Keep a username role codeRoom in session
                    req.session.userId = user.Username
                    req.session.UniqueID = user._id
                    console.log(req.session.UniqueID)
                    const Errors = "Login Successfully !";
                    req.flash('loginSuccess', Errors);
                    return res.redirect('/')
                } else {
                    const Errors = "Email or Password doesn't matching";
                    req.flash('loginError', Errors);
                    return res.redirect('/login');
                }
            })
        } else {
            const Errors = "Server internal error";
            req.flash('loginError', Errors);
            return res.redirect('/login');
        }
    })
}