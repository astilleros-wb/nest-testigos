/* MAPA */

export let map;

export function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
    scrollwheel: true,
  });

  const drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: null,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.CIRCLE,
        google.maps.drawing.OverlayType.POLYGON,
      ],
    },
    circleOptions: {
      fillColor: '#ffff00',
      fillOpacity: 0.2,
      strokeWeight: 1,
      clickable: false,
      editable: true,
      zIndex: 1,
    },
    polygonOptions: {
      fillColor: '#ffff00',
      fillOpacity: 0.2,
      strokeWeight: 1,
      clickable: false,
      editable: true,
      zIndex: 1,
    },
  });

  drawingManager.setMap(map);
}

const features = [];
const markers = [];

export const clearGeos = function () {
  for (let i = 0; i < features.length; i++) {
    const P = features[i];
    P.setMap(null);
  }
  features.length = 0;

  for (let i = 0; i < markers.length; i++) {
    const M = markers[i];
    M.setMap(null);
  }
  markers.length = 0;
};

export const setGeo = function (geo) {
  if (geo.type === 'Polygon') {
    const paths = geo.coordinates[0].map((c) => ({ lat: c[1], lng: c[0] }));
    const polygon = new google.maps.Polygon({
      paths: [paths],
      editable: true,
      draggable: false,
    });

    polygon.setMap(map);
    features.push(polygon);
    const bounds = new google.maps.LatLngBounds();
    for (let i = 0; i < paths.length; i++) bounds.extend(paths[i]);
    map.fitBounds(bounds);
  } else if (geo.type === 'MultiPolygon') {
    const bounds = new google.maps.LatLngBounds();
    for (let i = 0; i < geo.coordinates.length; i++) {
      const Polygons = geo.coordinates[i];
      const paths = Polygons[0].map((c) => ({ lat: c[1], lng: c[0] }));
      const polygon = new google.maps.Polygon({
        paths: [paths],
        editable: false,
        draggable: false,
      });

      polygon.setMap(map);
      features.push(polygon);

      for (let i = 0; i < paths.length; i++) bounds.extend(paths[i]);
    }

    map.fitBounds(bounds);
  }
};

export const getGeo = function () {
  const coordinates = features.map((F) => {
    let c = F.getPath().g.map((C) => [C.lng, C.lat]);
    c = c.concat(c[0]);
    return c;
  });
  const res = {
    type: 'MultiPolygon',
    coordinates,
  };
  console.log(res);
  return res;
};

export const setList = function (L) {
  setGeo(L.metadatum.geo);
  L.items.map((W) => {
    const marker = new google.maps.Marker({
      position: {
        lat: W.property.geo.coordinates[1],
        lng: W.property.geo.coordinates[0],
      },
      map: map,
    });

    const info = new google.maps.InfoWindow({
      content: W.property.images
        .map((i) => `<a href="${i}">img</a>`)
        .join('<br>'),
    });

    marker.addListener('click', function () {
      info.open(map, marker);
    });
  });
};
