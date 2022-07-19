import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const Surveys = () => {
  return (
    <Fragment>
      <div className="d-flex justify-content-between">
        <h2 className="mt-1">My surveys</h2>

        <Link to='/newsurvey' className="btn btn-success btn-lg">
          New survey
        </Link>
      </div>
    </Fragment>
  );
};

export default Surveys;
