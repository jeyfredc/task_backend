"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskExists = taskExists;
exports.taskBelongsToProject = taskBelongsToProject;
exports.hasAuthorization = hasAuthorization;
const Task_1 = __importDefault(require("../models/Task"));
async function taskExists(req, res, next) {
    try {
        const { taskId } = req.params;
        const task = await Task_1.default.findById(taskId);
        if (!task) {
            const error = new Error('Tarea no encontrado');
            return res.status(404).json({
                error: error.message
            });
        }
        req.task = task;
        next();
    }
    catch (error) {
        res.status(500).json({
            error: 'Hubo un error'
        });
    }
}
async function taskBelongsToProject(req, res, next) {
    try {
        if (req.task.project.toString() !== req.project.id.toString()) {
            const error = new Error('Acción no valida');
            return res.status(400).json({
                error: error.message
            });
        }
        next();
    }
    catch (error) {
        res.status(500).json({
            error: 'Hubo un error'
        });
    }
}
async function hasAuthorization(req, res, next) {
    try {
        if (req.user.id.toString() !== req.project.manager.toString()) {
            const error = new Error('Acción no valida');
            return res.status(400).json({
                error: error.message
            });
        }
        next();
    }
    catch (error) {
        res.status(500).json({
            error: 'Hubo un error'
        });
    }
}
//# sourceMappingURL=task.js.map