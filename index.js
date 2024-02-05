import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose, { mongo } from 'mongoose';
import router from './router';
import * as dotenv from 'dotenv';
dotenv.config()


// Coexion a la base de datos
mongoose.Promise = global.Promise
const dbUrl = "mongodb://localhost:27017/cursos_udemy"
mongoose.connect(
    dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(mongoose => console.log("Conectado a la BD"))
.catch(err => console.log(err));

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/', router);

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log("El servidor esta corriendo en el puerto ")
})