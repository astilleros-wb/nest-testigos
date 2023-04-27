import { Conservation } from '../../../property/enums';

export enum ConservationFotocasa {
  casi_nuevo = 1,
  muy_bien = 2,
  bien = 3,
  a_reformar = 4,
  reformado = 8,
}

export const conservationToCode: { [key: number]: number } = {
  1: Conservation.obra_nueva,
  2: Conservation.muy_bien,
  3: Conservation.bien,
  4: Conservation.reformado,
  8: Conservation.a_reformar,
};

export const codeToConservation: { [key: number]: number } = {
  0: ConservationFotocasa.casi_nuevo,
  1: ConservationFotocasa.muy_bien,
  2: ConservationFotocasa.bien,
  3: ConservationFotocasa.reformado,
  4: ConservationFotocasa.a_reformar,
};
