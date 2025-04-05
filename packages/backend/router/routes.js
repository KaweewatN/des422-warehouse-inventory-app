import { Router } from 'express';
import UserController from '../controller/user.controller.js';
import { isAuth,Role } from '../utils/Auth.js';

const route = Router();

//User route
route.post('/user/SignUp',UserController.SignUp)
route.post('/user/LogIn',UserController.LogIn)
route.get('/user/info',isAuth,Role('user','admin'),UserController.UserInfo)
route.get('/user/history',isAuth,Role('user'),UserController.UserWithdrawalHistory)

export default route