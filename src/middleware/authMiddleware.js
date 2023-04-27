import jwt from 'jsonwebtoken';

//allow to protect route and set req.user with user detail
const protect = async (req, res, next) => {
    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //retrieve user without password
            console.log(decoded)
            next();
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not authorized, token failed');
        }
    }
    if(!token){
        res.status(401);
        throw new Error('Not authorized, no token')
    }
}



export {
    protect
}