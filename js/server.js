// A Basic Node server
const https = require('https');
const PORT = 1234;
function handleRequest(req, res) {
    const data = JSON.stringify({
        name: 'John Doe',
        job: 'DevOps Specialist'
    });

    const options = {
        protoco: 'https',
        hostname: 'https://app.coffeerunstore.com/',
        port: PORT,
        path: '/api/Register',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log(JSON.parse(data));
        });

    }).on("error", (err) => {
        console.log("Error: ", err.message);
    });

    req.write(data);
    req.end();


}

// create a SERVER
const server = https.createServer(handleRequest);

// run A SERVER
server.listen(PORT, function () {
    console.log("Server listening on: https://localhost:" + PORT);
})