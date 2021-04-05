const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile('./pages/SPA-1.html', { root: __dirname });
});



app.listen(port, () => console.log(`listening on port ${port}!`))