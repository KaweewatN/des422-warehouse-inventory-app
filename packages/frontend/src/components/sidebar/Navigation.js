import {LuLogOut} from "react-icons/lu";
import {IoHome, IoDocumentText, IoBag} from "react-icons/io5";
import {FaUser} from "react-icons/fa6";
import {IoIosSettings} from "react-icons/io";
import {RiAdminFill} from "react-icons/ri";
import {FaUserFriends} from "react-icons/fa";
import {BiCategory} from "react-icons/bi";

export const userPage = {
  currentPage: "/",
  navigation: [
    {path: "/", label: "Home", icon: <IoHome />},
    {path: "/history", label: "History", icon: <IoDocumentText />},
    {path: "/profile", label: "Profile", icon: <FaUser />},
    {path: "/settings", label: "Settings", icon: <IoIosSettings />},
    {path: "/auth", label: "Logout", icon: <LuLogOut />},
  ],
};

export const adminPage = {
  currentPage: "/admin/dashboard",
  navigation: [
    {path: "/admin/dashboard", label: "Dashboard", icon: <IoHome />},
    {path: "/admin/withdraw-history", label: "Withdraw History", icon: <IoDocumentText />},
    {path: "/admin/items", label: "Items", icon: <IoBag />},
    {path: "/admin/item-types", label: "Item types", icon: <BiCategory />},
    {path: "/admin/users", label: "Users", icon: <FaUserFriends />},
    {path: "/profile", label: "Profile", icon: <RiAdminFill />},
    {path: "/settings", label: "Settings", icon: <IoIosSettings />},
    {path: "/auth", label: "Logout", icon: <LuLogOut />},
  ],
};
