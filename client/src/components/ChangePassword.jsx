import React from "react";
import Notification from "./Notification";
import { useDispatch, useSelector } from "react-redux";
import { addNotification, NotificationType } from "../util/notification";
import { changePasswordAction } from "../redux/userDuck";

const ChangePassword = () => {
  const [email, setEmail] = React.useState("");
  const [repeatEmail, setRepeatEmail] = React.useState("");
  const [notificationList, setNotificationList] = React.useState([]);

  const dispatch = useDispatch();

  const loading = useSelector((store) => store.user.loading);

  const changePassword = (e) => {
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

    if (!repeatEmail.trim()) {
      success = false;
      addNotification(
        localNotificationList,
        "Repeat email is mandatory",
        NotificationType.Error
      );
    }

    if (success) {
      if (email !== repeatEmail) {
        success = false;
        addNotification(
          localNotificationList,
          "Emails do not match",
          NotificationType.Error
        );
      }

      if (success) {
        dispatch(changePasswordAction(email, localNotificationList, setNotificationList));
      }
    }

    setNotificationList([...localNotificationList]);
  };

  return (
    <form onSubmit={e => changePassword(e)}>
      <h3 className="mb-4">Change password</h3>

      <Notification notificationList={notificationList} />

      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>
          Email address <span className="text-danger">*</span>
        </label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          value={repeatEmail}
          onChange={(e) => setRepeatEmail(e.target.value)}
        />
        <label>
          Repeat email address <span className="text-danger">*</span>
        </label>
      </div>

      <button
        type="submit"
        className="btn btn-secondary btn-lg w-100 mb-4"
        disabled={loading}
      >
        {loading ? <div className="spinner-border"></div> : "Send email"}
      </button>
    </form>
  );
};

export default ChangePassword;
