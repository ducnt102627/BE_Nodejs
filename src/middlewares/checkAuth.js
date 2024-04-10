import jwt from 'jsonwebtoken';
import User from '../model/user';

const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        const { id } = await jwt.verify(token, "123456");

        const user = await User.findById(id);
        console.log(user)
        if (!user.role !== "admin") {
            return res.status(401).json({ message: "Bạn không có quyền truy cập" });
        };
        next();
    } catch (error) {

    }
}
export default checkAuth;