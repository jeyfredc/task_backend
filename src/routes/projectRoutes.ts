import { Router } from "express";
import { body, param } from "express-validator"
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middleware/project";
import { taskBelongsToProject, taskExists, hasAuthorization } from "../middleware/task";
import { authenticate } from "../middleware/auth";
import { TeamController } from "../controllers/TeamController";

const router = Router()

// Esto lo que hace es solicitar autenticacion  en todas las rutas por si alguna se olvida
router.use(authenticate)

router.post('/',
    body('projectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description').notEmpty().withMessage('La descripción del proyecto es obligatorio'),
    handleInputErrors,
    ProjectController.createProject)

router.get('/', ProjectController.getAllProjects)

router.get('/:id',
    param('id').isMongoId().withMessage('Id no valido'),
    handleInputErrors,
    ProjectController.getProjectById)

router.put('/:id',
    body('projectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description').notEmpty().withMessage('La descripción del proyecto es obligatorio'),
    handleInputErrors,
    ProjectController.updateProject)

router.delete('/:id',
    param('id').isMongoId().withMessage('Id no valido'),
    handleInputErrors,
    ProjectController.deleteProject)

/* Routes for tasks */

router.param('projectId', projectExists)

router.post('/:projectId/tasks',
    body('name').notEmpty().withMessage('El nombre de la tarea es obligatoria'),
    body('description').notEmpty().withMessage('La descripción de la tarea es obligatoria'),
    handleInputErrors,
    TaskController.createTask
)


router.get('/:projectId/tasks',
    TaskController.getProjectTasks
)
/* Se utilizan para evitar estar copiando los mismos metodos en el TaskController, 
las validaciones se tenian que hacer en cada uno de los metodos y esto lo que hace es simplificar ese proceso, 
y ejecuta y valida antes de continuar ejecutando una función */
router.param('taskId', taskExists)
router.param('taskId', taskBelongsToProject)

router.get('/:projectId/tasks/:taskId',

    param('taskId').isMongoId().withMessage('Id no valido'),
    handleInputErrors,
    TaskController.getTaskById
)


router.put('/:projectId/tasks/:taskId',
    hasAuthorization,
    param('taskId').isMongoId().withMessage('Id no valido'),
    body('name').notEmpty().withMessage('El nombre de la tarea es obligatoria'),
    body('description').notEmpty().withMessage('La descripción de la tarea es obligatoria'),
    handleInputErrors,
    TaskController.updateTask
)


router.delete('/:projectId/tasks/:taskId',
    hasAuthorization,
    param('taskId').isMongoId().withMessage('Id no valido'),
    handleInputErrors,
    TaskController.deleteTask
)


router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('Id no valido'),
    body('status').notEmpty().withMessage('El estado es obligatorio'),
    handleInputErrors,
    TaskController.updateStatus
)

/* Routes for teams */
router.post('/:projectId/team/find',
    body('email').isEmail().toLowerCase().withMessage('E-mail no es valido'),
    handleInputErrors,
    TeamController.findMemberByEmail
)

router.get('/:projectId/team',
    TeamController.getProjectTeam
)

router.post('/:projectId/team',
    body('id').isMongoId().withMessage('Id no valido'),
    handleInputErrors,
    TeamController.addMemberById
)

router.delete('/:projectId/team/:userId',
    param('userId').isMongoId().withMessage('Id no valido'),
    handleInputErrors,
    TeamController.removeMemberById
)

export default router

