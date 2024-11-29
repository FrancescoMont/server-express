import express from "express"; // importiamo il modulo express
import { Match } from "./typings/Match";
import { Player } from "./typings/Player";
import { getMatch } from "match-fake-data";

const app = express(); // creiamo una nuova istanza di express

app.use(express.json());

/* 
Cosa fa: Aggiunge un middleware per analizzare il corpo delle richieste HTTP in formato JSON.
Scopo: Permette di accettare e lavorare con richieste che inviano dati nel formato JSON, tipico per le API REST. */
app.use(express.urlencoded({ extended: true }));

const matches: Match[] = getMatch();

app.listen(3000, () => {
  console.log("Server in ascolto sulla porta 3000");
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

// CRUD
// CREATE
app.post("/matches", (req, res) => {
  const newMatch: Match = req.body;
  if (!newMatch) {
    res.status(400).json({ message: "Bad request" });
    return;
  }
  newMatch.id = matches.length + 1;
  matches.push(newMatch);
  res.status(201).json({ message: "Match created", newMatch });
});
// READ
app.get("/matches", (_, res) => {
  res.status(200).json({ matches: matches });
});



// UPDATE
app.put("/matches/:id", (req, res) => {
  const id = req.params.id;
  const match = matches.find((match) => match.id === +id);
  if (!match) {
    res.status(404).json({ message: "Game not founded" });
    return;
  }
  const { title, dateTime } = req.body;
  match.title = title;
  match.dateTime = dateTime;
  res.status(200).json({ message: "Match updated", match });
});
// DELETE
app.delete("/matches/:id", (req, res) => {
  const id = req.params.id;
  const match = matches.find((match) => match.id === +id);
  if (!match) {
    res.status(404).json({ message: "Match not found" });
    return;
  }
  matches.splice(matches.indexOf(match), 1);
  res.status(204).json({ message: "Match deleted" });
});

// query param 
app.get("/matches/", (req, res) => {
  const { difficulty } = req.query;
  const match = matches.filter(
    (match) => match.difficulty === Number(difficulty)
  );
  if (!match.length) {
    res.status(404).json({ message: "no matches found" });
    return;
  }
  res.status(200).json(match);
});

// path param
app.get("/matches/:id", (req, res) => {
  const id = req.params.id;

  const match = matches.find((match) => match.id === Number(id));
  if (!match) {
    res.status(404).json({ message: "Match not found!" });
    return;
  }
  res.send(match);
});
