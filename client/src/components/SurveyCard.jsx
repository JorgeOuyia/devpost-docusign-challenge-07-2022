import React from "react";
import "./SurveyCard.css";
import { ENUM_MAP_ARCGIS } from "../util/leaflet";
import { TOKEN_API } from "../util/arcGIS";

const SurveyCard = ({
  id,
  latitude,
  longitude,
  title,
  procedure,
  date,
  trapTest,
  working,
}) => {
  React.useEffect(() => {
    const rnd = parseInt(
      Math.min(
        parseInt(Math.random() * ENUM_MAP_ARCGIS.length),
        ENUM_MAP_ARCGIS.length - 1
      )
    );
    const latlng = [latitude, longitude];
    const map = window.L.map(`map_${id}`, {
      minZoom: 2,
      dragging: true,
      zoomControl: true,
      scrollWheelZoom: true,
    }).setView(latlng, 8);
    window.L.esri.Vector.vectorBasemapLayer(ENUM_MAP_ARCGIS[rnd], {
      apiKey:
        TOKEN_API,
    }).addTo(map);

    const icon = window.L.icon({
      iconUrl:
        "http://store-images.s-microsoft.com/image/apps.46703.14560072719906134.35713bf3-d456-450b-b4c7-d9db01972e59.587e4824-0f00-4b63-937a-e80e9d928e8c",
      iconSize: [27, 31],
      iconAnchor: [13.5, 17.5],
      popupAnchor: [0, -11],
    });

    const marker = new window.L.Marker(latlng, {
      icon: icon,
    });
    marker.addTo(map);

    window.L.esri
      .featureLayer({
        url: "https://services8.arcgis.com/ihCDezBdWgamTypb/arcgis/rest/services/survey123_cfea65c0165d4b0ba1a58770fc28b25d/FeatureServer/0",
        pointToLayer: (geojson, latlng) => {
          return window.L.marker(
            { lat: 34.02, long: -118.805 },
            {
              icon: icon,
            }
          );
        },
      })
      .addTo(map);
  }, [id, latitude, longitude]);

  return (
    <div className="w-100 h-100 card">
      <div className="survey-card">
        <div id={`map_${id}`} className="survey-card-map"></div>
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
          <div className="row mb-2">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <label className="text-secondary">Date and Time</label>
              <p className="card-title">
                <strong>{`${date.getDate()}/${
                  date.getMonth() + 1
                }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}</strong>
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
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <label className="text-secondary">Camera trap test</label>
              <p className="card-text">
                {trapTest ? (
                  <span className="badge bg-success">Yes</span>
                ) : (
                  <span className="badge bg-danger">No</span>
                )}
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
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
