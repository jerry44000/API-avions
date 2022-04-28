import db from "./database";

export const insert = function (avion) {
  avion.id = db.length + 1;
  db.push(avion);
  return avion;
};

export const update = function (newAvion) {
  let avionFound;
  let itemIndex;

  db.map((avion, index) => {
    if (avion.id === newAvion.id) {
      avionFound = avion;
      itemIndex = index;
    }
  });
  if (!avionFound) {
    return false;
  }

  //merge
  const updatedAvion = {
    id: avionFound,
    avionneur: newAvion.avionneur || avionFound.avionneur,
    description: newAvion.description || avionFound.description,
    model: newAvion.model || avionFound.model,
    annee: newAvion.annee || avionFound.annee,
    service: newAvion.service || avionFound.service,
    place: newAvion.place || avionFound.place,
    interieur: newAvion.interieur || avionFound.interieur,
    incident: newAvion.incident || avionFound.incident,
  };
  //Mise à jour en base de donnée
  db.splice(itemIndex, 1, updatedAvion);
  return updatedAvion;
};

export const del = function (id) {
  const avionFound = db.find((avion, index) => {
    if (avion.id === id) {
      db.splice(index, 1);
      return true;
    }
  });
  return avionFound;
};

export const getAll = function () {
  return db;
};

export const get = function (id) {
  const avionFound = db.find((avion) => {
    if (avion.id === id) {
      return avion;
    }
  });
  return avionFound;
};
