import mongoose, { Document, Types } from "mongoose";
declare const taskStatus: {
    readonly PENDING: "pending";
    readonly ON_HOLD: "onHold";
    readonly IN_PROGRESS: "inProgress";
    readonly UNDERREVIEW: "underReview";
    readonly COMPLETE: "completed";
};
export type TaskStatus = typeof taskStatus[keyof typeof taskStatus];
export interface ITask extends Document {
    name: string;
    description: string;
    project: Types.ObjectId;
    status: TaskStatus;
    completedBy: {
        user: Types.ObjectId;
        status: TaskStatus;
    }[];
    notes: Types.ObjectId[];
}
declare const Task: mongoose.Model<ITask, {}, {}, {}, mongoose.Document<unknown, {}, ITask> & ITask & Required<{
    _id: unknown;
}>, any>;
export default Task;
