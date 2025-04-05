import { Router } from 'express';
import UserController from '../controller/user.controller.js';
import { isAuth,Role } from '../utils/Auth.js';
import ItemsController from '../controller/item.controller.js';
import upload from '../middlewares/upload.middleware.js';

const route = Router();

//User route
route.post('/SignUp',UserController.SignUp)
route.post('/LogIn',UserController.LogIn)
route.get('/user-info',isAuth,UserController.UserInfo)

//Items route
route.get('/items/search',isAuth,Role('admin','user'),ItemsController.SearchItems)
route.get('/items',isAuth,Role('admin','user'),ItemsController.AllItems)
route.get('/items/:item_id',isAuth,Role('admin','user'),ItemsController.OneItems)
route.post('/items/withdrawal',isAuth,Role('user'),ItemsController.Withdrawal)
route.put('/items/:item_id',isAuth,Role('admin'),ItemsController.UpdateItemsQuantity)
route.delete('/items/:item_id', isAuth, Role('admin'), ItemsController.SoftDeleteItem);
route.post('/items/add',isAuth, Role('admin'),upload.single('image'),ItemsController.AddItem)


export default route