import routerx from 'express-promise-router'

import auth from '../service/auth'
import UbicacionController from '../controllers/UbicacionController';

const router = routerx();


router.post("/register",[auth.verifyAdmin], UbicacionController.register);
router.post("/update",[auth.verifyAdmin], UbicacionController.update);
router.get("/list",[auth.verifyAdmin], UbicacionController.list);
router.post("/delete/:id",[auth.verifyAdmin], UbicacionController.delete);

export default router;