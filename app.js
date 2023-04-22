const express = require('express')
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express()
require('dotenv').config()
const mongoose = require("mongoose");
mongoose.connect(
    "mongodb+srv://dhairya:" +
    process.env.mongoPW +
    "@cluster0.vpuxf.mongodb.net/?retryWrites=true&w=majority"
);


const port = process.env.PORT | 3000
const user = require('./routes/user')
const conv = require('./routes/conv')
const authCheck = require('./middlewares/authCheck')
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    if (req.method === "OPTIONS") {
        res.header("Access-Controll-Allow-Methods", "PUT,POST,PATCH,DELETE");
        return res.json({});
    }

    next();
});

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/user', user)
app.use('/conv', authCheck, conv)
// app.use('/train',train)
// app.use('/book',book) 

app.listen(port, () => console.log(`listening on port ${port}`))