import bodyParser from "body-parser";
import Express from "express";
import cors from "cors";
import SECRET from "./secret";
import loginHandler from "./handlers/loginHandler";
import verifyHandler from "./handlers/verifyHandler";
import logoutHandler from "./handlers/logoutHandler";
import registerHandler from "./handlers/signupHandler";
import deleteHandler from "./handlers/deleteHandler";
import usersHandler from "./handlers/usersHandler";
import clearTokenHandler from "./handlers/clearTokenHandler";

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
app.post("/logout", logoutHandler);
app.post("/register", registerHandler);
app.get("/users", usersHandler);
app.delete("/delete/:id", deleteHandler);
app.post("/clearTokens", clearTokenHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
