const developement = {
name:'developement',
asset_path:'./assets',
session_cookie_key:'blahsomething',
db:'codeial-developement',
smtp:{
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'riteshkumar411552@gmail.com',
        pass:
    }

},
    google_client_id: 
    google_client_secret: 
    google_callbackURL:
    jwt_secret:

}


const production = {
name:'production',
asset_path:process.env.CODEIAL_ASSETS_PATH,
session_cookie_key:process.env.CODEIAL_SESSION_COOKIE_KEY,
db:process.env.CODEIAL_DB,
smtp:{
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:process.env.CODEIAL_GMAIL_USERNAME,
        pass:process.env.CODEIAL_GMAIL_PASSWORD
    }

},
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.CODEIAL_GOOGLE_CLIET_SECRET,
    google_callbackURL: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret:process.env.CODEIAL_JWT_SECRET

}


// module.exports = eval(process.env.CODEIAL_ENVIROMENT) == undefined ? developement : eval(process.env.CODEIAL_ENVIROMENT);
module.exports = eval(process.env.NODE_ENV) == undefined ? developement : eval(process.env.NODE_ENV);
