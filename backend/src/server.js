import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config(); // inits plugin for hiding of db env variable

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use("/api/notes", notesRoutes)

app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
});