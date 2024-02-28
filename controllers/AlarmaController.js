import models from "../models"
import resource from "../resource";


export default {
    register: async(req, res) => {
        try {
            // console.log(req.body);
            var existingAlarma  = await models.Alarma.findOne({numero: req.body.numero});

            if(existingAlarma ){
                return res.status(403).json({
                    message_text: 'Ya exite Alarma con ese numero aginado'
                });
            }
            var newAlarma = await models.Alarma.create(req.body)

            res.status(200).json({
                alarma: newAlarma
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

            var alarmaList = await models.Alarma.find().sort({"createdAt": -1});

            // alarmaList = await alarmaList.map((categoria) => {
            //     return resource.Categoria.api_resource_categorie(categoria)
            // });

            res.status(200).json({
                alarma: alarmaList
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
            var existingAlarma = await models.Alarma.findOne({numero: req.body.numero, _id: {$ne: req.body._id}});

            if(existingAlarma){
             res.status(200).json({
                    message_text: 'La Alarma ya existe'
                });
            }

            var EditAlarma = await models.Alarma.findByIdAndUpdate({_id: req.body._id}, req.body);

            var NEditAlarma = await models.Alarma.findById({_id: EditAlarma._id});

            res.status(200).json({
                alarma: NEditAlarma
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
            let _id = req.params["id"];
            
            var alarma =  await models.Alarma.findByIdAndDelete({_id: _id});

            // Validar si la categoria esta asignada a un curso no se podra eliminar

            res.status(200).json({
                message: 'La alarma se elimino correctamente'
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