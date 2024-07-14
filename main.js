import express from 'express';
import tsToJs from './tsToJs.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(tsToJs('public')); // ts->js変換ミドルウェア
app.use(express.static('public'));

app.listen(3000, () => console.log(' listening on port 3000.'));
