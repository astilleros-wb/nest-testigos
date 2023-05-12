import sockets from './socket.js';
import { getGeo, setGeo, clearGeos, setList } from './map.js';

let geo; // TO DELETE GEO GENERADO

const V = {
  detailUrl: document.getElementById('detailUrl'),
  url_select: document.getElementById('url_select'),
  btn_generate_metadata: document.getElementById('btn_generate_metadata'),

  providers: document.getElementById('providers'),
  transaction: document.getElementById('transaction'),
  typologies: document.getElementById('typologies'),
  conservations: document.getElementById('conservations'),
  extraFeatures: document.getElementById('extraFeatures'),

  surface: {
    min: document.getElementById('surfaceMin'),
    value: document.getElementById('surfaceValue'),
    max: document.getElementById('surfaceMax'),
  },
  bedrooms: {
    min: document.getElementById('bedroomsMin'),
    value: document.getElementById('bedroomsValue'),
    max: document.getElementById('bedroomsMax'),
  },
  bathrooms: {
    min: document.getElementById('bathroomsMin'),
    value: document.getElementById('bathroomsValue'),
    max: document.getElementById('bathroomsMax'),
  },
  rooms: {
    min: document.getElementById('roomsMin'),
    value: document.getElementById('roomsValue'),
    max: document.getElementById('roomsMax'),
  },
  price: {
    min: document.getElementById('priceMin'),
    value: document.getElementById('priceValue'),
    max: document.getElementById('priceMax'),
  },

  btn_generate_list: document.getElementById('btn_generate_list'),
};

const loadEmiters = function () {
  V.btn_generate_metadata.addEventListener('click', sendProviderUrl);
  V.btn_generate_list.addEventListener('click', sendMetadata);
  V.url_select.addEventListener('change', (e) => {
    V.detailUrl.value = V.url_select.options[V.url_select.selectedIndex].value;
  });
};

const sendProviderUrl = (e) => {
  sockets.master.emit(
    'getMetadatumFromUrl',
    {
      url: V.detailUrl.value,
    },
    (data) => {
      setMetadata(data);
    },
  );
};

const sendMetadata = (e) => {
  const metadata = generateMetadata();
  sockets.master.emit('generateListFromMetadatum', metadata, (data) => {
    //console.log(data);
    addList(data);
  });
};

const clearMetadata = () => {
  clearGeos();
  Array.from(V.providers.options).forEach(function (option) {
    option.selected = false;
  });
  Array.from(V.transaction.options).forEach(function (option) {
    option.selected = false;
  });
  Array.from(V.typologies.options).forEach(function (option) {
    option.selected = false;
  });
  Array.from(V.conservations.options).forEach(function (option) {
    option.selected = false;
  });
  Array.from(V.extraFeatures.options).forEach(function (option) {
    option.selected = false;
  });

  V.surface.min.value = '';
  V.surface.value.value = '';
  V.surface.max.value = '';
  V.bedrooms.min.value = '';
  V.bedrooms.value.value = '';
  V.bedrooms.max.value = '';
  V.bathrooms.min.value = '';
  V.bathrooms.value.value = '';
  V.bathrooms.max.value = '';
  V.rooms.min.value = '';
  V.rooms.value.value = '';
  V.rooms.max.value = '';
  V.price.min.value = '';
  V.price.value.value = '';
  V.price.max.value = '';
};

const setMetadata = (m) => {
  geo = m.geo;
  console.log({ ...m, geo: null });
  clearMetadata();
  if (m.providers)
    Array.from(V.providers.options).forEach(function (option) {
      option.selected = m.providers.includes(Number(option.value));
    });
  if (m.transaction >= 0) V.transaction.value = m.transaction;

  if (m.typologies)
    Array.from(V.typologies.options).forEach(function (option) {
      option.selected = m.typologies.includes(Number(option.value));
    });
  if (m.conservations)
    Array.from(V.conservations.options).forEach(function (option) {
      option.selected = m.conservations.includes(Number(option.value));
    });
  if (m.extraFeatures)
    Array.from(V.extraFeatures.options).forEach(function (option) {
      option.selected = m.extraFeatures.includes(Number(option.value));
    });

  if (m.surface) {
    V.surface.min.value = m.surface.min ?? '';
    V.surface.value.value = m.surface.value ?? '';
    V.surface.max.value = m.surface.max ?? '';
  }

  if (m.bedrooms) {
    V.bedrooms.min.value = m.bedrooms.min ?? '';
    V.bedrooms.value.value = m.bedrooms.value ?? '';
    V.bedrooms.max.value = m.bedrooms.max ?? '';
  }

  if (m.bathrooms) {
    V.bathrooms.min.value = m.bathrooms.min ?? '';
    V.bathrooms.value.value = m.bathrooms.value ?? '';
    V.bathrooms.max.value = m.bathrooms.max ?? '';
  }

  if (m.rooms) {
    V.rooms.min.value = m.rooms.min ?? '';
    V.rooms.value.value = m.rooms.value ?? '';
    V.rooms.max.value = m.rooms.max ?? '';
  }

  if (m.price) {
    V.price.min.value = m.price.min ?? '';
    V.price.value.value = m.price.value ?? '';
    V.price.max.value = m.price.max ?? '';
  }

  if (m.geo) {
    setGeo(m.geo);
  }
};

const generateMetadata = () => {
  console.log(geo);
  //geo = getGeo();
  return {
    providers: Array.from(V.providers.options)
      .filter((o) => o.selected)
      .map((o) => Number(o.value)),
    urlType: 1,
    languages: [0],
    transaction: V.transaction.value,
    typologies: Array.from(V.typologies.options)
      .filter((o) => o.selected)
      .map((o) => Number(o.value)),
    conservations: Array.from(V.conservations.options)
      .filter((o) => o.selected)
      .map((o) => Number(o.value)),
    extraFeatures: Array.from(V.extraFeatures.options)
      .filter((o) => o.selected)
      .map((o) => Number(o.value)),
    surface: {
      min: V.surface.min.value ? Number(V.surface.min.value) : undefined,
      value: V.surface.value.value ? Number(V.surface.value.value) : undefined,
      max: V.surface.max.value ? Number(V.surface.max.value) : undefined,
    },
    bedrooms: {
      min: V.bedrooms.min.value ? Number(V.bedrooms.min.value) : undefined,
      value: V.bedrooms.value.value
        ? Number(V.bedrooms.value.value)
        : undefined,
      max: V.bedrooms.max.value ? Number(V.bedrooms.max.value) : undefined,
    },
    bathrooms: {
      min: V.bathrooms.min.value ? Number(V.bathrooms.min.value) : undefined,
      value: V.bathrooms.value.value
        ? Number(V.bathrooms.value.value)
        : undefined,
      max: V.bathrooms.max.value ? Number(V.bathrooms.max.value) : undefined,
    },
    rooms: {
      min: V.rooms.min.value ? Number(V.rooms.min.value) : undefined,
      value: V.rooms.value.value ? Number(V.rooms.value.value) : undefined,
      max: V.rooms.max.value ? Number(V.rooms.max.value) : undefined,
    },
    price: {
      min: V.price.min.value ? Number(V.price.min.value) : undefined,
      value: V.price.value.value ? Number(V.price.value.value) : undefined,
      max: V.price.max.value ? Number(V.price.max.value) : undefined,
    },
    geo,
  };
};

const addList = (L) => {
  console.log(L);
  console.log('LISTA ', L);
  clearGeos();
  setList(L);
};

loadEmiters();
