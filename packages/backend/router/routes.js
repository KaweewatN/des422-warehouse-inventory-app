import {Router} from "express";
import UserController from "../controller/user.controller.js";
import {isAuth, Role} from "../utils/Auth.js";
import ItemsController from "../controller/item.controller.js";
import upload from "../middlewares/upload.middleware.js";
import AdminController from "../controller/admin.controller.js";

const route = Router();

//User route
route.post("/user/SignUp", UserController.SignUp);
route.post("/user/LogIn", UserController.LogIn);
route.get("/user/info", isAuth, Role("user", "admin"), UserController.UserInfo);
route.get("/user/history", isAuth, Role("user"), UserController.UserWithdrawalHistory);

//Items route
route.get("/items/search", isAuth, Role("admin", "user"), ItemsController.SearchItems);
route.get(
  "/items/search/category",
  isAuth,
  Role("admin", "user"),
  ItemsController.SearchItemsByCategory,
);
route.get("/items/items_type", isAuth, Role("admin", "user"), ItemsController.GetItemTypes);
route.get("/items", isAuth, Role("admin", "user"), ItemsController.AllItems);
route.get("/items/:item_id", isAuth, Role("admin", "user"), ItemsController.OneItems);
route.post("/items/withdrawal", isAuth, Role("user"), ItemsController.Withdrawal);
route.put("/items/:item_id", isAuth, Role("admin"), ItemsController.UpdateItemsQuantity);
route.delete("/items/:item_id", isAuth, Role("admin"), ItemsController.SoftDeleteItem);
route.post("/items/add", isAuth, Role("admin"), upload.single("image"), ItemsController.AddItem);
route.put(
  "/items/edit/:item_id",
  isAuth,
  Role("admin"),
  upload.single("image"),
  ItemsController.EditItemDetails,
);

//admin routes
route.get("/admin/history", isAuth, Role("admin"), AdminController.GetAllWithdrawals);
route.get("/admin/summary", isAuth, Role("admin"), AdminController.GetAdminSummary);
route.get("/admin/list_users", isAuth, Role("admin"), UserController.ListAllUsers);

export default route;
