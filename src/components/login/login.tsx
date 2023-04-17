import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { VscLoading } from "react-icons/vsc";
import Image from "next/image";
import { AppDispatch, RootState } from "@/store/store";
import { loginAction, setErrorAction } from "@/slices/userSlice";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
function Login() {
  const router = useRouter(); 
  const dispatch = useDispatch<AppDispatch>();
  const {user, status, error, errorStatus} = useSelector((state: RootState) => state.user)
  const notifyError = (message: string | null) =>
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  const [passportPassword, setPassportPassword] = useState({
    passport: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);;
  useEffect(() => {
    user && router.push('/');
  }, [user]);
  useEffect(() => {
    errorStatus && notifyError(error);
  },[errorStatus])
  const Login = () => {
    dispatch(
      loginAction({
        passport: passportPassword.passport,
        password: passportPassword.password,
      })
    );
  }
  return (
    <div style={{backgroundImage: 'url("images/bg.jpg")',  backgroundSize: 'cover', backgroundPosition: 'center' }}
      className={`${
        user?.access && "hidden"
      } fixed top-0 left-0 w-screen h-screen bg-center bg-cover flex justify-center items-center overflow-hidden`}
    >
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className=" md:h-5/6 md:w-4/6 lg:h-4/6 2xl:h-3/6 2xl:w-3/6 bg-white border border-grey-border rounded-lg shadow-md">
        <div className="flex justify-center h-full">
          <div
            className="hidden bg-cover bg-center lg:block lg:w-2/3 rounded-l-lg"
            style={{ backgroundImage: 'url("images/univer.jpeg")', backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-4xl font-bold text-white">TSUE DAVOMAT</h2>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6 overflow-y-scroll no-scroll">
            <div className="flex-1">
              <div className="text-center">
                <Image
                  className="w-[350px] mx-auto py-[15px]"
                  src="/images/tsue_logo.png"
                  width={350}
                  height={350}
                  alt="tsue logo"
                />
              </div>

              <div className="my-[25px]">
                <form onClick={(e) => e.preventDefault()}>
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm text-black"
                    >
                      Username
                    </label>
                    <div className="relative">
                      <input
                            onChange={(e) => {
                            dispatch(setErrorAction(false));
                            setPassportPassword({
                                ...passportPassword,
                                passport: e.target.value,
                            });
                            }}
                            type="text"
                            name="username"
                            placeholder="Username"
                            className={`${
                              error ? "border-red-500" : "border-grey-border"
                            } block w-full pl-[25px] py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                          />
                      <div className="absolute top-0 h-full flex items-center ml-[5px]">
                        <FaUserCircle className="text-blue-dark" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label htmlFor="password" className="text-sm text-black">
                        Password
                      </label>
                    </div>

                    <div className="relative">
                      <input
                            onChange={(e) => {
                                dispatch(setErrorAction(false));
                                setPassportPassword({
                                ...passportPassword,
                                password: e.target.value,
                                });
                            }}
                            type={`${showPassword ? "text" : "password"}`}
                            name="password"
                            id="password"
                            placeholder="Parol"
                            className={`${
                              error ? "border-red-500" : "border-grey-border"
                            } block w-full px-[25px] py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                          />
                      <div className="absolute top-0 h-full flex items-center ml-[5px]">
                        <RiLockPasswordFill className="text-blue-dark" />
                      </div>
                      <div className="absolute top-0 right-0 h-full flex items-center mr-[5px]">
                        {showPassword ? (
                          <IoMdEyeOff
                            onClick={() => setShowPassword(false)}
                            className="text-blue-dark text-[20px] cursor-pointer"
                          />
                          ) : (
                          <IoMdEye
                            onClick={() => setShowPassword(true)}
                            className="text-blue-dark text-[20px] cursor-pointer"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="my-6">
                    <button
                      onClick={Login}
                      className="w-full flex items-center justify-center px-4 py-2 tracking-wide transition-colors duration-200 transform bg-blue-dark rounded-md text-white bg-blue-500 border border-blue-500 hover:text-white hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    >
                      Kirish
                      <VscLoading
                        className={`${
                          status!=="loading" && "hidden"
                        } animate-spin ml-[10px]`}
                      />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login