import React, { useState } from "react";
import Logo from "../Images/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";

function SignUpForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        // Store the token in state
        // Optionally, you can store the token in local storage here
        localStorage.setItem("token", data.token);
        // Handle successful registration, redirect, etc.
        navigate("/");
      } else {
        const errorData = await response.json(); // Parse error response
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className=" bg-slate-100 flex justify-center items-center h-screen ">
      <div className="w-3/12 max-sm:w-full max-md:w-10/12 max-lg:w-8/12 max-xl:w-6/12 max-2xl:5/12  flex flex-col gap-5 py-10 justify-center items-center bg-white">
        <form onSubmit={handleSubmit}>
          <div>
            <h1 className="text-3xl font-semibold">Sign Up</h1>
          </div>
          <div>
            <img src={Logo} alt="" className="w-16 h-16" />
          </div>
          <div className="w-10/12 flex flex-col gap-5">
            <div className="flex flex-col ">
              <span className="text-base font-semibold ">Name</span>
              <input
                type="text"
                className=" border w-full h-10 rounded-md border-gray-500 p-2"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col ">
              <span className="text-base font-semibold ">Email</span>
              <input
                type="email"
                className=" border w-full h-10 rounded-md border-gray-500 p-2"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col ">
              <span className="text-base font-semibold ">Password</span>
              <input
                type="password"
                className=" border w-full h-10 rounded-md border-gray-500 p-2"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <input
              type="submit"
              className=" border rounded-full px-12 py-2 text-white bg-green-500 cursor-pointer hover:scale-105"
              value="SignUp"
              name="signUp"
            />
          </div>
        </form>
        <div>
          <span>
            I have an account{" "}
            <NavLink to={"/login"} className=" cursor-pointer text-green-500">
              Login
            </NavLink>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
