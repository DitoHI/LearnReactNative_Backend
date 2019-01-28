import express from 'express';
import mongoose from 'mongoose';
import graphqlHTTP from 'express-graphql';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import schema from '../graphql';
import {facebook} from './config';

// private credential
import { config } from './privateConfig';

const transformFacebookProfile = (profile) => ({
    name: profile.displayName,
    avatar: profile.image.url,
});

passport.use(new FacebookStrategy(facebook,
    async (accessToken, refreshToken, profile, done) => {
        done(null, transformFacebookProfile(profile._json));
    }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const app = express();

app.use(passport.initialize());
app.use(passport.session());
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/auth/facebook'}),
    (req, res) => res.redirect('AirbnbReactNativeClone://login?user=' + JSON.stringify(req.user))
);

app.get('/', (req, res) => {
    res.json({ message: 'It works!' });
});

app.use('/graphql', graphqlHTTP(req => ({
    schema,
    pretty: true,
    graphiql: true
})));

const MONGODB_URI = config.MONGODB_URI;

mongoose.connect(MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected at link', MONGODB_URI);
});

mongoose.connection.on('error', (err) => {
    console.log(err.message);
});

var server_port = process.env.PORT || 8080;
var server_host = process.env.HOST || '0.0.0.0';

const server = app.listen(server_port, server_host, () => {
    console.log('Listening at port', server.address().port);
});