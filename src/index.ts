import bodyParser from "body-parser";
import Express from "express";
import loginHandler from "./handlers/loginHandler";
import SECRET from "./secret";
import verifyHandler from "./handlers/verifyHandler";
import logoutHandler from "./handlers/logoutHandler";
import signupHandler from "./handlers/signupHandler";

if (!SECRET) {
  console.error("SECRET is not defined");
  process.exit(1);
}

const app = Express();

const PORT = process.env["PORT"] || 4001;

app.use(bodyParser.json());

app.post("/login", loginHandler);
app.get("/verify", verifyHandler);
app.get("/logout", logoutHandler);
app.post("/signup", signupHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
