import { Match } from "../../typings/Match";
import { v4 } from "uuid";
import { Request, Response } from "express";
import { getMatch, getUser } from "match-fake-data";

const match: Match[] = getMatch();
const user = getUser();

export const createMatch = (req: Request, res: Response) => {
  const newMatch: Match = req.body;
  if (!newMatch) {
    res.status(400).send("Bad request");
    return;
  }
  newMatch.id = match.length + 1;
  match.push(newMatch);
  res.send(newMatch);
};

export const getMatches = (req: Request, res: Response): any => {
  return res.send(match);
};

export default { createMatch, getMatches };
