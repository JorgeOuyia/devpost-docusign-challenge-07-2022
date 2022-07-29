import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import CameraDataCard from "./CameraDataCard";

const CameraData = () => {
  return (
    <Fragment>
      <div className="d-flex justify-content-between mb-5">
        <h2>Camera data</h2>

        <Link to='/cameradataform' className="btn btn-success btn-lg">
          New camera data form
        </Link>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-12 mb-3">
          <CameraDataCard />
        </div>
      </div>
    </Fragment>
  );
};

export default CameraData;
