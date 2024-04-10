import Category from '../model/category';
import Product from '../model/product';

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        if (categories.length === 0) {
            return res.status(404).json({ message: "Không có danh mục nào" });
        }
        res.status(201).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const getCategoryById = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.id })
        const category = await Category.findOne({ _id: req.params.id });
        if (category.length === 0) {
            return res.status(404).json({ message: "Danh mục không tồn tại" });
        }
        res.status(201).json({ message: "About:", category, products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const deleteCategoryById = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({ _id: req.params.id });
        if (category.length === 0) {
            return res.status(404).json({ message: "Danh mục không tồn tại" });
        }
        res.status(201).json({ message: "Xóa danh mục thành công", category });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addCategory = async (req, res) => {
    try {
        const category = await Category(req.body).save();
        res.status(201).json({ message: "Thêm danh mục thành công", category })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateCategoryById = async (req, res) => {
    try {
        const category = await Category.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        console.log(Category)
        res.status(201).json({ message: "Cập nhập danh mục thành công", category })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}