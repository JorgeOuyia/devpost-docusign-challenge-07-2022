import React from "react";
import "./SurveyCard.css";
import { renderMap } from "../util/arcGIS";
import { Link } from "react-router-dom";
import { Button, Popover, Tooltip } from "bootstrap";
import { OverlayTrigger } from "react-bootstrap";

const SurveyCard = ({
  id,
  latitude,
  longitude,
  title,
  procedure,
  date,
  trapTest,
  working,
  globalId,
  attachments,
}) => {
  React.useEffect(() => {
    renderMap(`map_${id}`, latitude, longitude, 8, attachments);
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
            <div className="d-flex flex-row gap-2">
              <Link to={`/newSurvey?globalid=${globalId}&mode=copy`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="30px"
                  height="30px"
                >
                  <path
                    d="M384 96L384 0h-112c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48H464c26.51 0 48-21.49 48-48V128h-95.1C398.4 128 384 113.6 384 96zM416 0v96h96L416 0zM192 352V128h-144c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h192c26.51 0 48-21.49 48-48L288 416h-32C220.7 416 192 387.3 192 352z"
                    fill="#03473d"
                  />
                </svg>
              </Link>

              <Link to={`/newSurvey?globalid=${globalId}&mode=edit`}>
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
              <Link to={`/newSurvey?globalid=${globalId}&mode=view`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  width="30px"
                  height="30px"
                >
                  <path
                    d="M256 0v128h128L256 0zM224 128L224 0H48C21.49 0 0 21.49 0 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48V160h-127.1C238.3 160 224 145.7 224 128zM272 416h-160C103.2 416 96 408.8 96 400C96 391.2 103.2 384 112 384h160c8.836 0 16 7.162 16 16C288 408.8 280.8 416 272 416zM272 352h-160C103.2 352 96 344.8 96 336C96 327.2 103.2 320 112 320h160c8.836 0 16 7.162 16 16C288 344.8 280.8 352 272 352zM288 272C288 280.8 280.8 288 272 288h-160C103.2 288 96 280.8 96 272C96 263.2 103.2 256 112 256h160C280.8 256 288 263.2 288 272z"
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
                <strong>{date.toLocaleString()}</strong>
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
