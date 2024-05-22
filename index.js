import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import Contacts from './routes/Contacts.js'

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/contacts', Contacts);

//Connection to MongoDB through mongooose
const conString = 'mongodb://localhost:27017/mydatabase';
const connectToDB = async() => {
    try {
        await mongoose.connect(conString);
        console.log('Connected to MongoDB')
    } 
    catch(error) {
        console.log(error);
        process.exit(1);
    }
}

connectToDB();

const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}/api/contacts`));