import mongoose, {Schema} from "mongoose";

const CategoriaSchema = new Schema({
    title: {
        type: String,
        maxlength: 250,
        required: true
    },
    imagen: {
        type: String,
        maxlength: 250,
        required: true
    },
    state: {
        type: Number,
        maxlength: 1,
        default: 1 // 1 Activo y 2 inactivo
    },
    
},
{
    timestamps: true
});

const Categoria = mongoose.model("categoria", CategoriaSchema);
export default Categoria;