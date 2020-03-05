import { Router } from 'express'
import { home, updateAvatar, messages} from '../controllers/private.controllers'
import { updateUser, deleteUser } from '../controllers/user.controller'
import multer from '../libs/multer';
import passport from 'passport'
const router = Router();

router.get('/home', passport.authenticate('jwt', { session: false }), home);
router.put('/avatar/:userName', passport.authenticate('jwt', { session: false }), multer.single('avatar'),updateAvatar )
router.put('/user/:userName',passport.authenticate('jwt', { session: false }), updateUser);
router.delete('/user/:userName',passport.authenticate('jwt', { session: false }), deleteUser);
router.get('/messages' ,passport.authenticate('jwt', { session: false }), messages)

export default router;