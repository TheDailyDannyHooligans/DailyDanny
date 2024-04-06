const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyparser = require('body-parser');

const app = express()
app.use(cors())

// Establish connection to db
dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 8080;

app.listen(PORT, async() => {
    console.log(`Server is running on http://localhost:${PORT}`);

    try {
        const con = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${con.connection.host}`);
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
})

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended:true }));

// Create routes
app.use('/', require('./routes/router'))