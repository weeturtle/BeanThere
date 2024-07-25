import bodyParser from "body-parser";
import Express from "express";
import userRouter from "./routers/userRouter";
import cafeRouter from "./routers/cafeRouter";
import reviewRouter from "./routers/reviewRouter";
import friendRouter from "./routers/friendRouter";

const app = Express();

const PORT = process.env["PORT"] || 4000;

app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/cafe", cafeRouter);
app.use("/review", reviewRouter);
app.use("/friend", friendRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
