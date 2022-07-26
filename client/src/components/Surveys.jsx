import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { firebase } from "../util/firebase";
import SurveyCard from "./SurveyCard";
import { TOKEN_API } from "../util/arcGIS";

const Surveys = () => {
  const user = useSelector((store) => store.user.user);
  const [surveyList, setSurveyList] = React.useState([]);
  const [loading, setLoading] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const surveys = await firebase.getSurveyList(user.uid);
      setSurveyList([...surveys]);
      setLoading(false);
    };

    fetchData();
  }, [user]);

  return (
    <div>
      <div className="d-flex justify-content-between mb-5">
        <h2 className="mt-1">My surveys</h2>

        <Link to="/newsurvey" className="btn btn-success btn-lg">
          New survey
        </Link>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-success"></div>
        </div>
      ) : (
        <div className="row">
          {surveyList.length <= 0 ? (
            <div className="d-flex justify-content-center">
              <p className="text-danger">There is no surveys yet</p>
            </div>
          ) : (
            surveyList.map((element, index) => (
              <div
                className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-4"
                key={index}
              >
                <SurveyCard
                  id={index}
                  latitude={element.geometry.y}
                  longitude={element.geometry.x}
                  title={element.attributes.camera_id}
                  procedure={element.attributes._procedure}
                  date={
                    new Date(element.attributes.date_and_time_of_camera_setup_o)
                  }
                  trapTest={element.attributes.camera_trap_test === "Yes"}
                  working={
                    element.attributes.camera_working_when_you_left_or === "Yes"
                  }
                  globalId={element.attributes.globalid
                    .replace("{", "")
                    .replace("}", "")}
                  attachments={element.attachments}
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Surveys;
