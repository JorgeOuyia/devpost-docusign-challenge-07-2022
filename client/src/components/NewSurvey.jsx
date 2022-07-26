import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./NewSurvey.css";
import { firebase } from "../util/firebase";
import { getAccessToken } from "../util/arcGIS";

const NewSurvey = () => {
  const user = useSelector((store) => store.user.user);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const globalId = params.get("globalid");
  const mode = params.get("mode");

  React.useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getAccessToken();

      const now = new Date();
      new window.Survey123WebForm({
        clientId: "DPVovAjI8lNZTiBO",
        container: "surveyForm",
        itemId: "47fe7da5044f42739d64105fa5d6d873",
        globalId: globalId,
        mode: mode,
        questionValue: !globalId
          ? {
              project_name: "ArcValetSign",
              your_name: `${user.name} ${user.surname}`,
              date_and_time_of_camera_setup_o: now,
            }
          : null,
        onFormSubmitted: async (e) => {
          if (e.surveyFeatureSet) {
            const survey = e.surveyFeatureSet;
            const answers = survey.features[0];
            await firebase.saveSurvey(answers, user.uid);
            navigate("/surveys");
          }
        },
      });
    };

    fetchData();
  }, [navigate, user.name, user.surname, user.uid]);

  return (
    <Fragment>
      <div className="d-flex justify-content-between">
        <h2>
          {!mode || mode === "new"
            ? "New survey"
            : mode === "edit"
            ? "Edit survey"
            : "View survey"}
        </h2>
        <Link to="/surveys" className="btn btn-danger btn-lg mb-4">
          Go back
        </Link>
      </div>

      <section className="survey-form" id="surveyForm"></section>
    </Fragment>
  );
};

export default NewSurvey;
