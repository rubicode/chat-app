import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
const saltRounds = 10;

export interface IUser extends Document {
    username: string;
    password: string;
    token: string;
    created: true | false;
    checkPassword: (password: string) => boolean;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

userSchema.pre('save', function (next) {
    // if (!this.created) {
    //     this.password = bcrypt.hashSync(this.password, saltRounds)
    // }
    next();
});

userSchema.method('checkPassword', function (password: string): boolean {
    return bcrypt.compareSync(password, this.password)
});

userSchema.static('hashPassword', function (password: string): string {
    return bcrypt.hashSync(password, saltRounds);
});

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);

