import { infoRouter } from "@/routes/info";
// import { usersRouter } from "@/routes/users";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();


const CLIENT_HOSTNAME =process.env.CLIENT_HOSTNAME;

const SERVER_PORT =process.env.SERVER_PORT;

const app = express();
app.use(
  cors({
    origin: CLIENT_HOSTNAME,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());


app.use("/companies", infoRouter); // TODO: delete sample endpoint
// app.use("/users", usersRouter);

app.listen(SERVER_PORT, () => {
  console.info(`Server listening on ${SERVER_PORT}`);
});
