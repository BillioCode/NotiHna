import express from "express";
import ConnectDB from "./db/connectDB.js"
import noteRouter from "./routes/note.routes.js";
import rateLimiter from "./middlewares/rateLimiter.middleware.js"


const app = express();
app.use(express.json());
app.use(express.static('public'));


// db connection
ConnectDB();

app.use(rateLimiter);
//routes
app.use('/api/notes', noteRouter)

export default app;