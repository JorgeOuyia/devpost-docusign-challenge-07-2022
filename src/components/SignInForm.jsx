import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../redux/userDuck";
import { NotificationType, addNotification } from "../util/notification";
import Notification from "./Notification";

const SignInForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [notificationList, setNotificationList] = React.useState([]);

  const dispatch = useDispatch();

  const loading = useSelector((store) => store.user.loading);

  console.log(loading);

  const signIn = (e) => {
    e.preventDefault();

    let success = true;
    const localNotificationList = [];

    if (!email.trim()) {
      success = false;
      addNotification(
        localNotificationList,
        "Email is mandatory",
        NotificationType.Error
      );
    }

    if (!password.trim()) {
      success = false;
      addNotification(
        localNotificationList,
        "Password is mandatory",
        NotificationType.Error
      );
    }

    setNotificationList([...localNotificationList]);

    if (success) {
      dispatch(
        loginAction(email, password, localNotificationList, setNotificationList)
      );
    }
  };

  return (
    <form onSubmit={(e) => signIn(e)}>
      <h3 className="mb-4">Sign in</h3>

      <Notification notificationList={notificationList} />

      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>
          Email address <span className="text-danger">*</span>
        </label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>
          Password <span className="text-danger">*</span>
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn-lg w-100 mb-4">
        {loading ? <div className="spinner-border"></div> : "Sign in"}
      </button>
      
    </form>
  );
};

export default SignInForm;
