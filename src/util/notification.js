export const NotificationType = {
  Success: "success",
  Error: "danger",
  Warning: "warning",
  Info: "info",
};

export const addNotification = (notificationList, message, type) => {
  notificationList.push({
    message,
    type,
  });
};
