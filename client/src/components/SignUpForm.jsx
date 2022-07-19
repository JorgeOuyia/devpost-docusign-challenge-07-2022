import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./Notification";
import { addNotification, NotificationType } from "../util/notification";
import { registerAction } from "../redux/userDuck";

const SignUpForm = () => {
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [repeatEmail, setRepeatEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [notificationList, setNotificationList] = React.useState([]);

  const dispatch = useDispatch();

  const loading = useSelector((store) => store.user.loading);

  const signUp = (e) => {
    e.preventDefault();

    let success = true;
    const localNotificationList = [];

    if (!name.trim()) {
      success = false;
      addNotification(
        localNotificationList,
        "Name is mandatory",
        NotificationType.Error
      );
    }

    if (!surname.trim()) {
      success = false;
      addNotification(
        localNotificationList,
        "Surname is mandatory",
        NotificationType.Error
      );
    }

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

    if (!password.trim()) {
      success = false;
      addNotification(
        localNotificationList,
        "Password is mandatory",
        NotificationType.Error
      );
    }

    if (!repeatPassword.trim()) {
      success = false;
      addNotification(
        localNotificationList,
        "Repeat password is mandatory",
        NotificationType.Error
      );
    }

    if (success) {

      if (email !== repeatEmail) {
        success = false;
        addNotification(localNotificationList, 'Emails do not match', NotificationType.Error);
      }

      if (password !== repeatPassword) {
        success = false;
        addNotification(localNotificationList, 'Passwords do not match', NotificationType.Error);
      }

      if (success) {
        dispatch(registerAction(name, surname, email, password, localNotificationList, setNotificationList));
      }

    }

    setNotificationList([...localNotificationList]);
  };

  return (
    <form onSubmit={(e) => signUp(e)}>
      <h3 className="mb-4">Create a new account</h3>

      <Notification notificationList={notificationList} />

      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>
              Name <span className="text-danger">*</span>
            </label>
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <label>
              Surname <span className="text-danger">*</span>
            </label>
          </div>
        </div>
      </div>

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

      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>
          Password <span className="text-danger">*</span>
        </label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <label>
          Repeat password <span className="text-danger">*</span>
        </label>
      </div>

      <div className="w-100 mb-4">
        <button
          type="submit"
          className="btn btn-success btn-lg w-100"
          disabled={loading}
        >
          {loading ? <div className="spinner-border"></div> : "Sign up"}
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
