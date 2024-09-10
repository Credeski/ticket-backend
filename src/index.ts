import express, { } from "express";
const app = express();
const PORT = 5002;




app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
