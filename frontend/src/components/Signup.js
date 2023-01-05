import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import logo from "../images/logo.png";
import { clearErrors, register } from "../actions/userAction";

const Signup = (location) => {
  const dispatch = useDispatch();

  let history = useHistory();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
    // const [name, setName] = useState("")
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
  

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
  
    dispatch(register(myForm));
  };
  
  

  const registerDataChange = (e) => {
  
      setUser({ ...user, [e.target.name]: e.target.value });
    
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (error) {
      toast(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  return (
    <>
    <ToastContainer />
      <div class="w-1/2 max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md mt-20">
        <div className="logo-cont flex w-full h-48">
          <img
            src={logo}
            alt="devfolio logo"
            className="object-fill h-36 w-40 mx-auto"
          />
        </div>

        <form
          class="mt-6"
          
          onSubmit={registerSubmit}
        >
          <div>
            <label for="username" class="block text-sm text-gray-600">
              Username
            </label>
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={registerDataChange}
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div>
            <label for="username" class="block text-sm text-gray-600 mt-4">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={registerDataChange}
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div class="mt-4">
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm text-gray-800">
                Password
              </label>
            </div>

            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={registerDataChange}
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div class="mt-6">
            <button
              type="submit"
              value="Register"
              class="w-full px-6 bg-gray-200 py-2.5 text-sm font-medium tracking-wide text-gray-600 capitalize transition-colors duration-300 transform  rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            >
              Sign Up
            </button>
          </div>
        
        </form>

        <p class="mt-8 text-xs font-light text-center text-gray-400">
          {" "}
          Already have an account?{" "}
          <Link to="/login">
            <p class="font-medium text-blue-400  hover:underline">Login</p>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Signup;
