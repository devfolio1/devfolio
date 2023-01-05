import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/userAction";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Buynow from "./pages/Buynow";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProtectedRoute from "./Route/ProtectedRoute";
import ForgotPassword from "./components/passwords/ForgotPassword";
import UpdateProfile from "./components/profile/UpdateProfile";
import ResetPassword from "./components/passwords/ResetPassword";
import UpdatePassword from "./components/passwords/UpdatePassword";
import PaymentSuccess from "./PaymentSuccess";
import Dashboard from "./components/admin/Dashboard";
import OrderList from "./components/admin/OrderList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import Herotest from "./pages/Herotest";
import { myOrders } from "./actions/orderAction";

function App() {
  React.useEffect(() => {
    store.dispatch(loadUser());
   
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/password/forgot" component={ForgotPassword} />
        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />
        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <ProtectedRoute path="/BuyNow" component={Buynow} />
        <ProtectedRoute path="/profile" component={Profile} />
        <ProtectedRoute  path="/me/update" component={UpdateProfile} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/paymentsuccess" component={PaymentSuccess} />
        <Route path="/hero" component={Herotest} />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />

<ProtectedRoute
          exact
          path="/admin/orders"
          isAdmin={true}
          component={OrderList}
        />
        <ProtectedRoute
          exact
          path="/admin/order/:id"
          isAdmin={true}
          component={ProcessOrder}
        />
        <ProtectedRoute
          exact
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
        />
        <ProtectedRoute
          exact
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
        />
      </Switch>
    </Router>
  );
}

export default App;
