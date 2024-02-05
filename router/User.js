import routerx from 'express-promise-router'
import useController from '../controllers/UserController'

const router = routerx();


router.post("/register", useController.register)

export default router;