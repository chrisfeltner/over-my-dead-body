var http = require('http');

var server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-type" : "text/plain"})
    res.end("Hello World!!!\n")
});

server.listen(8080, () => {
    console.log("Server running on port 8080")
});