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

export const renderMap = (
  containerId,
  latitude,
  longitude,
  zoom,
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
