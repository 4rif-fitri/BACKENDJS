let express = require("express")
let cors = require("cors")
let mysql = require("mysql2")
let port = 3200

let usersEndpoint = require("./routes/users")

let app = express()
app.use(cors())
app.use(express.json())

app.use("/",usersEndpoint)

app.listen(port, () => {
	console.log(`server on port ${port}`)
});
