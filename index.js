const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
// const noteRoute = require("./Routes/NoteRoute");
// const videoRoute = require('./Routes/VideoRoutes')
const { MONGO_URL, PORT, FRONTEND_URL } = process.env;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

const port = PORT || 4000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.use(
  cors({
    origin: [FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(cookieParser());

app.use(express.json());

app.options('*', cors())

app.use("/", authRoute);
// app.use('/api', noteRoute)
// app.use('/api', videoRoute)