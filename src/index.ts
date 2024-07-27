import Express from "express";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import cafeRouter from "./routers/cafeRouter";
import reviewRouter from "./routers/reviewRouter";
import friendRouter from "./routers/friendRouter";
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
app.use("/user", userRouter);
app.use("/cafe", cafeRouter);
app.use("/review", reviewRouter);
app.use("/friend", friendRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
