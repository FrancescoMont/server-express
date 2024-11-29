import { Router } from "express";
import matchController from "../controllers/matchController";

const matchRouter = Router();

matchRouter.get("/", matchController.getMatches);
// matchRouter.get("/:id", matchController.getMatch);
matchRouter.post("/", matchController.createMatch);
// matchRouter.put("/:id", matchController.updateMatch);
// matchRouter.delete("/:id", matchController.deleteMatch);

export default matchRouter;