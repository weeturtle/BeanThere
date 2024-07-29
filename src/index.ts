import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routers/auth";
import cafeRouter from "./routers/cafes";
import reviewRouter from "./routers/reviews";
import friendRouter from "./routers/friends";
import authRouter from "./routers/auth";
import { PORT, AUTH_URL } from "./util/envs";

const app = Express();

if (!AUTH_URL) {
  console.error("AUTH_URL is not defined");
  process.exit(1);
}

if (!PORT) {
  console.error("API_PORT is not definde");
  process.exit(1);
}

app.use(bodyParser.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/cafe", cafeRouter);
app.use("/review", reviewRouter);
app.use("/friend", friendRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
