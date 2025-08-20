const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESKEY";


const auth = (req , res , next)=>{
    try{
        let token =  req.headers.authorization;
        if(token){
            token = token.split(" ")[1];
            let user = jwt.verify(token, SECRET_KEY);
            req.userId = user.id;
        }
        else{
            res.status(401).json({massage: " Unauthorized user"})
        }

        next();


    }
    catch(error){
        console.log(error);
        res.status(401).json({
            massage : "Unauthorized user"
        })
    }
}

module.exports = auth;
