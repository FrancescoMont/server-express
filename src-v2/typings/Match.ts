import { Player } from "./Player";

export type Match = {
  author: number;
  sport: string;
  title: string;
  imgUrl: string;
  dateTime: string;
  address: string;
  difficulty: number;
  playerAvailable: number;
  playersAttended: Player[];
  playersIn: Player[];
  id: number;
};
