import routerx from 'express-promise-router'

import UserController from '../controllers/UserController';

import auth from '../service/auth'

import multiparty from 'connect-multiparty';

var path = multiparty({uploadDir : './uploads/user'})

const router = routerx();

//auth.verifyAdmin
router.post("/register", UserController.register)
router.post("/login_tienda", UserController.login)
router.post("/login_admin", UserController.loginAdmin)
// CRUD ADMIN 
router.post("/register_admin", [ path], UserController.register_admin)
router.post("/update", [auth.verifyAdmin, path], UserController.update)
router.get("/list", [auth.verifyAdmin] ,UserController.list)
router.delete("/delete/:id", auth.verifyAdmin,  UserController.remove)

router.get("/imagen-usuario/:img", UserController.getImagen);

export default router;