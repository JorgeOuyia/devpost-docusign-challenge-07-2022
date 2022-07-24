import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { renderMap } from "../util/arcGIS";
import { firebase } from "../util/firebase";
import SurveyInfoCard from "./SurveyInfoCard";

const SurveyInfo = () => {
  const { id } = useParams();

  const [survey, setSurvey] = React.useState(null);

  const user = useSelector((store) => store.user.user);

  React.useEffect(() => {
    const fetchData = async () => {
      const dbSurvey = await firebase.getSurvey(user.uid, id);

      setSurvey(dbSurvey);
    };

    fetchData();
  }, [id]);

  return (
    <Fragment>
      <div className="d-flex flex-row-reverse">
        <Link className="btn btn-danger btn-lg" to="/surveys">
          Go to my surveys
        </Link>
      </div>

      <div className="mt-4">
        {survey ? (
          <SurveyInfoCard survey={survey} />
        ) : (
          <div className="d-flex justify-content-center">
            <div className="spinner-grow text-success"></div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default SurveyInfo;
