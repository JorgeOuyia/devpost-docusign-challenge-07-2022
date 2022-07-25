import React from "react";
import { getAccessToken, map, renderMap } from "../util/arcGIS";
import Loading from "./Loading";
import "./SurveyInfo.css";

const SurveyInfoCard = ({ survey, accessToken }) => {
  const id = survey.objectId;

  const date = new Date(survey.attributes.date_and_time_of_camera_setup_o);

  React.useEffect(() => {
    const fetchData = async () => {
      if (map !== null) {
        map.remove();
      }
      renderMap(`mapInfo_${id}`, survey.geometry.y, survey.geometry.x, 5, true);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="card-title">{survey.attributes.camera_id}</h2>
      <div className="accordion" id="acordionSurvey">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingCollapseMap">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseMap"
              aria-expanded="true"
              aria-controls="collapseMap"
            >
              Map
            </button>
          </h2>
          <div
            className="accordion-collapse collapse show"
            id="collapseMap"
            aria-labelledby="headingCollapseMap"
            data-bs-parent="#accordionSurvey"
          >
            <div className="accordion-body">
              <div
                className="survey-info-card-map mt-4"
                id={`mapInfo_${id}`}
              ></div>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingCollapseData">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseData"
              aria-expanded="false"
              aria-controls="collapseData"
            >
              General information
            </button>
          </h2>
          <div
            className="accordion-collapse collapse"
            id="collapseData"
            aria-labelledby="headingCollapseData"
            data-bs-parent="#accordionSurvey"
          >
            <div className="accordion-body">
              <div className="row mt-4">
                <div className="col-lg-3 col-md-3 col-6 mb-2 text-center">
                  <label>Project name</label>
                  <p className="card-text text-secondary">
                    {survey.attributes.project_name}
                  </p>
                </div>

                <div className="col-lg-3 col-md-3 col-6 mb-2 text-center">
                  <label>Made by</label>
                  <p className="card-text text-secondary">
                    {survey.attributes.your_name}
                  </p>
                </div>

                <div className="col-lg-3 col-md-3 col-6 mb-2 text-center">
                  <label>Date and Time of Camera Setup or Pickup</label>
                  <p className="card-text text-secondary">
                    {
                        `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
                    }
                  </p>
                </div>
                <div className="col-lg-3 col-md-3 col-6 mb-2 text-center">
                  <label>Procedure</label>
                  <p className="card-text text-secondary">
                    {survey.attributes._procedure}
                  </p>
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
                  <label>Name of the area deployed</label>
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
                  <label>What feature is the camera targeting</label>
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
                  <label>Camera working when you left or at pickup</label>
                  <p className="card-text text-secondary">
                    <span
                      className={`badge bg-${
                        survey.attributes.camera_working_when_you_left_or ===
                        "Yes"
                          ? "success"
                          : "danger"
                      }`}
                    >
                      {survey.attributes.camera_working_when_you_left_or}
                    </span>
                  </p>
                </div>
                <div className="col-lg-3 col-md-3 col-6 mb-2 text-center">
                  <label>Comments</label>
                  <p className="card-text text-secondary">
                    {survey.attributes.comments ?? "---"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {survey.attachments.length > 0 ? (
        accessToken ? (
          <div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingCollapsePhotos">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsePhotos"
                  aria-expanded="false"
                  aria-controls="collapsePhotos"
                >
                  Photos of the site
                </button>
              </h2>
              <div
                className="accordion-collapse collapse"
                id="collapsePhotos"
                aria-labelledby="headingCollapsePhotos"
                data-bs-parent="#accordionSurvey"
              >
                <div className="accordion-body">
                  <div
                    id="carouselSitePhotos"
                    className="carousel slide"
                    data-bs-ride="carousel"
                    data-bs-interval="false"
                  >
                    <div className="carousel-inner">
                      {survey.attachments.map((element, index) => (
                        <div
                          key={index}
                          className={`carousel-item ${
                            index === 0 ? "active" : ""
                          }`}
                        >
                          <img
                            src={`${element.objectUrl.replace(
                              "_fieldworker",
                              ""
                            )}?token=${accessToken}`}
                            className="d-block w-100"
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselSitePhotos"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                    </button>
                    <button
                      class="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselSitePhotos"
                      data-bs-slide="next"
                    >
                      <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )
      ) : null}
    </div>
  );
};

export default SurveyInfoCard;
