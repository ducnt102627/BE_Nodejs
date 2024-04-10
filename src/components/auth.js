import Joi from "joi"
import User from "../model/user";
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken";
const signupSchema = Joi.object({
    name: Joi.string().required().min(2).max(30).messages({
        "any.required": "Tên là bắt buộc!",
        "string.empty": "Tên không dược để trống",
        "string.min": "Tên phải có ít nhất {#limit} ký tự",
        "string.max": "Tên phải có nhiều nhất {#limit} ký tự",
    }),
    email: Joi.string().email().required().messages({
        "any.required": "Email là bắt buộc!",
        "string.empty": "Email không dược để trống",
        "string.email": "Email không đúng định dạng",
    }),
    password: Joi.string().required().min(6).max(30).messages({
        "any.required": "Mật khẩu là bắt buộc!",
        "any.empty": " Mật khẩu không dược để trống",
        "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
        "string.max": "Mật khẩu phải có nhiều nhất {#limit} ký tự"
    }),
    confirmpassword: Joi.string().required().valid(Joi.ref("password")).messages({
        "any.required": "Confirm Password là bắt buộc",
        "any.only": "Mật khẩu không trùng khớp"
    }),
    avatar: Joi.string().uri().messages({
        "string.uri": "Avatar phải là đưòng dẫn hợp lệ"
    })
});
const signinSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "any.required": "Email là bắt buộc!",
        "string.empty": "Email không dược để trống",
        "string.email": "Email không đúng định dạng",
    }),
    password: Joi.string().required().min(6).max(30).messages({
        "any.required": "Mật khẩu là bắt buộc!",
        "any.empty": " Mật khẩu không dược để trống",
        "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
        "string.max": "Mật khẩu phải có nhiều nhất {#limit} ký tự"
    })
});

export const signup = async (req, res) => {
    try {
        const { name, email, password, avater } = req.body;
        const { error } = signupSchema.validate(req.body, { abortEarly: false });
        console.log(error);
        if (error) {
            const messages = error.details.map((item) => item.message);
            return res.status(400).json({ messages, })
        }

        const exitUser = await User.findOne({ email });
        if (exitUser) {
            return res.status(400).json({ messages: "Email đã tồn tại" });
        };

        const hasdedPassword = await bcryptjs.hash(password, 10);
        const role = (await User.countDocuments({})) === 0 ? "admin" : "user";
        const user = await User.create({ ...req.body, password: hasdedPassword, role })

        user.password = undefined;
        return res.status(201).json({
            messages: "Đăng ký thành công",
            user,
        })
    } catch (error) {
        return res.status(400).json({
            messages: error.message,
        });
    }
}

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = signinSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const messages = error.details.map((e) => e.message);
            return res.status(400).json({ messages, })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: " Email không tồn tại" });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Mật khẩu không đúng" });
        }

        const token = jwt.sign({ id: user.id }, "123456", { expiresIn: "1h" });
        user.password = undefined;
        return res.status(200).json({ message: "Đăng nhập thành công", user, token })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}