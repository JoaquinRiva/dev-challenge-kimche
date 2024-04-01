import { FILTER_STATUS, FILTER_SPECIES, FILTER_GENDER, ORDER } from "./types";

export const filterStatus = (status) => {
  return {
    type: FILTER_STATUS,
    payload: status,
  };
};

export const filterSpecies = (species) => {
  return {
    type: FILTER_SPECIES,
    payload: species,
  };
};

export const filterGender = (gender) => {
  return {
    type: FILTER_GENDER,
    payload: gender,
  };
};

export const orderCars = (orden) => {
  return {
    type: ORDER,
    payload: orden,
  };
};
