import express from "express";
import db from "./data/database";
import bodyParser from "body-parser";
import {
  validate,
  createAvion,
  findAvionById,
  deleteAvionById,
  updateAvionById,
} from "./business/AvionService";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/', function(req, res) {
//     res.send('hello world');
//   });

// app.get('/b', (req,res)=>{
//   res.send('hello world b')
// })

//CRUD API
//GET
//POST
//PUT
//DELETE

//1 Récupérer toutes les données avions
//définir un ENDPOINT /api/v1/avions
//traitement : rien
//retour : retourner les donées avec un code http 200
//retour code http 400 si erreur

app.get("/api/v1/avions", (req, res) => {
  res.status(200).send({
    success: true,
    message: "avion récupéré avec succes",
    avion: db,
  });
});

//2 CREATE
//creer le ENDPOINT
//retourner code 200 si ok
//retourner code 400 si erreur
//recupérer les données de la requête
//valider les données
//insérer en base de donnée l'avion

app.post("/OLD/api/v1/avions", (req, res) => {
  console.log("req", req.body.avionneur);
  if (!req.body.avionneur) {
    res.status(400).send({
      success: false,
      message: "avioneur is required",
    });
  }
  const avionToSave = {
    id: db.length + 1,
    avionneur: req.body.avionneur,
    description: req.body.description,
    model: req.body.model,
    annee: req.body.annee,
    service: req.body.service,
    place: req.body.place,
    interieur: req.body.interieur,
    incident: req.body.incident,
  };

  db.push(avionToSave);
  res.status(200).send({
    success: true,
    message: "avion ajouté avec succes",
    avion: avionToSave,
  });
});

// CREATE

app.post("/api/v1/avions", (req, res) => {
  console.log("req", req.body.avionneur);
  const avion = req.body;
  const valid = validate(avion);
  if (!valid.success) {
    //return 400 error
    res.status(400).send(valid);
  }
  // insérer en bdd
  const avionToSave = createAvion(avion);
  res.status(200).send({
    success: true,
    message: "avion ajouté avec succes",
    avion: avionToSave,
  });
});

//3 getById
//creer endpoint avec path param /api/v1/avions/:id
//coder finction findAvionById(id)

app.get("/api/v1/avions/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const avion = findAvionById(id);
  if (avion) {
    res.status(200).send({
      success: true,
      message: "id de l'avion récupéré avec succes",
      avion: avion,
    });
  } else {
    res.status(404).send({
      success: false,
      message: "avion not found",
    });
  }
});

//Delete

app.delete("/api/v1/avions/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const avion = deleteAvionById(id);
  if (avion) {
    res.status(200).send({
      success: true,
      message: "avion supprimé avec succes",
    });
  } else {
    res.status(404).send({
      success: false,
      message: "avion not found / can't find id",
    });
  }
});

//UPDATE
//recuperer objet avion de la requête
//valider les données en entrée
//updateAvionById(id, avion)
//gestion de code error

app.put("/api/v1/avions/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const newAvion = req.body;
  const avion = updateAvionById(id, newAvion);
  if (avion) {
    res.status(200).send({
      success: true,
      message: "avion mise à jour",
    });
  } else {
    res.status(404).send({
      success: false,
      message: "avion not updated",
    });
  }
});

const PORT = 3080;
app.listen(PORT, () => {
  console.log(`serveur demaré sur le port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
