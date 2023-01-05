import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { logout } from "../../actions/userAction";


const Sidebar = () => {

  const dispatch = useDispatch();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user)
  const Logout = () => {
    dispatch(logout());
  };
  return (
    
      <div class="flex flex-col w-64  h-screen px-4 py-8 bg-white border-r dark:bg-gray-900 dark:border-gray-700">
        <div class="flex flex-col items-center mt-6 -mx-2">
          <h4 class="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">
            {user.name}
          </h4>
        </div>

        <div class="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <div class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
              <Link to="/"></Link>
              <Link to="/admin/dashboard">
                <p>
                  <DashboardIcon /> Dashboard
                </p>
              </Link>
            </div>

            <div class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
              <Link to="/admin/orders">
                <p>
                  <ListAltIcon />
                  Orders
                </p>
              </Link>
            </div>

            <div class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
              <Link to="/admin/users">
                <p>
                  <PeopleIcon /> Users
                </p>
              </Link>
            </div>

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
      
  );
};

export default Sidebar;
