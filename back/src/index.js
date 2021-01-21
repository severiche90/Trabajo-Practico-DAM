/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAM - CEIoT - Project Structure
 * Brief: Main backend file.
=============================================================================*/

//=======[ Settings, Imports & Data ]==========================================


var express = require('express');
var app = express();
var puerto = 3000;
var cors = require('cors');
var dispositivoRoute = require('./routes/dispositivo');
var meidicionRoute = require('./routes/medicion');
var riegoRoute = require('./routes/riego');
var valvulaRoute = require('./routes/electrovalvula');
app.use(express.json());

//=======[ Main module code ]==================================================

var corsOptions = {origin: '*', optionSuccessStatus: "200"};

app.use(cors(corsOptions));

app.use('/api/dispositivo', dispositivoRoute);

app.use('/api/medicion', meidicionRoute);

app.use('/api/ev', valvulaRoute);

app.use('/api/riego', riegoRoute);

app.listen(puerto, function(req, res) {
    
    console.log("API funcionando");
});

//=======[ End of file ]=======================================================
