import models from "../models"
import resource from "../resource";


export default {
    register: async(req, res) => {
        try {

            var VALID = await models.Permiso.findOne({folio: req.body.folio});

            if(VALID){
               return res.status(403).json({
                    message_text: 'Ya un PT con ese folio'
                });
            }
            var newPermiso = await models.Permiso.create(req.body)

            res.status(200).json({
                alarma: newPermiso
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

            var permisoList = await models.Permiso.find({
                $or: [
                    {"folio": new RegExp(search, 'i')}
                ]
            }).sort({"createdAt": -1});

            // alarmaList = await alarmaList.map((categoria) => {
            //     return resource.Categoria.api_resource_categorie(categoria)
            // });

            res.status(200).json({
                permiso: permisoList
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
            var VALID = await models.Permiso.findOne({folio: req.body.folio, _id: {$ne: req.body._id}});

            if(VALID){
                 res.status(202).json({
                    message_text: 'El folio ya existe'
                });
            }

            var EditPermiso = await models.Permiso.findByIdAndUpdate({_id: req.body._id}, req.body);

            var NEditPermiso = await models.Permiso.findById({_id: EditPermiso._id});

            res.status(200).json({
                permiso: NEditPermiso
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
            var permiso =  await models.Permiso.findByIdAndDelete({_id: req.params["id"]});

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