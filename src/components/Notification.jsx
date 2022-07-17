import React from "react";

const Notification = ({ notificationList }) => {
  const [notifications, setNotifications] = React.useState([]);

  React.useEffect(() => {
    setNotifications([...notificationList]);
  }, [notificationList]);

  return (
    <div>
      {notifications.map((notification, index) => (
        <div className={`alert alert-${notification.type}`} key={index}>
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default Notification;
