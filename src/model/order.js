import mongoose, { Schema } from "mongoose";

const OrderItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
});

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        items: [OrderItemSchema],
        orderNumber: {
            type: String,
            auto: true,
            unique: true
        },
        customerInfo: {
            type: {
                name: {
                    type: String,
                    required: true,
                },
                phone: {
                    type: Number,
                    required: true,
                },
                email: {
                    type: String,

                },
                payment: {
                    type: String,
                },
                address: {
                    type: String,
                    required: true,
                }
            },
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
            default: "pending",
        },
    },
    { timestamps: true, versionKey: false }
)
export default mongoose.model("Order", OrderSchema)