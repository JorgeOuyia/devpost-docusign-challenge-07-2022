import React from "react";
import { map, renderMap } from "../util/arcGIS";
import "./SurveyInfo.css";

const SurveyInfoCard = ({ survey }) => {
  const id = survey.objectId;

  React.useEffect(() => {
    if (map !== null) {
      map.remove();
    }
    renderMap(`mapInfo_${id}`, survey.geometry.y, survey.geometry.x, 5, true);
  }, []);

  return (
    <div>
      <div className="card shadow-card">
        <div className="card-body">
          <h2 className="card-title">{survey.attributes.camera_id}</h2>

          <div className="survey-info-card-map mt-4" id={`mapInfo_${id}`}></div>

          <div className="row mt-4">
            <div className="col-lg-3 col-md-3 col-6 mb-2 text-center">
              <label>Project name</label>
              <p className="card-text text-secondary">{survey.attributes.project_name}</p>
            </div>

            <div className="col-lg-3 col-md-3 col-6 mb-2 text-center">
              <label>Made by</label>
              <p className="card-text text-secondary">{survey.attributes.your_name}</p>
            </div>

            <div className="col-lg-3 col-md-3 col-6 mb-2 text-center">
              <label>
                Date and Time of Camera Setup or Pickup
              </label>
              <p className="card-text text-secondary">
                {new Date(
                  survey.attributes.date_and_time_of_camera_setup_o
                ).toLocaleDateString()}
              </p>
            </div>
            <div className="col-lg-3 col-md-3 col-6 mb-2 text-center">
              <label>Procedure</label>
              <p className="card-text text-secondary">{survey.attributes._procedure}</p>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-lg-3 col-md-3 col-6 mb-2 text-center">
              <label>Camera attached to</label>
              <p className="card-text text-secondary">
                {survey.attributes.camera_attached_to ?? "---"}
              </p>
            </div>

            <div className="col-lg-3 col-md-3 col-6 mb-2 text-center">
              <label>Camera height (cm)</label>
              <p className="card-text text-secondary">
                {survey.attributes.camera_height_cm ?? "---"}
              </p>
            </div>

            <div className="col-lg-3 col-md-3 col-6 mb-2 text-center">
              <label>
                Name of the area deployed
              </label>
              <p className="card-text text-secondary">
                {survey.attributes.name_of_the_area_deployed ?? "---"}
              </p>
            </div>

            <div className="col-lg-3 col-md-3 col-6 mb-2 text-center">
              <label>Camera make</label>
              <p className="card-text text-secondary">
                {survey.attributes.camera_make ?? "---"}
              </p>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-lg-3 col-md-3 col-6 mb-2 text-center">
              <label>
                What feature is the camera targeting
              </label>
              <p className="card-text text-secondary">
                {survey.attributes.what_feature_is_the_camera_targ ?? "---"}
              </p>
            </div>
            <div className="col-lg-3 col-md-3 col-6 mb-2 text-center">
              <label>Camera trap test</label>
              <p className="card-text text-secondary">
                <span
                  className={`badge bg-${
                    survey.attributes.camera_trap_test === "Yes"
                      ? "success"
                      : "danger"
                  }`}
                >
                  {survey.attributes.camera_trap_test}
                </span>
              </p>
            </div>
            <div className="col-lg-3 col-md-3 col-6 mb-2 text-center">
              <label>
                Camera working when you left or at pickup
              </label>
              <p className="card-text text-secondary">
                <span
                  className={`badge bg-${
                    survey.attributes.camera_working_when_you_left_or === "Yes"
                      ? "success"
                      : "danger"
                  }`}
                >
                  {survey.attributes.camera_working_when_you_left_or}
                </span>
              </p>
            </div>
            <div className="col-lg-3 col-md-3 col-6 mb-2 text-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyInfoCard;
