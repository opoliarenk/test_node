'use strict';

require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//DB connection
require("./database/connection");

//ENDPOINTs
require("./routes/routes")(app);

async function start () {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
}

start();