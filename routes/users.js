let express = require("express");
let router = express.Router()

router.get("/",(req,res)=>{
	res.json("hahah")
})

module.exports = router