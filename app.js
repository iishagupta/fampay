const express = require('express');
const dataInfuser = require('./data-infuser');

const app = express();

dataInfuser() // call at start
setInterval(dataInfuser, 60*1000); // then call every 60 seconds

app.get('/getAll', require('./routes/getAll'));
app.get('/search', require('./routes/search'));

app.listen(8888, _ => {
    console.log(`Server is open to accepting request at port 8888`);
})

