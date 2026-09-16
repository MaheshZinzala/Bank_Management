import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import connectDb from "./db/index.js";
import app from "./app.js";
const port = process.env.PORT || 5000;

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`port listening on ${port}`);
    });
  })
  .catch((error) => {
    console.log("Mongodb connection error:-> ", error);
    throw error;
  });
