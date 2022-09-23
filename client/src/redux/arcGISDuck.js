import { async } from "@firebase/util";
import { generatePDF } from "../util/arcGIS";
import { generateEnvelope } from "../util/docusign";
import { firebase } from "../util/firebase";
import { addNotification, NotificationType } from "../util/notification";

const DATA_INICIAL = {
  loading: false,
  progress: 0,
};

const LOADING_CAMERA_DATA = "LOADING_CAMERA_DATA";
const MODIFY_PROGRESS_CAMERA_DATA = "MODIFY_PROGRESS_CAMERA_DATA";

export default function arcGISReducer(state = DATA_INICIAL, action) {
  let result = { ...state };

  switch (action.type) {
    case LOADING_CAMERA_DATA:
      result = { ...state, loading: action.payload };
      break;
    case MODIFY_PROGRESS_CAMERA_DATA:
      result = { ...state, progress: action.payload };
      break;
  }

  return result;
}

export const submitArcGISCameraData =
  (uid, cameraId, fileList, stakeHolderEmailList) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: LOADING_CAMERA_DATA,
        payload: true,
      });

      dispatch({
        type: MODIFY_PROGRESS_CAMERA_DATA,
        payload: 0,
      });

      const pdf = await generatePDF(cameraId, uid);

      dispatch({
        type: MODIFY_PROGRESS_CAMERA_DATA,
        payload: 34,
      });

      await generateEnvelope(pdf, stakeHolderEmailList, fileList);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({
        type: LOADING_CAMERA_DATA,
        payload: false,
      });
    }
  };
