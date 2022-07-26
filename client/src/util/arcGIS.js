export var map = null;

export const TOKEN_API =
  "AAPK6ed23630babd43b9a64481a4e576cfa1wDia-f_VFBGWwj3TSMaETcr_2QD138Pw8sMZiOlX4qkaqP6qAJsV-hJEH1VHnyWr";

export const CLIENT_ID = "DPVovAjI8lNZTiBO";
export const CLIENT_SECRET = "d989f684de884a0ba80e4b8b2a47f482";

export const ENUM_MAP_ARCGIS = [
  "ArcGIS:Imagery",
  "ArcGIS:LightGray",
  "ArcGIS:DarkGray",
  "ArcGIS:Navigation",
  "ArcGIS:NavigationNight",
  "ArcGIS:Streets",
  "ArcGIS:StreetsNight",
  "ArcGIS:StreetsRelief",
  "ArcGIS:Topographic",
  "ArcGIS:Oceans",
  "ArcGIS:Terrain",
  "ArcGIS:Community",
  "ArcGIS:ChartedTerritory",
  "ArcGIS:ColoredPencil",
  "ArcGIS:Nova",
  "ArcGIS:ModernAntique",
  "ArcGIS:Midcentury",
  "ArcGIS:Newspaper",
];

export const renderMap = async (
  containerId,
  latitude,
  longitude,
  zoom,
  attachments,
  selectLayer = false
) => {
  const latlng = [latitude, longitude];

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

  map = new window.L.map(containerId, {
    minZoom: 2,
    dragging: true,
    zoomControl: true,
    scrollWheelZoom: true,
  }).setView(latlng, zoom);
  if (!selectLayer) {
    const rnd = parseInt(
      Math.min(
        parseInt(Math.random() * ENUM_MAP_ARCGIS.length),
        ENUM_MAP_ARCGIS.length - 1
      )
    );

    window.L.esri.Vector.vectorBasemapLayer(ENUM_MAP_ARCGIS[rnd], {
      apiKey: TOKEN_API,
    }).addTo(map);
  } else {
    const basemapLayers = {
      "ArcGIS:Imagery": window.L.esri.Vector.vectorBasemapLayer(
        "ArcGIS:Imagery",
        { apiKey: TOKEN_API }
      ).addTo(map),
      "ArcGIS:LightGray": window.L.esri.Vector.vectorBasemapLayer(
        "ArcGIS:LightGray",
        { apiKey: TOKEN_API }
      ).addTo(map),
      "ArcGIS:DarkGray": window.L.esri.Vector.vectorBasemapLayer(
        "ArcGIS:DarkGray",
        { apiKey: TOKEN_API }
      ).addTo(map),
      "ArcGIS:Navigation": window.L.esri.Vector.vectorBasemapLayer(
        "ArcGIS:Navigation",
        { apiKey: TOKEN_API }
      ).addTo(map),
      "ArcGIS:NavigationNight": window.L.esri.Vector.vectorBasemapLayer(
        "ArcGIS:NavigationNight",
        { apiKey: TOKEN_API }
      ).addTo(map),
      "ArcGIS:Streets": window.L.esri.Vector.vectorBasemapLayer(
        "ArcGIS:Streets",
        { apiKey: TOKEN_API }
      ).addTo(map),
      "ArcGIS:StreetsNight": window.L.esri.Vector.vectorBasemapLayer(
        "ArcGIS:StreetsNight",
        { apiKey: TOKEN_API }
      ).addTo(map),
      "ArcGIS:StreetsRelief": window.L.esri.Vector.vectorBasemapLayer(
        "ArcGIS:StreetsRelief",
        { apiKey: TOKEN_API }
      ).addTo(map),
      "ArcGIS:Topographic": window.L.esri.Vector.vectorBasemapLayer(
        "ArcGIS:Topographic",
        { apiKey: TOKEN_API }
      ).addTo(map),
      "ArcGIS:Oceans": window.L.esri.Vector.vectorBasemapLayer(
        "ArcGIS:Oceans",
        { apiKey: TOKEN_API }
      ).addTo(map),
      "ArcGIS:Terrain": window.L.esri.Vector.vectorBasemapLayer(
        "ArcGIS:Terrain",
        { apiKey: TOKEN_API }
      ).addTo(map),
      "ArcGIS:Community": window.L.esri.Vector.vectorBasemapLayer(
        "ArcGIS:Community",
        { apiKey: TOKEN_API }
      ).addTo(map),
      "ArcGIS:ColoredPencil": window.L.esri.Vector.vectorBasemapLayer(
        "ArcGIS:ColoredPencil",
        { apiKey: TOKEN_API }
      ).addTo(map),
      "ArcGIS:Nova": window.L.esri.Vector.vectorBasemapLayer("ArcGIS:Nova", {
        apiKey: TOKEN_API,
      }).addTo(map),
      "ArcGIS:ModernAntique": window.L.esri.Vector.vectorBasemapLayer(
        "ArcGIS:ModernAntique",
        { apiKey: TOKEN_API }
      ).addTo(map),
      "ArcGIS:Midcentury": window.L.esri.Vector.vectorBasemapLayer(
        "ArcGIS:Midcentury",
        { apiKey: TOKEN_API }
      ).addTo(map),
      "ArcGIS:Newspaper": window.L.esri.Vector.vectorBasemapLayer(
        "ArcGIS:Newspaper",
        { apiKey: TOKEN_API }
      ).addTo(map),
      "ArcGIS:ChartedTerritory": window.L.esri.Vector.vectorBasemapLayer(
        "ArcGIS:ChartedTerritory",
        { apiKey: TOKEN_API }
      ).addTo(map),
    };
    window.L.control
      .layers(basemapLayers, null, { collapsed: true })
      .addTo(map);
  }

  marker.addTo(map);
  if (attachments.length > 0) {
    const accessToken = await getAccessToken();

    let images = "";
    let cssClass = "";

    for (let i = 0; i < attachments.length; i++) {
      if (i === 0) {
        cssClass = "active";
      } else {
        cssClass = "";
      }

      images += `<div class="carousel-item ${cssClass}" style='height: 210px; width: 100%; overflow-y: auto;'>
        <div>
          <img src="${attachments[i].objectUrl.replace(
            "_fieldworker",
            ""
          )}?token=${accessToken}" class='d-block w-100' style='min-height: 210px; object-fit: cover;' />
        </div>
      </div>`;
    }
    const carousel = `<div style='width: 280px; height: 220px;'>
      <div id="carousel_${containerId}" class="carousel slide" data-bs-ride="carousel" data-interval="false">
      <div class="carousel-inner">
        ${images}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carousel_${containerId}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carousel_${containerId}" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
      </div>
    </div>`;

    marker.bindPopup(function (layer) {
      return window.L.Util.template(carousel, layer);
    });
  }
};

export const getAccessToken = async () => {
  let result = null;

  try {
    const response = await fetch(
      `https://www.arcgis.com/sharing/rest/oauth2/token?f=json&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials&expiration=20160`
    );

    const json = await response.json();

    console.log(json.access_token);

    result = json.access_token;
  } catch (error) {
    console.log(error);
  }

  return result;
};
