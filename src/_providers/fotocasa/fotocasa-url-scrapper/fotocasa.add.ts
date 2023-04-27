export class fotocasaAdd {
  id: number;
  typeId: number;
  subtypeId: number;

  // fotocasa.es + detail.es /es/comprar/vivienda/chiva/aire-acondicionado-calefaccion-parking-jardin-terraza-trastero-zona-comunitaria-patio-piscina-piscina/176113517/d
  detail: { [key: string]: string };

  multimedias: {
    url: string;
    typeId: number;
    position: null;
  }[];

  /* 
  keys = [
    "bathrooms", 
    "conservationState", 
    "floor", 
    "air_conditioner", 
    "heater", 
    "terrace", 
    "swimming_pool", 
    "balcony", 
    "rooms", 
    "surface"
    ] 
    */
  features: {
    key: string;
    value: [number];
    minValue: number;
    maxValue: number;
  }[];

  transactions: {
    transactionTypeId: number;
    value: [number];
    reduced: number;
    periodicityId: number;
    maxPrice: number;
    minPrice: number;
  }[];

  address: {
    ubication: string;
    location: {
      country: string;
      level1: string;
      level2: string;
      level3: string;
      level4: string;
      level5: string;
      level6: string;
      level7: string;
      level8: string;
      upperLevel: string;
      countryId: number;
      level1Id: number;
      level2Id: number;
      level3Id: number;
      level4Id: number;
      level5Id: number;
      level6Id: number;
      level7Id: number;
      level8Id: number;
    };
    coordinates: {
      accuracy: number;
      latitude: number;
      longitude: number;
    };
    zipCode: number;
    customZone: any;
  };
  date: string;
  description: string;
  realEstateAdId: string; //'ee783ad1-d96b-4348-9224-123d55da497e'
}
