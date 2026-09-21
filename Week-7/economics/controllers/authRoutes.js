const router = require("express").Router()
const errorHandler = require("../helpers/errorHandler")

router.post("/register", (req, res) => {
	try {
		console.log(req.body)
		res.status(201).json({
			message: `${req.method} ${req.originalUrl} route`
		})
	} catch(error) {
		errorHandler(res, error)
	}
})

router.post("/login", (req, res) => {
	try {
		let keys = Object.keys(req.body)
		console.log(keys)
		res.status(200).json({
			message: `${req.method} ${req.originalUrl} route`
		})
	} catch(error) {
		errorHandler(res, error)
	}
})


module.exports = router