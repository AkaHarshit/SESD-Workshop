import mongoose, { Document } from 'mongoose';
export type EmployeeStatus = 'active' | 'on_leave' | 'terminated';
export interface IEmployeeDocument extends Document {
    name: string;
    email: string;
    department: string;
    position: string;
    salary: number;
    hireDate: Date;
    status: EmployeeStatus;
}
export declare const Employee: mongoose.Model<IEmployeeDocument, {}, {}, {}, mongoose.Document<unknown, {}, IEmployeeDocument, {}, {}> & IEmployeeDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Employee.d.ts.map