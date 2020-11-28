const jwt = require('jsonwebtoken');

// allows a user to access a given route if they have a valid token
// Good for private routes

const auth = (req, res, next) => {
    const header = req.header.authorization;
    let decodedToken;

    //Authorization:
    if (header){
        const splitHeader = header.split(' ');
        if (splitHeader.length !== 2 && splitHeader[0] !== 'Bearer')
            next();
        else{
            try {
                decodedToken = jwt.verify(splitHeader[1], 'SECRET');
                req.userId = decodedToken;
                next();
            }
            catch (err) {
                res.status(401).send('Unauthorized');
            }
        }
    }
}