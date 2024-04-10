import mongoose, { Schema } from "mongoose";
import category from "./category";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
        },
        slug: {
            type: String,
            unique: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            unique: true,
        },
        image: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        gallery: {
            type: Array,
        },
        description: {
            type: String,
        },
        discount: {
            type: Number,

        },
        countInStock: {
            type: Number,

        },
        featured: {
            type: Boolean,
            default: false,
        },
        tags: {
            type: Array,
        },
        attributes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Attribute"
            }
        ]
    },
    { timestamps: true, versionKey: false }
)
export default mongoose.model("Product", productSchema);