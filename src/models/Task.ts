import mongoose, { Schema, Document, Types } from "mongoose";

const taskStatus = {
    PENDING: 'pending',
    ON_HOLD: 'onHold',
    IN_PROGRESS: 'inPRogress',
    UNDERREVIEW: 'underReview',
    COMPLETE: 'completed'
} as const

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]

export interface ITask extends Document {
    name: string,
    description: string
    project: Types.ObjectId
    status: TaskStatus,
    completedBy:{
        user: Types.ObjectId,
        status: TaskStatus
    }[]
}


const TaskSchema: Schema = new Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    project: { type: Types.ObjectId, ref: 'Project', required: true, trim: true },
    status: { type: String, enum: Object.values(taskStatus), default: taskStatus.PENDING },
    completedBy: [{
        user: {
            type: Types.ObjectId,
            ref: 'User',
            default: null
        },
        status: {
            type: String, 
            enum: Object.values(taskStatus), 
            default: taskStatus.PENDING
        }
    }]
}, { timestamps: true })

const Task = mongoose.model<ITask>('Task', TaskSchema)

export default Task