import { Router } from 'express';
import UserController from '../controller/user.controller.js';

const route = Router();

//User route
route.post('/SignUp',UserController.SignUp)

export default route