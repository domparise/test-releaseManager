var app = require('express')();

app.get('/', function (req, res) {
    res.send('gangstar')
})

app.get('/test', function (req, res) {
    res.send('swag')
})

var httpServer = require('http').createServer(app)

httpServer.listen(3005)

if (process.env.NODE_ENV !== 'dev') {
    process.on('uncaughtException', function (err) {
        console.dir(err)
        console.trace(err)
    })
}