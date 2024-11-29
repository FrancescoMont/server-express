import express from "express";
import indexV1 from "./v1";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.use('/v1', indexV1);
app.listen(3000, () => {
  console.log("Server in ascolto sulla porta 3000");
});

app.use("/status", (_, res) => {
  res.status(200).json({
    message: `🚀 server is running on port ${port}`,
  });
});

export default app;