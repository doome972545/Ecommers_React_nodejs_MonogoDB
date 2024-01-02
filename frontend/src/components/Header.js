import React, { useState } from "react";
import logo from "../assets/image/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {logoutRedux} from"../redux/userSlice";
import { toast } from "react-hot-toast";


function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const userData = useSelector((state) => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleShowMenu = () => {
        setShowMenu(preve => !preve);
    }
    const handleLogout = () => {
        dispatch(logoutRedux())
        toast("Your are logout")
        setTimeout(() => {
            navigate("/")
        }, 500);
    }
    return (
        <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
            {/* Destop*/}
            <div className="flex items-center h-full justify-between">
                <Link to={"/"}>
                    <div className="h-10">
                        <img src={logo} className="h-full"></img>
                    </div>
                </Link>
                <div className="flex items-center gap-4 md:gap-7 ">
                    <nav className="flex gap-4 md:gap-6 text-base md:text-lg">
                        <Link to={""}>Home</Link>
                        <Link to={"menu"}>Menu</Link>
                        <Link to={"about"}>About</Link>
                        <Link to={"contact"}>Contact</Link>
                    </nav>
                    <div className="text-2xl text-slate-600 relative">
                        <FaCartShopping />
                        <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full p-0 m-0 text-xs text-center">0</div>
                    </div>
                    <div className=" text-slate-600" onClick={handleShowMenu} >
                        <div className="text-2xl cursor-pointer w-8 h-8 rounded-full overflow-hidden flex items-center" >
                            {userData.image ? <img src={userData.image} className="h-full w-full"></img>
                                : <FaRegUserCircle />
                            }
                        </div>
                        {
                            showMenu && (<div className="absolute right-2 bg-white py-2  shadow drop-shadow-md">
                                <Link to={"newproduct"}><p className="whitespace-nowrap cursor-pointer px-2">New Product</p></Link>
                                {
                                    userData.image ? <p className="cursor-pointer text-white bg-red-500 px-2" onClick={handleLogout}>Logout</p> :
                                        <Link to={"login"}><p className="whitespace-nowrap cursor-pointer px-2">Login</p></Link>
                                }
                            </div>
                            )}

                    </div>
                </div>
            </div>
            {/* Mobile*/}
        </header>
    );
}

export default Header;
