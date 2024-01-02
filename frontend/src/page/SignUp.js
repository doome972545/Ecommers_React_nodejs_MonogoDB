import React, { useState } from "react";
import LoginAnimation from "../assets/image/login-animation.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ImagetoBase64 } from "../utility/imagetoBase64";
import { toast } from 'react-hot-toast';
const SignUp = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConsfirmPassword] = useState(false);
    const [data, setData] = useState({
        firstName: "",
        lastName: " ",
        email: "",
        password: "",
        confirmPassword: "",
        image:""
    });
    const handleShowPassword = () => {
        setShowPassword((preve) => !preve);
    };
    const handleShowConfirmPassword = () => {
        setShowConsfirmPassword((preve) => !preve);
    };
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((preve) => {
            return {
                ...preve,
                [name]: value,
            };
        });
    };

    const handleUploadProfileImage = async (e) => {
        const data = await ImagetoBase64(e.target.files[0]);
        setData((preve) => {
            return{
                ...preve,
                image: data
            }
        })
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { firstName, lastName, email, password, confirmPassword } = data;
        if (firstName && lastName && email && password) {
            if (password === confirmPassword) {
                const fetchdata = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`,{
                    method : 'POST',
                    headers : {
                        "content-type" : "application/json"
                    },
                    body : JSON.stringify(data)
                })
                const dataRes = await fetchdata.json()
                // console.log(dataRes)
                // alert(dataRes.message)
                toast(dataRes.message)
                if(dataRes.alert) {
                    navigate('/login')
                }
            } else {
                toast("password and confirm password do not match")
            }
        } else {
            toast('Please fill in complete information.')
        }
    };
    return (
        <div className="p-3 md:p-4">
            <div className="w-full max-w-sm bg-white m-auto flex  p-4 flex-col">
                {/* <h1 className='text-center text-2xl font-bold'>Sign Up</h1> */}
                <div className="h-20 w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
                    <img src={data.image ? data.image: LoginAnimation} className="w-full h-full"></img>
                    <label htmlFor="profileImage">
                        <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
                            <p className="text-sm p-1 text-white">Upload</p>
                        </div>
                        <input type={"file"} id="profileImage" accept="image/*" className="hidden" onChange={handleUploadProfileImage}></input>
                    </label>
                </div>
                <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type={"text"}
                        id="firstName"
                        name="firstName"
                        className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                        value={data.firstName}
                        onChange={handleOnChange}
                    />

                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type={"text"}
                        id="lastName"
                        name="lastName"
                        className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                        value={data.lastName}
                        onChange={handleOnChange}
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type={"email"}
                        id="email"
                        name="email"
                        className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                        value={data.email}
                        onChange={handleOnChange}
                    />

                    <label htmlFor="password">Password</label>
                    <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            className=" w-full bg-slate-200 border-none outline-none "
                            value={data.password}
                            onChange={handleOnChange}
                        />
                        <span
                            className="flex text-xl cursor-pointer"
                            onClick={handleShowPassword}
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>

                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2  focus-within:outline focus-within:outline-blue-300">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmpassword"
                            name="confirmPassword"
                            className=" w-full bg-slate-200 border-none outline-none "
                            value={data.confirmPassword}
                            onChange={handleOnChange}
                        />
                        <span
                            className="flex text-xl cursor-pointer"
                            onClick={handleShowConfirmPassword}
                        >
                            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>

                    <button type="submit" className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
                        Sign up
                    </button>
                </form>
                <p className="text-left text-base mt-2">
                    Aleady have account ?
                    <Link to={'/login'} className="text-red-500 hover:text-red-600 underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
