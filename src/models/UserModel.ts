import { Schema, model } from "mongoose";
import { hashPassword } from "../utils/hash-utils";

const userSchema = new Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    role: {type: String, default: "user"}
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    if (!this.password) {
        return next(new Error("The password cannot be empty"));
    }
    this.password = await hashPassword(this.password);
    next();
});

const Users = model("Users",userSchema)
export default Users;