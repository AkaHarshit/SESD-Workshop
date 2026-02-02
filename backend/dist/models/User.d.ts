import mongoose, { Document } from 'mongoose';
import { UserRole } from '../types';
export interface IUserDocument extends Document {
    email: string;
    password: string;
    name: string;
    role: UserRole;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
export declare const User: mongoose.Model<IUserDocument, {}, {}, {}, mongoose.Document<unknown, {}, IUserDocument, {}, {}> & IUserDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=User.d.ts.map