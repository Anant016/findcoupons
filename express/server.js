'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();

const firebase = require("firebase");
firebase.initializeApp({
  apiKey: "AIzaSyAJ1P9LWH8Lol1XMIExrEzC8VEHRY2Zpv4",
  authDomain: "referral-e242d.firebaseapp.com",
  databaseURL: "https://referral-e242d.firebaseio.com",
  projectId: "referral-e242d",
  storageBucket: "referral-e242d.appspot.com",
  messagingSenderId: "765488949298",
  appId: "1:765488949298:web:174303a50cb069a8e4f42b",
  measurementId: "G-G86PQZ1LQD",
});
const db = firebase.firestore();

router.get("/all", (req, res) => {
  let daata = [];
  let Referrals = db.collection("referrals");
  Referrals.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      daata.push(doc.data());
    });
    res.send(daata);
  });
});
// router.get('/', (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.write('<h1>Hello from Express.js!</h1>');
//   res.end();
// });

router.get('/another', (req, res) =>{
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
// router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(express.static("client/build"));
app.use("*", express.static("client/build"));
router.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
