import { ExtraFeature } from '../../../property/enums';

// Provider : Own
export const ExtraFeaturetrToCode: { [key: string]: number } = {
  'aire-acondicionado': ExtraFeature.aire_acondicionado,
  calefaccion: ExtraFeature.calefaccion,
  parking: ExtraFeature.parking,
  jardin: ExtraFeature.jardin,
  terraza: ExtraFeature.terraza,
  trastero: ExtraFeature.trastero,
  ascensor: ExtraFeature.ascensor,
  piscina: ExtraFeature.piscina,
  amueblado: ExtraFeature.amueblado,
  electrodomesticos: ExtraFeature.electrodomesticos,
  balcon: ExtraFeature.balcon,
  'no-amueblado': ExtraFeature.no_amueblado,
};

export const codeToExtraFeaturetr = Object.entries(ExtraFeaturetrToCode).reduce(
  (p: { [key: number]: string }, v: [string, number]) => {
    p[Number(v[1])] = v[0];
    return p;
  },
  {},
);

// Provider : Own
export const ExtraFeatureNumToCode: { [key: number]: number } = {
  1: ExtraFeature.aire_acondicionado,
  3: ExtraFeature.calefaccion,
  5: ExtraFeature.parking,
  7: ExtraFeature.jardin,
  10: ExtraFeature.terraza,
  11: ExtraFeature.trastero,
  13: ExtraFeature.ascensor,
  17: ExtraFeature.piscina,
  19: ExtraFeature.amueblado,
  21: ExtraFeature.electrodomesticos,
  32: ExtraFeature.balcon,
  130: ExtraFeature.no_amueblado,
};

export const codeToExtraFeatureNum = Object.entries(
  ExtraFeatureNumToCode,
).reduce((p: { [key: number]: number }, v: any[]) => {
  p[Number(v[1])] = v[0];
  return p;
}, {});

export const ExtraFeatureCodeToScrap: { [key: string]: number } = {
  air_conditioner: ExtraFeature.aire_acondicionado,
  heater: ExtraFeature.calefaccion,
  terrace: ExtraFeature.terraza,
  swimming_pool: ExtraFeature.piscina,
  balcony: ExtraFeature.balcon,
};

export const mapExtraFeatureFromScrap = (
  F: {
    key: string;
    value: [number];
    minValue: number;
    maxValue: number;
  }[],
) => {
  return F.map((f) => ExtraFeatureCodeToScrap[f.key]).filter((f) => !!f);
};
