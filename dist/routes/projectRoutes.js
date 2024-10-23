"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const ProjectController_1 = require("../controllers/ProjectController");
const validation_1 = require("../middleware/validation");
const TaskController_1 = require("../controllers/TaskController");
const project_1 = require("../middleware/project");
const task_1 = require("../middleware/task");
const auth_1 = require("../middleware/auth");
const TeamController_1 = require("../controllers/TeamController");
const NoteController_1 = require("../controllers/NoteController");
const router = (0, express_1.Router)();
// Esto lo que hace es solicitar autenticacion  en todas las rutas por si alguna se olvida
router.use(auth_1.authenticate);
router.post('/', (0, express_validator_1.body)('projectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'), (0, express_validator_1.body)('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'), (0, express_validator_1.body)('description').notEmpty().withMessage('La descripción del proyecto es obligatorio'), validation_1.handleInputErrors, ProjectController_1.ProjectController.createProject);
router.get('/', ProjectController_1.ProjectController.getAllProjects);
router.get('/:id', (0, express_validator_1.param)('id').isMongoId().withMessage('Id no valido'), validation_1.handleInputErrors, ProjectController_1.ProjectController.getProjectById);
router.put('/:id', (0, express_validator_1.body)('projectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'), (0, express_validator_1.body)('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'), (0, express_validator_1.body)('description').notEmpty().withMessage('La descripción del proyecto es obligatorio'), validation_1.handleInputErrors, ProjectController_1.ProjectController.updateProject);
router.delete('/:id', (0, express_validator_1.param)('id').isMongoId().withMessage('Id no valido'), validation_1.handleInputErrors, ProjectController_1.ProjectController.deleteProject);
/* Routes for tasks */
router.param('projectId', project_1.projectExists);
router.post('/:projectId/tasks', (0, express_validator_1.body)('name').notEmpty().withMessage('El nombre de la tarea es obligatoria'), (0, express_validator_1.body)('description').notEmpty().withMessage('La descripción de la tarea es obligatoria'), validation_1.handleInputErrors, TaskController_1.TaskController.createTask);
router.get('/:projectId/tasks', TaskController_1.TaskController.getProjectTasks);
/* Se utilizan para evitar estar copiando los mismos metodos en el TaskController,
las validaciones se tenian que hacer en cada uno de los metodos y esto lo que hace es simplificar ese proceso,
y ejecuta y valida antes de continuar ejecutando una función */
router.param('taskId', task_1.taskExists);
router.param('taskId', task_1.taskBelongsToProject);
router.get('/:projectId/tasks/:taskId', (0, express_validator_1.param)('taskId').isMongoId().withMessage('Id no valido'), validation_1.handleInputErrors, TaskController_1.TaskController.getTaskById);
router.put('/:projectId/tasks/:taskId', task_1.hasAuthorization, (0, express_validator_1.param)('taskId').isMongoId().withMessage('Id no valido'), (0, express_validator_1.body)('name').notEmpty().withMessage('El nombre de la tarea es obligatoria'), (0, express_validator_1.body)('description').notEmpty().withMessage('La descripción de la tarea es obligatoria'), validation_1.handleInputErrors, TaskController_1.TaskController.updateTask);
router.delete('/:projectId/tasks/:taskId', task_1.hasAuthorization, (0, express_validator_1.param)('taskId').isMongoId().withMessage('Id no valido'), validation_1.handleInputErrors, TaskController_1.TaskController.deleteTask);
router.post('/:projectId/tasks/:taskId/status', (0, express_validator_1.param)('taskId').isMongoId().withMessage('Id no valido'), (0, express_validator_1.body)('status').notEmpty().withMessage('El estado es obligatorio'), validation_1.handleInputErrors, TaskController_1.TaskController.updateStatus);
/* Routes for teams */
router.post('/:projectId/team/find', (0, express_validator_1.body)('email').isEmail().toLowerCase().withMessage('E-mail no es valido'), validation_1.handleInputErrors, TeamController_1.TeamController.findMemberByEmail);
router.get('/:projectId/team', TeamController_1.TeamController.getProjectTeam);
router.post('/:projectId/team', (0, express_validator_1.body)('id').isMongoId().withMessage('Id no valido'), validation_1.handleInputErrors, TeamController_1.TeamController.addMemberById);
router.delete('/:projectId/team/:userId', (0, express_validator_1.param)('userId').isMongoId().withMessage('Id no valido'), validation_1.handleInputErrors, TeamController_1.TeamController.removeMemberById);
/* Routes for Notes */
router.post('/:projectId/tasks/:taskId/notes', (0, express_validator_1.body)('content').notEmpty().withMessage('El contenido de la nota es obligatorio'), validation_1.handleInputErrors, NoteController_1.NoteController.createNote);
router.get('/:projectId/tasks/:taskId/notes', validation_1.handleInputErrors, NoteController_1.NoteController.getTaskNotes);
router.delete('/:projectId/tasks/:taskId/notes/:noteId', (0, express_validator_1.param)('noteId').isMongoId().withMessage('Id no valido'), validation_1.handleInputErrors, NoteController_1.NoteController.deleteNoteById);
exports.default = router;
//# sourceMappingURL=projectRoutes.js.map