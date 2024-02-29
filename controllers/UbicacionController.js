import models from "../models"
import resource from "../resource";


export default {
    register: async(req, res) => {
        try {

            var VALID = await models.Ubicacion.findOne({descripcion: req.body.descripcion});

            if(VALID){
                return res.status(403).json({
                    message_text: 'Ya exite la Ubicacion'
                });
            }
            var newUbicacion = await models.Ubicacion.create(req.body)

            res.status(200).json({
                message: 'Alarma registrada correctamente',
                ubicacion: newUbicacion
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Hubo un error',
                error: error.message // Proporciona más detalles sobre el error
            })
        }
    },
    list: async(req, res) => {
        try {
            var search = req.query.search;

            var ubicacionList = await models.Ubicacion.find({
                $or: [
                    {"descripcion": new RegExp(search, 'i')}
                ]
            }).sort({"createdAt": -1});

            // alarmaList = await alarmaList.map((categoria) => {
            //     return resource.Categoria.api_resource_categorie(categoria)
            // });

            res.status(200).json({
                ubicacion: ubicacionList
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Hubo un error',
                error: error.message // Proporciona más detalles sobre el error
            })
        }
    },
    update: async(req, res) => {
        try {
            var VALID = await models.Ubicacion.findOne({descripcion: req.body.descripcion, _id: {$ne: req.body._id}});

            if(VALID){
                res.status(202).json({
                    message_text: 'La Ubicacion ya existe'
                });
            }

            var EditUbicacion = await models.Ubicacion.findByIdAndUpdate({_id: req.body._id}, req.body);

            var NEditUbicacion = await models.Ubicacion.findById({_id: EditUbicacion._id});

            res.status(200).json({
                ubicacion: NEditUbicacion
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Hubo un error',
                error: error.message // Proporciona más detalles sobre el error
            })
        }
    },
    delete: async(req, res) => {
        try {
            var ubicacion =  await models.Ubicacion.findByIdAndDelete({_id: req.params["id"]});

            // Validar si la categoria esta asignada a un curso no se podra eliminar

            res.status(200).json({
                message: 'La Ubicacion se elimino correctamente'
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Hubo un error',
                error: error.message // Proporciona más detalles sobre el error
            })
        }
    }
}