import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { firebase } from "../util/firebase";
import { useSelector } from "react-redux";
import { renderMap, map } from "../util/arcGIS";
import { getBase64 } from "../util/images";

const CameraDataForm = () => {
  const [fileList, setFileList] = React.useState([]);
  const [fileViewList, setFileViewList] = React.useState([]);
  const [cameraIdList, setCameraIdList] = React.useState([]);
  const [cameraId, setCameraId] = React.useState(null);
  const [version, setVersion] = React.useState(null);
  const [versionList, setVersionList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [stakeHolder, setStakeHolder] = React.useState("");
  const [stakeHolderList, setStakeHolderList] = React.useState([]);

  const user = useSelector((store) => store.user.user);

  React.useEffect(() => {
    const fetchData = async () => {
      const surveys = await firebase.getSurveyList(user.uid);
      setCameraIdList([
        ...new Set(surveys.map((element) => element.attributes.camera_id)),
      ]);

      setLoading(false);
    };
    fetchData();
  }, [version]);

  const handleSelectCamera = async (e) => {
    const value = e.target.value;
    setCameraId(value);
    setFileList([]);
    setFileViewList([]);

    if (value !== "") {
      if (map !== null) {
        map.remove();
      }

      const surveyList = await firebase.getSurveyList(user.uid);
      const survey = surveyList.find((t) => t.attributes.camera_id === value);

      if (survey) {
        renderMap(
          "formMap",
          survey.geometry.y,
          survey.geometry.x,
          6,
          survey.attachments,
          true
        );
      }
    }
  };

  const handleUploadFile = async (e) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setFileList([...fileList, ...files]);

      const previewFilesList = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const base64 = await getBase64(file);
        previewFilesList.push(base64);
      }

      setFileViewList([...fileViewList, ...previewFilesList]);
    }

    e.target.value = "";
  };

  const deleteFile = (index) => {
    setFileList([...fileList.filter((t) => t !== fileList[index])]);
    setFileViewList([...fileViewList.filter((t) => t !== fileViewList[index])]);
  };

  return (
    <Fragment>
      <div className="d-flex flex-row justify-content-between">
        <h2>Fill in camera trap data</h2>
        <Link className="btn btn-danger btn-lg" to="/cameradata">
          Go back
        </Link>
      </div>

      <p className="alert alert-success text-center mt-4">
        Here you can upload images captured directly with the cameras. Once the
        data is uploaded and submitted, it is also uploaded to MediaValet and an
        envelope is sent to people indicated with the aim of reviewing the
        images. When data is sent to the corresponding stakeholder, the approval
        process of the images starts. When the images are correctly validated by
        the stakeholders, then they are automatically approved in MediaValet
      </p>

      {!loading ? (
        <>
          <div className="card w-100 mt-4">
            <div className="card-body">
              <div className="d-flex flex-row-reverse mb-3">
                <div style={{ width: "100px" }}>
                  <select className="form-select"></select>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-4 col-md-4 col-12 mb-2">
                  <h4 className="card-title">
                    Select camera <span className="text-danger">*</span>
                  </h4>
                  <select
                    className="form-select"
                    onChange={(e) => handleSelectCamera(e)}
                  >
                    <option selected={!cameraId} value="">
                      Please, select an option
                    </option>
                    {cameraIdList.map((element, index) => (
                      <option key={index} value={element}>
                        {element}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-lg-8 col-md-8 col-12">
                  <h4 className="card-title">
                    Add files <span className="text-danger">*</span>
                  </h4>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => handleUploadFile(e)}
                    accept="image/png, image/gif, image/jpeg"
                    multiple
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-lg-6 col-md-6 col-12">
              <div
                className="card"
                style={{
                  display: !cameraId || cameraId === "" ? "none" : "",
                  height: "450px",
                }}
              >
                <div className="card-body">
                  <h4 className="card-title">Location</h4>
                  <div id="formMap" style={{ height: "370px" }}></div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-12">
              <div
                className="card"
                style={{
                  display:
                    !fileViewList || fileViewList.length === 0 ? "none" : "",
                  maxHeight: "450px",
                  minHeight: "450px",
                  overflowY: "auto",
                }}
              >
                <div className="card-body">
                  <h4 className="card-title">Camera trap images</h4>

                  <div className="row mt-3">
                    {fileViewList.map((element, index) => (
                      <div className="col-lg-4 col-md-4 col-6 mb-3" key={index}>
                        <div className="d-flex flex-column">
                          <div>
                            <img
                              src={element}
                              className="w-100"
                              style={{ maxHeight: "150px", minHeight: "150px" }}
                            />
                          </div>
                          <div className="text-center mt-1">
                            <button
                              type="button"
                              className="btn btn-default btn-sm"
                              onClick={() => deleteFile(index)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                width="25px"
                              >
                                <path
                                  d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z"
                                  fill="red"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {cameraId && fileList && cameraId !== "" && fileList.length > 0 && (
            <div className="card mt-3 w-100">
              <div className="card-body">
                <h4 className="card-title">Stakeholders</h4>
                <div className="row">
                  <div className="col-6">
                    <div className="row">
                      <div className="col-10">
                        <div className="form-floating mb-3">
                          <input type="email" className="form-control" />
                          <label>
                            Email <span className="text-danger">*</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-2">
                        <button type="button" className="btn btn-success mt-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            width="20px"
                          >
                            <path
                              d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"
                              fill="white"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <Loading />
      )}
    </Fragment>
  );
};

export default CameraDataForm;
