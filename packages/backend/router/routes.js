import { Router } from 'express';
import UserController from '../controller/user.controller.js';
import { isAuth } from '../utils/Auth.js';

const route = Router();

//User route
route.post('/SignUp',UserController.SignUp)
route.post('/LogIn',UserController.LogIn)
route.get('/user-info',isAuth,UserController.UserInfo)

export default route