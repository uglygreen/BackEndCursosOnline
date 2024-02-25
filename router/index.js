import routerx from 'express-promise-router';
import User from './User';
import Categoria from './Categoria';
import Alarma from './Alarma'
import Ubicacion from './Ubicacion';
import Permiso from './Permiso';

// http://localhost:3000/api/users/register
const router = routerx();

router.use('/users', User);
router.use('/categorias', Categoria);
router.use('/alarmas', Alarma);
router.use('/ubicacion', Ubicacion);
router.use('/permisos', Permiso);

export default router;