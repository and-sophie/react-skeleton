const port = 3000
const express = require('express')
const app = express()

app.use('/', express.static(__dirname + '/build/'));
app.use('/*', express.static(__dirname + '/build/index.html'));

app.listen(port, (error) => {
    if (error) {
        console.error(error)
    } else {
        console.info("SERVER STARTED", port, port);
    }
});

