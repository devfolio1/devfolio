import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../images/logo.png";
import Box from "@mui/material/Box";
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';
import { Link } from "react-router-dom";
import { logout } from "../actions/userAction";
import { myOrders } from "../actions/orderAction";

const Profile = ({ history }) => {
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, error, orders } = useSelector((state) => state.myOrders);

  const [nav, setNav] = useState(0);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      //   flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "services",
      headerName: "Mentioned Services",
      type: "string",
      minWidth: 250,
      flex: 0.3,
    },

    {
      field: "projects",
      headerName: "Mentioned Projects",
      type: "string",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "paidat",
      flex: 0.3,
      headerName: "Paid-At",
      minWidth: 150,
      type: "date",
      sortable: false,
     
    },
  ];

  const pcolumns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "paymentid",
      headerName: "Payment Id",
      minWidth: 150,
      //   flex: 0.5,
      
    },
    {
      field: "amountpaid",
      headerName: "Amount Paid",
      type: "string",
      minWidth: 250,
      flex: 0.3,
    },

    {
      field: "portfolioname",
      headerName: "Portfolio Name",
      type: "string",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "paidat",
      flex: 0.3,
      headerName: "Paid-At",
      minWidth: 150,
      type: "date",
      sortable: false,
     
    },
  ];

  const rows = [];

  const prows = []

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        services: item.services,
        projects: item.projects,
        paidat: item.paidAt,
      });
    });

    orders &&
    orders.forEach((item, index) => {
      prows.push({
        id: item._id,
        status: item.orderStatus,
        services: item.services,
        projects: item.projects,
        paidat: item.paidAt,
      });
    });

  useEffect(() => {
    dispatch(myOrders());
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  const Logout = () => {
    dispatch(logout());
  };
  return (
    <>
      {/* <Navbar /> */}
      <div className="container flex justify-between">
        <div class="flex flex-col w-64  h-screen px-4 py-8 bg-white border-r dark:bg-gray-900 dark:border-gray-700">
        <a href="/" className="text-gray-200 mb-6 font-bold transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"><ArrowBackIosNewTwoToneIcon/> Back to Home</a>
          {/* <div class="flex flex-col items-center mt-6 -mx-2">
           
          </div> */}

          <div class="flex flex-col justify-between flex-1 mt-6">
            <nav>
            <h4 class="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200 text-center">
              {user.name}'s
            </h4>
              <a
                class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                href="#"
              >
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <button
                  class="mx-4 font-medium"
                  onClick={() => {
                    setNav(0);
                  }}
                >
                  My Details
                </button>
              </a>

              <a
                class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                href="#"
              >
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <button
                  class="mx-4 font-medium"
                  onClick={() => {
                    setNav(1);
                  }}
                >
                  Order Details
                </button>
              </a>

              <a
                class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                href="#"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-dollar-sign"
                >
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                <button
                  class="mx-2 font-medium"
                  onClick={() => {
                    setNav(2);
                  }}
                >
                  Payment Details
                </button>
              </a>

              <a
                class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                href="#"
              >
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <button class="mx-4 font-medium" onClick={Logout}>
                  Logout
                </button>
              </a>
            </nav>
          </div>
        </div>
        <div className="right-container mx-auto flex  w-full">
          {nav === 0 && (
            <>
              <section class="h-2/3 m-auto p-6 bg-white rounded-md shadow-md ">
                <h1 class="text-3xl font-semibold tracking-wide text-gray-800  lg:text-4xl">
                  My Details
                </h1>

                <div className="grid grid-cols-1 mt-10 p-10">
                  <div className="flex gap-4 mx-auto">
                    <label class="text-gray-700 font-bold ">User Name :</label>
                    <p>{user.name}</p>
                  </div>
                  <div className="flex gap-4 mx-auto">
                    <label class="text-gray-700 font-bold ">Email :</label>
                    <p>{user.email}</p>
                  </div>

                  {/* <div class="flex justify-end mt-6">
                    <button
                      type="submit"
                      onClick={() => {
                        // ConfirmPay();
                      }}
                      class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                    >
                      Reset Password?
                    </button>
                  </div> */}
                  <Link
                    to="/password/update"
                    class="block text-sm text-blue-400 hover:underline mt-2"
                  >
                    update Password ?
                  </Link>
                  <Link
                    to="/me/update"
                    class="block text-sm text-blue-400 hover:underline mt-2"
                  >
                    Update Profile ?
                  </Link>
                </div>
              </section>
            </>
          )}
          {nav === 1 && (
            <>
              <section class="h-2/3 w-1/2 m-auto p-6 bg-white rounded-md shadow-md ">
                <h1 class="text-3xl font-semibold tracking-wide text-gray-800 mb-4 lg:text-4xl">
                  Order Details
                </h1>

                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  disableSelectionOnClick
                  className="myOrdersTable"
                  autoHeight
                />
              </section>
            </>
          )}
          {nav === 2 && (<>
            <section class="h-2/3 w-1/2 m-auto p-6 bg-white rounded-md shadow-md ">
                <h1 class="text-3xl font-semibold tracking-wide text-gray-800 mb-4 lg:text-4xl">
                  Payment Details
                </h1>

                <DataGrid
                  rows={prows}
                  columns={pcolumns}
                  pageSize={5}
                  disableSelectionOnClick
                  className="myPaymentsTable"
                  autoHeight
                />
              </section>

          </>)}
        </div>
      </div>
    </>
  );
};

export default Profile;
