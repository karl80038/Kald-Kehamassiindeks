const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.listen(3000, function(){
    console.log('Server has started on Port 3000')
});

app.get("/", function(request, response){
    response.sendFile(__dirname + '/index.html');
});

app.post("/", function(request, response){
    console.log(request.body);
    let weight = Number(request.body.txt_weight);
    let length = Number(request.body.txt_length);
    let lengthtoMeters = length / 100;

    let bodymassindex = weight / (lengthtoMeters * lengthtoMeters);
    let bodymassindexShorten = bodymassindex.toFixed(2);
    let status = "Arvutusviga";
    if (bodymassindexShorten < 19)
    {
        status = "Alakaal";
    }
    if (bodymassindexShorten >= 19 & bodymassindex <= 24.9)
    {
        status = "Normaalkaal";
    }
    if (bodymassindexShorten >= 25 & bodymassindex <= 29.9)
    {
        status = "Ülekaal";
    }
    if (bodymassindexShorten >= 30)
    {
        status = "Rasvumine";
    }

    response.send(`<h1>Tulemus</h1><br><br>Pikkus: ${length}<br><br>Kaal: ${weight}<br><br>Kehamassiindeks: ${bodymassindexShorten}<br><br>Hinnang: ${status}<br><br><a href='/'>Tagasi</a>`);

});

