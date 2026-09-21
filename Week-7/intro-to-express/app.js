// imports express dependency into our file (from our project)
const express = require("express")
// invokes express function so we can use its builtin methods
const app = express()

const PORT = 4000
// home address or loopback address
const HOST = "127.0.0.1"
// ip + port == socket

app.listen(PORT, HOST, () => {
	console.log(`server is running on ${HOST}:${PORT}`)
})