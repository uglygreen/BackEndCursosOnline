import routerx from 'express-promise-router'
import useController from '../controllers/UserController'
import auth from '../service/auth'

const router = routerx();


router.post("/register", useController.register)
router.post("/login_tienda", useController.login)
router.post("/login_admin", useController.loginAdmin)

export default router;