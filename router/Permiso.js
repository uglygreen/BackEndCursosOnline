import routerx from 'express-promise-router'

import auth from '../service/auth'
import PermisoController from '../controllers/PermisoController';

const router = routerx();


router.post("/register",[auth.verifyAdmin], PermisoController.register);
router.post("/update",[auth.verifyAdmin], PermisoController.update);
router.get("/list",[auth.verifyAdmin], PermisoController.list);
router.post("/delete/:id",[auth.verifyAdmin], PermisoController.delete);

export default router;