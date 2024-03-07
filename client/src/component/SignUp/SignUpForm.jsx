import React, { useState } from "react"; // Importing React library and useState hook
import Logo from "../Images/logo.svg"; // Importing logo image
import { NavLink, useLocation, useNavigate } from "react-router-dom"; // Importing NavLink, useLocation, and useNavigate from react-router-dom
import { useAuth } from "../../pages/Auth"; // Importing useAuth hook from Auth page

function SignUpForm() {
  const navigate = useNavigate(); // Initializing navigate function from react-router-dom
  const [formData, setFormData] = useState({
    // Initializing state for form data
    name: "",
    email: "",
    password: "",
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const auth = useAuth(); // Initializing auth hook from Auth page
  const location = useLocation(); // Initializing location hook from react-router-dom

  // Setting redirect path based on location or defaulting to homepage
  const redirectPath = location.state?.path || "/";

  // Function to handle form submission
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
        auth.login(data.token);
        localStorage.setItem("token", data.token); // Store the token in local storage
        // Redirect to homepage or any other route after successful login
        navigate(redirectPath, { replace: true });
      } else {
        //Handle Error Here
      }
    } catch (error) {
      //Handle Error Here
    }
  };

  return (
    <div className=" bg-slate-100 flex justify-center items-center h-screen ">
      <form
        className="w-3/12 max-sm:w-full max-md:w-10/12 max-lg:w-8/12 max-xl:w-6/12 max-2xl:5/12  flex flex-col gap-5 py-10 justify-center items-center bg-white"
        onSubmit={handleSubmit}
      >
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

        <div>
          <span>
            I have an account{" "}
            <NavLink to={"/login"} className=" cursor-pointer text-green-500">
              Login
            </NavLink>
          </span>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
