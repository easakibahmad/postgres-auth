import jwt from "jsonwebtoken"

export const verifyToken = (req: any, res: any, next: any) => {
    const token = req.cookies.token;


    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    const secretKey = process.env.JWT_SECRET_KEY;

    if (!secretKey) {
        return res.status(500).json({ message: 'JWT secret key is not defined in environment variables.' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next(); 
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
}
  