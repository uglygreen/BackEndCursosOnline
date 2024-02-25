import mongoose, {Schema} from "mongoose";

const UbicacionSchema = new Schema({
    descripcion: {
        type: String,
        maxlength: 250,
        required: true
    }
    
},
{
    timestamps: true
});

const Ubicacion = mongoose.model("ubicacion", UbicacionSchema);
export default Ubicacion;