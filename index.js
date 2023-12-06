require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fsPromises = require('fs').promises;
const fs = require('fs');
const mongoose = require('mongoose')
const ejs = require('ejs')
const flash = require('connect-flash')
const expressSession = require('express-session');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
// SETTING APP PULIC AND VIEWS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs')
app.set('views', __dirname + '/views');
app.use(flash())
app.use(cors());
const dbURI = process.env.MONGOURL
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
app.use(expressSession({
    resave: false, 
    saveUninitialized: false,
    secret:"Usdc@&!sdj233"
}))
app.use("*",(req,res,next) =>{
    loggedIn = req.session.userId
    next()
  })


// IMPORT PAGE & API
const IndexPage = require("./routes/IndexPage");
const LoginPage = require("./routes/LoginPage");
const RegisterPage = require("./routes/RegisterPage");

//IMPORT MIDDLEWARE
const RedirectAUTH = require("./middleware/redirectAuth")
const RedirectNOTAUTH = require("./middleware/redirectNotAuth")
const logoutAPI = require('./api/LogoutAPI')
const registerAPI = require("./api/RegsiterAPI")
const LogoutAPI = require("./api/LogoutAPI")
const LoginAPI = require("./api/LoginAPI")
const VoteAPI = require("./api/voteAPI")
const FetchDataAPI = require("./api/FetchData")
// API PART
app.post('/api/register',RedirectAUTH,registerAPI)
app.post('/api/login',RedirectAUTH,LoginAPI)
app.get('/api/vote',VoteAPI)
app.get('/api/fetch/status',FetchDataAPI)
app.get('/logout',logoutAPI)
//PAGE PART
app.get('/',IndexPage)
app.get('/login',RedirectAUTH,LoginPage)
app.get('/register',RedirectAUTH,RegisterPage)
// app.get('/fetch/loadfiles', (req, res) => {
//     const publicFolderPath = path.join(__dirname, 'public');
//     fs.readdir(publicFolderPath, (err, files) => {
//       if (err) {
//         console.error('Error reading public folder:', err);
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }
//       const htmlFiles = files.filter(file => path.extname(file) === '.html');
//       res.json({ fileNames: htmlFiles });
//     });
//   });
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
