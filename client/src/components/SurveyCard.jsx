import React from "react";
import "./SurveyCard.css";
import { renderMap } from "../util/arcGIS";
import { Link } from "react-router-dom";

const SurveyCard = ({
  id,
  latitude,
  longitude,
  title,
  procedure,
  date,
  trapTest,
  working,
  surveyId,
}) => {
  React.useEffect(() => {
    renderMap(`map_${id}`, latitude, longitude, 8);
  }, [id, latitude, longitude]);

  return (
    <div className="w-100 h-100 card shadow-card-hoverable">
      <div className="survey-card">
        <div id={`map_${id}`} className="survey-card-map"></div>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div>
              <h4 className="card-title">{title}</h4>
            </div>
            <div>
              <Link to={`/surveyInfo/${surveyId}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="30px"
                  height="30px"
                >
                  <path
                    d="M421.7 220.3L188.5 453.4L154.6 419.5L158.1 416H112C103.2 416 96 408.8 96 400V353.9L92.51 357.4C87.78 362.2 84.31 368 82.42 374.4L59.44 452.6L137.6 429.6C143.1 427.7 149.8 424.2 154.6 419.5L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3zM492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75z"
                    fill="#03473d"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <label className="text-secondary">Date and Time</label>
              <p className="card-title">
                <strong>{`${date.getDate()}/${
                  date.getMonth() + 1
                }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}</strong>
              </p>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <label className="text-secondary">Procedure</label>
              <p className="card-text">
                <strong>{procedure}</strong>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label className="text-secondary">Camera trap test</label>
              <p className="card-text">
                {trapTest ? (
                  <span className="badge bg-success">Yes</span>
                ) : (
                  <span className="badge bg-danger">No</span>
                )}
              </p>
            </div>
            <div className="col-6">
              <label className="text-secondary">Camera working</label>
              <p className="card-text">
                {working ? (
                  <span className="badge bg-success">Yes</span>
                ) : (
                  <span className="badge bg-danger">No</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyCard;
