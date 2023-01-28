
// Configuración con ES6
import express from 'express';
import path from 'path';
import hbs from 'hbs';
import nodemailer from 'nodemailer';
import morgan from 'morgan';
import 'dotenv/config';
import {fileURLToPath} from 'url';
//import './db/conexion.js';
import { router } from './router/homeRouter.js'

const app = express();
const PORT = process.env.PORT || 8080;

//__dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename);
console.log(__dirname);

//Middelware
app.use(morgan('common')); //dev common combined
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//Rutas
app.use(router)

//Configuración de Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.listen(PORT, () => {
    console.log(`Aplicación activa y trabajando en el Puerto ${PORT}`);
});

//En caso de error, me avisa
app.on('Error', (err) => {
    console.log(`Tenemos un error en el Espacio`);
})