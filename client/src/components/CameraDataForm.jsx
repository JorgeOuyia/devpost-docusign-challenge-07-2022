import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { firebase } from "../util/firebase";
import { useDispatch, useSelector } from "react-redux";
import { renderMap, map } from "../util/arcGIS";
import { fileToBase64 } from "../util/files";
import Notification from "./Notification";
import { addNotification, NotificationType } from "../util/notification";
import { newStakeHolder } from "../util/stakeholder";
import { submitArcGISCameraData } from "../redux/arcGISDuck";

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
  const [notificationStakeHolderList, setNotificationStakeHolderList] =
    React.useState([]);

  const user = useSelector((store) => store.user.user);
  const sendingForm = useSelector((store) => store.arcGIS.loading);
  const sendProgress = useSelector((store) => store.arcGIS.progress);

  const dispatch = useDispatch();

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
    setNotificationStakeHolderList([]);
    setStakeHolderList([]);
    setStakeHolder("");

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

        const base64 = await fileToBase64(file);
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

  const addStakeHolder = (e) => {
    e.preventDefault();

    let success = true;

    const notificationList = [];

    if (!stakeHolder.trim()) {
      success = false;
      addNotification(
        notificationList,
        "Email is mandatory",
        NotificationType.Error
      );
    }

    if (success) {
      if (stakeHolderList.find((t) => t.email === stakeHolder.trim())) {
        success = false;
        addNotification(
          notificationList,
          `${stakeHolder.trim()} is already added!`,
          NotificationType.Error
        );
      }

      if (success) {
        setStakeHolderList([
          ...stakeHolderList,
          newStakeHolder(stakeHolder.trim()),
        ]);
        setStakeHolder("");
      }
    }

    setNotificationStakeHolderList([...notificationList]);
  };

  const deleteStakeHolder = (index) => {
    setStakeHolderList([
      ...stakeHolderList.filter((t) => t !== stakeHolderList[index]),
    ]);
  };

  const submitCameraData = () => {
    dispatch(
      submitArcGISCameraData(
        user.uid,
        cameraId,
        fileList,
        stakeHolderList.map((t) => t.email)
      )
    );
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
                  <select
                    className="form-select"
                    disabled={sendingForm}
                  ></select>
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
                    disabled={sendingForm}
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
                    disabled={sendingForm}
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
                          {!sendingForm && (
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
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {cameraId &&
            fileViewList &&
            cameraId !== "" &&
            fileViewList.length > 0 && (
              <div className="card mt-3 w-100">
                <div className="card-body">
                  <h4 className="card-title">Stakeholders</h4>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                      <form onSubmit={(e) => addStakeHolder(e)}>
                        <div className="row">
                          <div className="col-10">
                            <div className="form-floating mb-3">
                              <input
                                type="email"
                                className="form-control"
                                value={stakeHolder}
                                onChange={(e) => setStakeHolder(e.target.value)}
                                disabled={sendingForm}
                              />
                              <label>
                                Email <span className="text-danger">*</span>
                              </label>
                            </div>
                            <Notification
                              notificationList={notificationStakeHolderList}
                            />
                          </div>
                          <div className="col-2">
                            <button
                              type="submit"
                              className="btn btn-success mt-2"
                            >
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
                      </form>
                    </div>

                    {stakeHolderList.length > 0 && (
                      <div className="col-lg-6 col-md-6 col-12">
                        <div className="table-responsive">
                          <table className="table table-success table-bordered table-striped table-hover">
                            <thead>
                              <tr>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Comments</th>
                                {!sendingForm && <th></th>}
                              </tr>
                            </thead>
                            <tbody>
                              {stakeHolderList.map((element, index) => (
                                <tr key={index}>
                                  <td>{element.email}</td>
                                  <td>
                                    {element.envelopeStatus
                                      ? element.envelopeStatus
                                      : "---"}
                                  </td>
                                  <td>
                                    {element.comments
                                      ? element.comments
                                      : "---"}
                                  </td>
                                  {!sendingForm && (
                                    <td className="text-center">
                                      <button
                                        type="button"
                                        className="btn btn-default btn-sm"
                                        onClick={() => deleteStakeHolder(index)}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 448 512"
                                          width="18px"
                                        >
                                          <path
                                            d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"
                                            fill="red"
                                          />
                                        </svg>
                                      </button>
                                    </td>
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          {stakeHolderList.length > 0 && (
            <div className="d-flex flex-row-reverse mt-3">
              <button
                type="button"
                className="btn btn-success btn-lg"
                disabled={sendingForm}
                onClick={() => submitCameraData()}
              >
                {sendingForm ? <Loading type="light" /> : "Submit"}
              </button>
            </div>
          )}

          {sendingForm && (
            <div className="progress mt-3">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: `${sendProgress}%` }}
              ></div>
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
