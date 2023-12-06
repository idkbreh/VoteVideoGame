const User = require('../models/users');

module.exports = (req, res) => {
    const { username, password, email, rePassword } = req.body;
    console.log(username, password, email, rePassword);
    if(!username||!password||!email||!rePassword){
        console.log("None data username password email");
        const Errors = "Password and Username require";
        req.flash('registerError', Errors);
    }
    if (password !== rePassword) {
        console.log("Password and re-password do not match");
        const Errors = "Password and re-password do not match";
        req.flash('registerError', Errors);
        return res.redirect('/register');
    }
    User.findOne({
        $or: [
            { Username: username },
            { Email: email }
        ]
    }).then(existingUser => {
        if (existingUser) {
            const Errors = "Username or email already in use";
            req.flash('registerError', Errors);
            return res.redirect('/register');
        } else {
            var vote_perms = 0
            const newUser = User.create({ Username: username, Email: email, Password: password ,Vote:vote_perms}).then(() => {
                console.log("Registration successful");
                req.session.userId = username
                req.session.UniqueID = newUser._id
                console.log(req.session.UniqueID)
                const Errors = "Login Successfully !";
                req.flash('loginSuccess', Errors);
                res.redirect('/');
            }).catch((err) => {
                console.log(err);
                const Errors = "Server error";
                req.flash('registerError', Errors);
                return res.redirect('/register');
            });
        }
    }).catch(err => {
        console.log(err);
        const Errors = "Server error";
        req.flash('registerError', Errors);
        return res.redirect('/register');
    });
};