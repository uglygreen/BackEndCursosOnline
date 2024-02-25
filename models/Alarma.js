import mongoose, {Schema} from "mongoose";

const AlarmaSchema = new Schema({
    numero: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        maxlength: 250,
        required: true
    }
    
},
{
    timestamps: true
});

const Alarma = mongoose.model("alarmas", AlarmaSchema);
export default Alarma;