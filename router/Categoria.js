import routerx from 'express-promise-router'

import auth from '../service/auth'
import multiparty from 'connect-multiparty'
import CategoriaController from '../controllers/CategoriaController';


var path = multiparty({uploadDir: './uploads/categoria'});
const router = routerx();


router.post("/register",[auth.verifyAdmin, path], CategoriaController.register);
router.post("/update",[auth.verifyAdmin, path], CategoriaController.update);
router.get("/list",[auth.verifyAdmin], CategoriaController.list);
router.delete("/delete/:id",[auth.verifyAdmin], CategoriaController.delete);


router.get("/imagen-categoria/:img", CategoriaController.getImagen);

export default router;