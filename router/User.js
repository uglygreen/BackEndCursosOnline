import routerx from 'express-promise-router'
import useController from '../controllers/UserController'
import auth from '../service/auth'

import multiparty from 'connect-multiparty';
import UserController from '../controllers/UserController';

var path = multiparty({uploadDir : './uploads/user'})

const router = routerx();

//auth.verifyAdmin
router.post("/register", useController.register)
router.post("/login_tienda", useController.login)
router.post("/login_admin", useController.loginAdmin)
// CRUD ADMIN 
router.post("/register_admin", [ auth.verifyAdmin, path], useController.register_admin)
router.post("/update", [auth.verifyAdmin, path], useController.update)
router.get("/list", [auth.verifyAdmin] ,useController.list)
router.delete("/delete/:id", auth.verifyAdmin,  useController.remove)

router.get("/imagen-usuario/:img", UserController.getImagen);

export default router;