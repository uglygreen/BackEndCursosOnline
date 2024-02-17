import models from "../models"
import resource from "../resource";


export default {
    register: async(req, res) => {
        try {

            var VALID_CATEGORIE = await models.Categoria.findOne({title: req.body.title});

            if(VALID_CATEGORIE){
                res.status(200).json({
                    message: 403,
                    message_text: 'La categoria ya existe'
                });
            }

            if(req.files && req.files.imagen){
                var img_path = req.files.imagen.path;
                var name = img_path.split("/");
                var imagen_name = name[2];
                req.body.imagen = imagen_name;
            }


            var NewCategorie = await models.Categoria.create(req.body)

            res.estatus(200).json({
                categoria: resource.Categoria.api_resource_categorie(NewCategorie) 
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Hubo un error'
            })
        }
    },
    list: async(req, res) => {
        try {
            var search = req.query.search;

            var categorieList = await models.Categoria.find({
                $or: [
                    {"title": new RegExp(search, 'i')}
                ]
            }).sort({"createdAt": -1});

            categorieList = await categorieList.map((categoria) => {
                return resource.Categoria.api_resource_categorie(categoria)
            });

            res.status(200).json({
                categoria: categorieList
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Hubo un error'
            })
        }
    },
    update: async(req, res) => {
        try {
            var VALID_CATEGORIE = await models.Categoria.findOne({title: req.body.title, _id: {$ne: req.body._id}});

            if(VALID_CATEGORIE){
                res.status(200).json({
                    message: 403,
                    message_text: 'La categoria ya existe'
                });
            }

            if(req.files && req.files.imagen){
                var img_path = req.files.imagen.path;
                var name = img_path.split("/");
                var imagen_name = name[2];
                req.body.imagen = imagen_name;
            }


            var EditCategorie = await models.Categoria.findByIdAndUpdate({_id: req.body._id}, req.body);

            var NEditCategorie = await models.Categoria.findById({_id: EditCategorie._id});

            res.estatus(200).json({
                categoria: resource.Categoria.api_resource_categorie(NEditCategorie) 
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Hubo un error'
            })
        }
    },
    delete: async(req, res) => {
        try {
            var categoria =  await models.Categoria.findByIdAndDelete({_id: req.params["id"]});

            // Validar si la categoria esta asignada a un curso no se podra eliminar

            res.status(200).json({
                message: 'La categoria se elimino correctamente'
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Hubo un error'
            })
        }
    },
    getImagen: async(req, res) => {
        try {
            var img = req.params["img"];
            if(!img){
                res.status(500).send({
                    message: 'Ocurrio un problema'
                });
            }else{
                fs.stat('./uploads/categoria/'+img, function(err) {
                    if(!err){
                        let path_img = './uploads/categoria/'+img;
                        res.status(200).sendFile(path.resolve(path_img));
                    }else{
                        let path_img = './uploads/default.jpg';
                        res.status(200).sendFile(path.resolve(path_img));   
                    }
                })
            }
            
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'Ocurrio un problema'
            });
        }
    }
}