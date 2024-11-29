import { Router } from "express";
import matchRouter from "./routes/matchRouter";

const indexV1 = Router();

indexV1.use("/matches", matchRouter);



export default indexV1;
