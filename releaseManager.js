/*
# iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 85 -j DNAT --to 107.170.185.242:3005
# iptables -A FORWARD -p tcp -d 107.170.185.242 --dport 3005 -j ACCEPT
*/

var manager = require('express')()
var child_process = require('child_process')

manager.use(require('body-parser').json())

var version = '2.2.0'
var lastUpdate = new Date()
var author = ''

var server = child_process.spawn('node',['src/app'])

manager.post('/git/release', function (req, res) {
    if (req.header('X-Github-Event') && req.header('X-Github-Event') === 'release') {
        version = req.body.release.tag_name
        console.log('release '+version+' received',(new Date()))
        server.kill()
        child_process.exec('git pull', function (err) {
            if (err) console.log(err)
            server = child_process.spawn('node',['src/app'])
            lastUpdate = new Date()
            author = req.body.release.author.login
            console.log('update complete')
        })
    }
    res.send(200)
})

manager.get('/info', function (res,res) {
    res.send({version:version,lastUpdate:lastUpdate,author:author})
})

manager.listen(4005, function () {
    console.log('manager online port 4005')
})