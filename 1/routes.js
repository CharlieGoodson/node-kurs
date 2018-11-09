const fs = require('fs')

const reqHandler = (req, res) => {
    const url = req.url
    const method = req.method
    
    // for '/' request
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.statusCode = 200

        res.write('<!DOCTYPE html>')
        res.write('<head><title>Document</title></head>')
        res.write('<body><h1>This is the Start page</h1>')
        res.write('<form action="/message" method="POST"><input type="text" name="message">')
        res.write('<button type="submit">Sent</button></form>')
        res.write('</body></html>')
        return res.end()
    }

    // for '/message' request and method POST
    if (url === '/message' && method === 'POST') {
        const body = []

        req.on('data', (chunk) => {
            body.push(chunk)
        })

        return req.on('end', () => {
            const bodyParsed = Buffer.concat(body).toString()
            const message = bodyParsed.split('=')[1]
            fs.writeFile('data.txt', message, err => {
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            })
        })

        // return req.on('end', () => {
        //     const bodyParsed = Buffer.concat(body).toString()
        //     const message = bodyParsed.split('=')[1]
        //     fs.writeFileSync('data.txt', message)
        //     res.statusCode = 302
        //     res.setHeader('Location', '/')
        //     return res.end()
        // })

        // req.on('end', () => {
        //     const bodyParsed = Buffer.concat(body).toString()
        //     const message = bodyParsed.split('=')[1]
        //     fs.writeFileSync('data.txt', message)
        // })
        // res.statusCode = 302
        // res.setHeader('Location', '/')
        // return res.end()
    }

    // for any other requests
    res.setHeader('Content-Type', 'text/html')
    res.statusCode = 200
    res.write('<!DOCTYPE html>')
    res.write('<head><title>Document</title></head>')
    res.write('<body><h1>This is default page</h1></body></html>')
    res.end()
}

module.exports = reqHandler