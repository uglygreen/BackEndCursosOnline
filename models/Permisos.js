import mongoose, {Schema} from "mongoose";
import Alarma from "./Alarma";
import Ubicacion from "./Ubicacion";
import User from "./User";

const PermisoSchema = new Schema({
    folio:  {
        type: String,
        maxlength: 250,
        required: true
    },
    estatus:  {
        type: String,
        maxlength: 250,
        required: true
    },
    fecha_creacion: {
        type: Date,
    },
    alarma:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alarma',
        required: true
    },
    WTG:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ubicacion',
        required: true
    },
    descripcion_actividad: {
        type: String,
        maxlength: 250,
    },
    GM_VTS: {
        type: String,
    },
    solicitante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    operador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    fecha_fin_PT: {
        type: Date,
        required: true
    },
    fecha_modificacion: {
        type: Date,
    },
    comentarios: {
        type: String,
        maxlength: 250,
    },
    HH: {
        type: Number,
    },
    HM: {
        type: Number,
    },
    FPT: {
        type: String,
        maxlength: 250
    },
    JSA: {
        type: String,
        maxlength: 250
    }
    
},
{
    timestamps: true
});

const Permiso = mongoose.model("permisos", PermisoSchema);
export default Permiso;