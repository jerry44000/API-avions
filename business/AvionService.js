import { insert, update, del, getAll, get } from "../data/AvionDAO";

export const validate = function (avion) {
  if (!avion.avionneur) {
    return {
      success: false,
      message: "avioneur is required",
    };
  }
  if (!avion.model) {
    return {
      success: false,
      message: "model is required",
    };
  }
  if (!avion.annee) {
    return {
      success: false,
      message: "annee is required",
    };
  }
  if (!avion.description) {
    return {
      success: false,
      message: "description is required",
    };
  }
  return {
    success: true,
    message: "valide",
  };
};

export const createAvion = function (avion) {
  return insert(avion);
};

export const findAvionById = function (id) {
  return get(id);
};

export const deleteAvionById = function (id) {
  del(id);
};

export const updateAvionById = function (id, newAvion) {
  if (!validate(newAvion).success) {
    return false;
  }
  newAvion.id = id;
  return update(newAvion);
};
