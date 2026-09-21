function errorHandler(res, error) {
		console.error(error)
		res.status(500).json({
			message: "Internal Error Occured"
		})
}

module.exports = errorHandler