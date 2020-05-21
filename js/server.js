// A Basic Node server

const http = require('http');

const PORT = 1234;

const server = http.createServer(function (req, res) {
    res.setHeader('Content-type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200); // status code HTTP 200 / OK

    let dataObj = { "id": 1, "name": "ahmed", "age": 30 };
    let data = JSON.stringify(dataObj);
    res.end(data);
});

server.listen(PORT, function () {
    console.log("Listening on port 1234");
})