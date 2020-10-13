const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
})
app.use(express.static('dist'))

app.listen(port, () => {
  console.log(`Litty forntend running at port ${port}`);
})