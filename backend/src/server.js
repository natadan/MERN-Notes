import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config(); // inits plugin for hiding of db env variable

const app = express();
const PORT = process.env.PORT;

// middleware -- runs between request and response
app.use(express.json()); // this middleware parses json bodies: allows us to use req.body
app.use(rateLimiter);

// simple custom middleware ex.
// app.use((req, res, next) => {
//    console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//    next(); // dont quite understand this, but seems to pass control to notesController.js
// });

app.use("/api/notes", notesRoutes);

// only listen for requests once db returns
connectDB().then(() => {
   app.listen(PORT, () => {
       console.log("Server started on PORT:", PORT);
   });
});
