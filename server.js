let express = require("express");
let cors = require("cors");
// let mysql = require("mysql2");
let port = 3200;

const sequelize = require("./db.config");
sequelize.sync().then(() => console.log("ready"));

//thing
let usersEndpoint = require("./routes/users");
let kehadiran = require("./routes/kehadiran");

let app = express();
app.use(cors());
app.use(express.json());

//thing
app.use("/users", usersEndpoint);
app.use("/kehadiran", kehadiran);
//       /users/usersEndpoint

app.listen(port, () => {
  console.log(`server on port ${port}`);
});
