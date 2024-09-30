import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router()

router.post('/create-account', 
    body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
    body('password').isLength({min:8}).withMessage('El password es muy corto, minimo 8 caracteres'),
    body('password_confirmation').custom((value, {req})=>{
        if(value !== req.body.password){
            throw new Error('Las contraseñas no son iguales')
        }
        return true
    }).withMessage('El password es muy corto, minimo 8 caracteres'),
    body('email').isEmail().withMessage('El email no es valido'),
    handleInputErrors,
    AuthController.createAccount
)

router.post('/confirm-account',
    body('token').notEmpty().withMessage('El Token no puede ir vacio'),
    handleInputErrors,
    AuthController.confirmAccount
)

router.post('/login',
    body('email').isEmail().withMessage('El email no es valido'),
    body('password').notEmpty().withMessage('El password no puede ir vacio'),
    handleInputErrors,
    AuthController.login
)

router.post('/request-code',
    body('email').isEmail().withMessage('El email no es valido'),
    handleInputErrors,
    AuthController.requestConfirmationCode
)

router.post('/forgot-password',
    body('email').isEmail().withMessage('El email no es valido'),
    handleInputErrors,
    AuthController.forgotPassword
)


router.post('/validate-token',
    body('token').notEmpty().withMessage('El Token no puede ir vacio'),
    handleInputErrors,
    AuthController.validateToken
)

router.post('/update-password/:token',
    param('token').isNumeric().withMessage('Token no valido'),
    body('password').isLength({min:8}).withMessage('El password es muy corto, minimo 8 caracteres'),
    body('password_confirmation').custom((value, {req})=>{
        if(value !== req.body.password){
            throw new Error('Las contraseñas no son iguales')
        }
        return true
    }).withMessage('El password es muy corto, minimo 8 caracteres'),
    handleInputErrors,
    AuthController.updatePasswordWithToken
)

export default router