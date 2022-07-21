import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./NewSurvey.css";
import { uuidv4 } from "@firebase/util";
import { firebase } from "../util/firebase";
import { WebMap } from "@esri/react-arcgis";

const NewSurvey = () => {
  const user = useSelector((store) => store.user.user);
  const navigate = useNavigate();

  React.useEffect(() => {
    const now = new Date();
    const webForm = new window.Survey123WebForm({
      clientId: "rtHacRn1FUxcB7II",
      container: "surveyForm",
      itemId: "cfea65c0165d4b0ba1a58770fc28b25d",
      questionValue: {
        project_name: "ArcValetSign",
        your_name: `${user.name} ${user.surname}`,
        camera_id: `${uuidv4().substring(0, 8)}_${now.getDate()}_${
          now.getMonth() + 1
        }_${now.getFullYear()}`,
        date_and_time_of_camera_setup_o: now,
      },
      onFormSubmitted: async (e) => {
        if (e.surveyFeatureSet) {
          const survey = e.surveyFeatureSet;
          const answers = survey.features[0];
          await firebase.createSurvey(answers, user.uid);
          navigate('/surveys');
        }
      },
    });
  }, [navigate, user.name, user.surname, user.uid]);

  return (
    <Fragment>
      <div className="d-flex justify-content-between">
        <h2>New survey</h2>
        <Link to="/surveys" className="btn btn-danger btn-lg mb-4">
          Go back
        </Link>
      </div>

      <section className="survey-form" id="surveyForm"></section>
    </Fragment>
  );
};

export default NewSurvey;
