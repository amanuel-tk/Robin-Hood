import React, { useState } from "react";
import Logo from "../Images/logo.svg";
import { NavLink, useNavigate,useLocation } from "react-router-dom";
import { useAuth } from "../../pages/Auth";

function LoginForm() {
  const auth=useAuth()
  const location=useLocation()

  const redirectPath=location.state?.path||'/'
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        auth.login(data.token)
        localStorage.setItem("token", data.token); // Store the token in local storage
        // Redirect to homepage or any other route after successful login
        navigate(redirectPath,{replace:true}); 
      } else {
        // Handle error response
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className=" bg-slate-100 flex justify-center items-center h-[89vh] ">
      <div className="w-3/12 max-sm:w-full max-md:w-10/12 max-lg:w-8/12 max-xl:w-6/12 max-2xl:5/12 flex flex-col gap-5 py-10 justify-center items-center bg-white">
        <form onSubmit={handleSubmit}>
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
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col ">
              <span className="text-base font-semibold ">Password</span>
              <input
                type="password"
                className=" border w-full h-10 rounded-md border-gray-500"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className=" border rounded-full px-12 py-2 text-white bg-green-500 cursor-pointer hover:scale-105"
              name="Login"
            >
              Login
            </button>
          </div>
          <div>
            <span>
              I don't have an account{" "}
              <NavLink to={"/register"} className="cursor-pointer text-green-500">
                Sign up
              </NavLink>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
