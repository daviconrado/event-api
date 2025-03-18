import { Schema, model } from "mongoose";
import { hashPassword } from "../utils/hashUtils";

const userSchema = new Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    role: String
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    if (!this.password) {
        return next(new Error("A senha não pode ser vazia"));
    }
    this.password = await hashPassword(this.password);
    next();
});

const Users = model("Users",userSchema)
export default Users;