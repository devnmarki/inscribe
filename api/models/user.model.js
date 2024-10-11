import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = mongoose.Schema ({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [8, "Password must be at least 8 characters long"]
    },
    profile_image: {
        type: String
    }
});

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("Incorrect password");
    }
    throw Error("Incorrect email");
}

const User = mongoose.model('User', userSchema);

export default User;