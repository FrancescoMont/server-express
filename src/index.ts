import express from "express"; // importiamo il modulo express
import { Match } from "./typings/Match";
import { Player } from "./typings/Player";

const app = express(); // creiamo una nuova istanza di express

app.use(express.json());

/* 
Cosa fa: Aggiunge un middleware per analizzare il corpo delle richieste HTTP in formato JSON.
Scopo: Permette di accettare e lavorare con richieste che inviano dati nel formato JSON, tipico per le API REST. */
app.use(express.urlencoded({ extended: true })); 


const matches: Match[] = [];

app.listen(3000, () => {
  console.log("Server in ascolto sulla porta 3000");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// CRUD
// CREATE
app.post("/games", (req, res) => {
  const newMatch: Match = req.body;
  if (!newMatch) {
    res.status(400).send("Bad request");
    return;
  }
  newMatch.id = matches.length + 1;
  matches.push(newMatch);
  res.send(newMatch);
});
// READ
app.get("/games", (_, res) => {
  res.send(matches);
});
app.get("/matches/:id", (req, res) => {
  const id = req.params.id;

  const match = matches.find((match) => match.id === Number(id));
  if (!match) {
    res.status(404).send("Game not found!");
    return;
  }
  res.send(match);
});
// UPDATE
app.put("/game/:id", (req, res) => {
  const id = req.params.id;
  const match = matches.find((match) => match.id === +id);
  if (!match) {
    res.status(404).send("Game not founded");
    return;
  }
  const { title, dateTime } = req.body;
  match.title = title;
  match.dateTime = dateTime;
  res.send(match);
});
// DELETE
app.delete("/game/:id", (req, res) => {
  const id = req.params.id;
  const match = matches.find((match) => match.id === +id);
  if (!match) {
    res.status(404).send("Game not founded");
    return;
  }
  matches.splice(matches.indexOf(match), 1);
  res.send(match);
});
