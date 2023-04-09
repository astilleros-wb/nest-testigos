import { Typology } from "../../../property/enums";

export const FotoToMetaTypology = (
  raw_type: string | number | [number, number[]]
): Typology[] => {
  if (typeof raw_type === "string" || typeof raw_type === "number") {
    return FotocasaToMetadataTypology[raw_type];
  }
  if (raw_type[0] === 2) {
    if (raw_type[1].every((s) => s in [3, 5, 9]))
      return [Typology.casa];
    else if (raw_type[1].every((s) => s in [2, 6, 7, 8, 52, 1, 54]))
      return [Typology.piso];
    else if (raw_type[1].every((s) => s in [3, 5, 9, 2, 6, 7, 8, 52, 1, 54]))
      return [Typology.casa, Typology.piso];
  }

  return FotocasaToMetadataTypology[raw_type[0]];
};

export const MetaToFotoTypologys = (
  values: number[],
  encode: "api"
) => {
  const col = 3;
  
  const res: any[] = [];

  // PUEDE DEVOLVER VARIAS URLS, INTENTAMOS JUNTAR PISOS Y CASAS EN VIVIENDAS
  if (values.indexOf(Typology.piso) >=0 && values.indexOf(Typology.casa) >=0) {
    res.push(equals[0][col]);
    values = values.filter((v) => v !== Typology.piso && v !== Typology.casa);
  }
  values.map((v) => {
    const line = equals.findIndex((k) => k[0] === v)
    if(line > 0 ) res.push(equals[line][col])
  });
  return res;
};

const equals = [
  ["viviendas", "viviendas", "vivienda", [2/* , [3, 5, 9, 2, 6, 7, 8, 52, 1, 54] */]],
  [Typology.terreno, "terrenos", "terreno", [4]],
  [Typology.edificio, "edificios", "edificio", [8]],
  [Typology.garaje, "garajes", "garaje", [3]],
  [Typology.trastero, "trasteros", "trasteros", [7]],
  [Typology.oficinas, "oficinas", "oficina", [6]],
  [Typology.casa, "casas", "casa", [2, [3, 5, 9]]],
  [Typology.piso, "pisos", "piso", [2, [2, 6, 7, 8, 52, 1, 54]]],
];

const FotocasaToMetadataTypology: {
  [key: string | number]: Typology[];
} = {
  casa: [Typology.casa],
  casas: [Typology.casa],

  piso: [Typology.piso],
  pisos: [Typology.piso],

  vivienda: [Typology.casa, Typology.piso],
  viviendas: [Typology.casa, Typology.piso],

  terreno: [Typology.terreno],
  terrenos: [Typology.terreno],
  4: [Typology.terreno],

  edificio: [Typology.edificio],
  edificios: [Typology.edificio],
  8: [Typology.edificio],

  garaje: [Typology.garaje],
  garajes: [Typology.garaje],
  3: [Typology.garaje],

  trastero: [Typology.trastero],
  trasteros: [Typology.trastero],
  7: [Typology.trastero],

  oficina: [Typology.oficinas],
  oficinas: [Typology.oficinas],
  6: [Typology.oficinas],
};
