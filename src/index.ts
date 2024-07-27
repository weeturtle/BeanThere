import bodyParser from "body-parser";
import Express from "express";
import cors from "cors";
import SECRET from "./secret";
import loginHandler from "./handlers/loginHandler";
import verifyHandler from "./handlers/verifyHandler";
import logoutHandler from "./handlers/logoutHandler";
import signupHandler from "./handlers/signupHandler";
import deleteHandler from "./handlers/deleteHandler";

if (!SECRET) {
  console.error("SECRET is not defined");
  process.exit(1);
}
const PORT = process.env["PORT"] || 4001;

const app = Express();

app.use(bodyParser.json());
app.use(cors());

app.post("/login", loginHandler);
app.get("/verify", verifyHandler);
app.get("/logout", logoutHandler);
app.post("/signup", signupHandler);
app.delete("/delete/:id", deleteHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
