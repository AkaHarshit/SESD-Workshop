import mongoose, { Document, Schema } from 'mongoose';

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

const EmployeeSchema = new Schema<IEmployeeDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true, min: 0 },
    hireDate: { type: Date, required: true, default: Date.now },
    status: { type: String, enum: ['active', 'on_leave', 'terminated'], default: 'active' }
  },
  { timestamps: true }
);

EmployeeSchema.index({ name: 'text', email: 'text', department: 'text', position: 'text' });

export const Employee = mongoose.model<IEmployeeDocument>('Employee', EmployeeSchema);
