import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "./Layouts/Loading";
import { clearErrors, login, register } from "../actions/userAction";
import logo from "../images/logo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = ({ location }) => {
  const dispatch = useDispatch();

  

  let history = useHistory();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (error) {
      
      console.log(error.type)
      toast(error);
      dispatch(clearErrors());
      // alert(error.message);
      
    }

    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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

            <form class="mt-6" onSubmit={loginSubmit}>
              <div>
                <label for="username" class="block text-sm text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  class="block w-full px-4 py-2 mt-2  bg-white border rounded-lg   dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                  required
                  value={loginPassword}
                  autoComplete="true"
                  onChange={(e) => setLoginPassword(e.target.value)}
                  class="block w-full px-4 py-2 mt-2  bg-white border rounded-lg   dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              {/* <a href="#" class="block text-sm text-blue-400 hover:underline mt-2">
            Forget Password?
          </a> */}
              <Link
                to="/password/forgot"
                class="block text-sm text-blue-400 hover:underline mt-2"
              >
                Forget Password ?
              </Link>

              <div class="mt-6">
                <button
                  type="submit"
                  value="Login"
                  class="w-full px-6 bg-gray-200 py-2.5 text-sm font-medium tracking-wide text-gray-600 capitalize transition-colors duration-300 transform  rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                >
                  Log In
                </button>
              </div>
            </form>

            <p class="mt-8 text-xs font-light text-center text-gray-400">
              {" "}
              Don't have an account?{" "}
              <Link to="/signup">
                <p class="font-medium text-blue-400  hover:underline">
                  Sign up
                </p>
              </Link>
            </p>
          </div>
        </>
      )}
    </>
  );
};
export default Login;
