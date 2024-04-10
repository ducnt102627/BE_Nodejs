import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 30,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,

        },
        password: {
            type: String,
            required: true,

        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        avatar: {
            type: String,
        },
    }, { timestamps: true, versionKey: false }
)
export default mongoose.model("User", userSchema);