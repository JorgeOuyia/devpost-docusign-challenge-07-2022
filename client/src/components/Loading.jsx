import React from "react";

const Loading = ({ type = 'success' }) => {
  return (
    <div className="d-flex justify-content-center">
      <div className={`spinner-grow text-${type}`}></div>
    </div>
  );
};

export default Loading;
