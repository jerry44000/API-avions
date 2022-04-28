import {
  validate,
  createAvion,
  findAvionById,
  deleteAvionById,
  updateAvionById,
} from "./AvionService";

const avion = {
  avionneur: "boeing",
  description: "avion géniale",
  model: "737MAX",
  annee: "2010",
  service: true,
  place: "289",
  interieur: "2018BA",
  incident: "0",
};

//Test Create
test("Creation d un avion test de id", () => {
  expect(createAvion(avion).id).toBe(2);
});
test("Creation d un avion test de id", () => {
  expect(createAvion(avion).id).toBe(3);
});

//Test byId
test("Rechercher avion by id", () => {
  expect(findAvionById(3).id).toBe(3);
});

//Test update
test("Mise à jour d un avion test par id", () => {
  avion.avionneur = "UPDATED";
  updateAvionById(3, avion);
  expect(findAvionById(3).avionneur).toBe("UPDATED");
});

//Test delete
test("Delete un avion", () => {
  expect(deleteAvionById(3)).toBeNull;
});
test("Delete un avion", () => {
  expect(deleteAvionById(2)).toBeNull;
});
