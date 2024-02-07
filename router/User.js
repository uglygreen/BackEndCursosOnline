import routerx from 'express-promise-router'
import useController from '../controllers/UserController'
import auth from '../service/auth'

const router = routerx();


router.post("/register", useController.register)
router.post("/login", useController.login)

export default router;