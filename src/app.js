import express from 'express';
import mongoose from 'mongoose';
import graphqlHTTP from 'express-graphql';

const app = express();

mongoose.connect('mongodb://mongo:27017/airbnbClone');

const server = app.listen(8080, () => {
    console.log('Listening at port', server.address().port);
});