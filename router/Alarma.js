import routerx from 'express-promise-router'

import auth from '../service/auth'
import AlarmaController from '../controllers/AlarmaController';

const router = routerx();


router.post("/register",[], AlarmaController.register);
router.post("/update",[], AlarmaController.update);
router.get("/list",[], AlarmaController.list);
router.delete("/delete/:id",[], AlarmaController.delete);

export default router;