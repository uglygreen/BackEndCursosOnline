import routerx from 'express-promise-router';
import User from './User';

// http://localhost:3000/api/users/register
const router = routerx();

router.use('/users', User);

export default router;