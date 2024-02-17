import routerx from 'express-promise-router';
import User from './User';
import Categoria from './Categoria';

// http://localhost:3000/api/users/register
const router = routerx();

router.use('/users', User);
router.use('/categorias', Categoria);

export default router;