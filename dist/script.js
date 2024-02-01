require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/ImageryLayer",
  "esri/layers/support/RasterFunction",
  "esri/PopupTemplate"
], (Map, MapView, ImageryLayer, RasterFunction, PopupTemplate) => {

  // Define the popup template for the imagery layer
  const imagePopupTemplate = new PopupTemplate({
    title: "Data from {SensorName} satellite",
    content: `
      Rendered RGB values: <b>{Raster.ServicePixelValue} </b>
      <br>Original values (B, G, R, NIR): <b>{Raster.ItemPixelValue} </b>
      `
  });

  // Define the NDVI raster function template
  const ndviRFT = new RasterFunction({
    functionName: "Normalized Difference Vegetation Index (NDVI)"
  });

  const layer = new ImageryLayer({
    url: "https://landsat2.arcgis.com/arcgis/rest/services/Landsat8_Views/ImageServer",
    rasterFunction: ndviRFT, // Use NDVI raster function
    popupTemplate: imagePopupTemplate // Apply the popup template
  });

  const map = new Map({
    basemap: "streets",
    layers: [layer]
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-93.5, 41.5], // Midwest coordinates
    zoom: 6, // Zoom over the Midwest
    popup: {
      actions: []
    }
  });
});