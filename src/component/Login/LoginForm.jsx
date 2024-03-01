import React from "react";
import Logo from "../Images/logo.svg";
import { NavLink } from "react-router-dom";

function LoginForm() {
  return (
    <div className=" bg-slate-100 flex justify-center items-center h-screen ">
      <div className="w-3/12 max-sm:w-full max-md:w-10/12 max-lg:w-8/12 max-xl:w-6/12 max-2xl:5/12 flex flex-col gap-5 py-10 justify-center items-center bg-white">
        <div>
          <h1 className="text-3xl font-semibold">Login</h1>
        </div>
        <div>
          <img src={Logo} alt="" className="w-16 h-16" />
        </div>
        <div className="w-10/12 flex flex-col gap-5">
          <div className="flex flex-col ">
            <span className="text-base font-semibold ">Email</span>
            <input
              type="text"
              className=" border w-full h-10 rounded-md border-gray-500"
              name="email"
            />
          </div>
          <div className="flex flex-col ">
            <span className="text-base font-semibold ">Password</span>
            <input
              type="Password"
              className=" border w-full h-10 rounded-md border-gray-500"
              name="Password"
            />
          </div>
        </div>
        <div>
          <input
            type="submit"
            className=" border rounded-full px-12 py-2 text-white bg-green-500 cursor-pointer hover:scale-105"
            value="Login"
            name="Login"
          />
        </div>
        <div>
          <span>
            i don't have account{" "}
            <NavLink
              to={"/register"}
              className=" cursor-pointer text-green-500"
            >
              sign up
            </NavLink>
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
