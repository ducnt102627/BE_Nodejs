import Joi from "joi"
import Product from "../model/product"
const productSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Tên sản phẩm là bắt buộc",
        "string.empty": "Tên sản phẩm không được để trống"
    }),
    image: Joi.string().required().trim().messages({
        "any.required": "Ảnh sản phẩm là bắt buộc",
        "string.empty": "Ảnh sản phẩm không được dể trống",
        "string.trim": "Ảnh phải là một chuỗi"
    }),
    price: Joi.number().required().min(0).messages({
        "any.required": "Giá sản phẩm là bắt buộc",
        "number.empty": "Giá sản phẩm không được để trống",
        "number.base": "Giá sản phẩm phải là số",
        "nummber.min": "Giá không được nhỏ hơn {#litmit}"
    }),
    description: Joi.string().required().min(10).max(200).message({
        "any.required": "Mô tả sản phẩm là bắt buộc",
        "string.empty": "Mô tả sản phẩm không được đẻ trống",
        "string.min": "Mô tả sản phẩm phải có ít nhất {#limit} ký tự",
        "string.max": "Mô tả sản phẩm không dược vượt quá {#limit} ký tự",
    }),
    category: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    featured: Joi.boolean(),
    discount: Joi.number(),
    gallery: Joi.array(),
    countInStock: Joi.number(),
    tags: Joi.array(),

})

export const getProducts = async (req, res) => {
    try {
        const data = await Product.find();
        if (data.length < 0) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        }
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const getProductById = async (req, res) => {
    try {
        const data = await Product.findOne({ _id: req.params.id });
        if (data.length < 0) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        }
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const data = await Product.findOneAndDelete({ _id: req.params.id });
        if (data.length < 0) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        }
        res.status(201).json({ message: "xóa sản phẩm thành công", data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addProduct = async (req, res) => {
    try {

        const { error } = productSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const messages = error.details.map((item) => item.message);
            return res.status(400).json({ messages, })
        }
        const product = await Product(req.body).save();
        res.status(201).json({ message: "Thêm sản phẩm thành công", product })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const messages = error.details.map((item) => item.message);
            return res.status(404).json({ messages, })
        }
        console.log(error)
        const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        console.log(product)
        res.status(201).json({ message: "Cập nhập sản phẩm thành công", product })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}