const router = require("express").Router()
const errorHandler = require("../helpers/errorHandler")

let db = []

router.post("/new", (req, res) => {
	try { 
		console.log(req.body)
		db.push(req.body)
		res.status(201).json({
			message: `${req.method} ${req.originalUrl} route`,
			db
		})
	} catch(error) {
		errorHandler(res, error)
	}
})

module.exports = router