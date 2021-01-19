const jwt = require("jsonwebtoken");

// On vérifie si l'utilisateur qui effectue la requête est bien authentifié avec un jeton valide
module.exports.checkAuth = async (req, res, next) => {
    let accessToken = req.headers.authorization;
    if (!accessToken) return res.status(403).json({ message: "You need a valid token to continue." });
    accessToken = accessToken.split("Bearer ")[1];

    jwt.verify(accessToken, process.env.JWT_SECRET_TOKEN, async (err, user) => {
        if (user) {
            console.log("Middleware checkAuth ", user);
            req.user = user;
            next();
        } else {
            console.log(err);
            return res.status(403).json({ err, message: "User not authenticated" });
        }
    });
};

// JWT :
/*
    Fournis des tokens sécurisés par une clé de hashage qu'on lui fournis, grâce à cette clé de hashage 
    cela nous permet d'authentifier l'utilisateur
    et de le faire naviguer sur l'applciation en sécurité. Pour vérifier son identité
*/
