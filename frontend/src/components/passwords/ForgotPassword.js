import React, { Fragment, useState, useEffect } from "react";

import Loading from "../Layouts/Loading";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { clearErrors, forgotPassword } from "../../actions/userAction";


import MetaData from "../Layouts/MetaData";

const ForgotPassword = () => {
  const dispatch = useDispatch();
   

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
     toast(error)
      dispatch(clearErrors());
    }

    if (message) {
      alert(message);
    }
  }, [dispatch, error, alert, message]);

  return (
    <Fragment>
      {loading ? (
        <Loading/>
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />
          <ToastContainer />
          <div className="forgotPasswordContainer w-1/2 max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md mt-20">
            <div className="forgotPasswordBox grid">
              <h2 className="forgotPasswordHeading mx-auto">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                {/* <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                /> */}

                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div class="mt-6">
                  <button
                    type="submit"
                    value="send"
                    class="w-full px-6 bg-gray-200 py-2.5 text-sm font-medium tracking-wide text-gray-600 capitalize transition-colors duration-300 transform  rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
