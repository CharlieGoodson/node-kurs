const http = require('http')
const reqHandler = require('./routes')

const server = http.createServer(reqHandler)

const port = process.env.PORT || 5000
server.listen(port, () => console.log(`Server running on port ${port}`))