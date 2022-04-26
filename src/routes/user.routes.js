import Router from  'express';
import userCtrl from '../controllers/user.controller.js';
const router = Router();


router.get('/account/:id', userCtrl.getUser)
router.put('/account/:id', userCtrl.editUser)
router.post('/account/:id', userCtrl.signUp)

export default router;


