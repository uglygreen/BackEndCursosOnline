import models from '../models'
import bycrpt from 'bcryptjs'
import token from '../service/token';
import resource from '../resource'

import fs from 'fs'
import path from 'path'

export default {
    register: async(req, res) => {

        try {
            const VALID_USER = await models.User.findOne({ email: req.body.email});

            if(VALID_USER){
                res.status(200).json({
                    message: 403,
                    message_text: "El usuario ya existe"
                });

            }
            //ENCRIPTACION DE CONTRASEÑA
            req.body.password = await bycrpt.hash(req.body.password, 10);
            const User = await models.User.create(req.body);

            res.status(200).json({
                user: User,
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: "Ocurrio un problema"
            });
        }
    },
    login: async(req, res) => {
        try {
            // email y password
            // req.body.email y req.body.password
            const user = await models.User.findOne({
                email: req.body.email,
                state: 1,
            });
            if(user){
                //COmparar las contraseñas
                let compare = await bycrpt.compare(req.body.password, user.password);
                if(compare){
                    //Usuario existente y activo
                    let tokenT = await token.encode( user._id, user.rol, user.email);

                    const USER_BODY = {
                        token: tokenT,
                        user: {
                            name: user.name,
                            surname: user.surname,
                            email: user.email,
                            //avatar: user.avatar,

                        }
                    }
                    res.status(200).json({
                        USER: USER_BODY
                    });
                }else{
                    res.status(500).send({
                        message: 'suario y/o contraseña incorrecta'
                    });
                }
            }else{
                res.status(500).send({
                    message: 'Usuario y/o contraseña incorrecta'
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'Hubo un error'
            });
        }
    },
    loginAdmin: async(req, res) => {
        try {
            // email y password
            // req.body.email y req.body.password
            const user = await models.User.findOne({
                email: req.body.email,
                state: 1,
                rol: 'admin'
            });
            if(user){
                //COmparar las contraseñas
                let compare = await bycrpt.compare(req.body.password, user.password);
                if(compare){
                    //Usuario existente y activo
                    let tokenT = await token.encode( user._id, user.rol, user.email);

                    const USER_BODY = {
                        token: tokenT,
                        user: {
                            name: user.name,
                            surname: user.surname,
                            email: user.email,
                            //avatar: user.avatar,

                        }
                    }
                    res.status(200).json({
                        USER: USER_BODY
                    });
                }else{
                    res.status(500).send({
                        message: 'suario y/o contraseña incorrecta'
                    });
                }
            }else{
                res.status(500).send({
                    message: 'Usuario y/o contraseña incorrecta'
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'Hubo un error'
            });
        }
    },
    register_admin: async(req, res) => {
        try {
            const VALID_USER = await models.User.findOne({ email: req.body.email});

            if(VALID_USER){
                res.status(200).json({
                    message: 403,
                    message_text: "El usuario ya existe"
                });

            }
            //ENCRIPTACION DE CONTRASEÑA
            req.body.password = await bycrpt.hash(req.body.password, 10);

            //console.log(req.files, req.files.avatar)
            if(req.files && req.files.avatar){
                var img_path = req.files.avatar.path;
                var name = img_path.split("/");
                var avatar_name = name[2];
                req.body.avatar = avatar_name;    
            }
            //console.log(req.body); 
            const User = await models.User.create(req.body);

           
            res.status(200).json({
                user: resource.User.api_resource_user(User),
            })
        } catch (error) {
            console.log(console.error);
            res.status(500).send({
                message: 'Ocurrio un problema'
            });
        }
    },
    update: async(req, res) =>{
        try {
            const VALID_USER = await models.User.findOne({ email: req.body.email, _id: {$ne : req.body._id}});

            if(VALID_USER){
                res.status(200).json({
                    message: 403,
                    message_text: "El usuario ya existe"
                });

            }

            if(req.body.password ){
                req.body.password = await bycrpt.hash(req.body.password, 10);
            }
            //ENCRIPTACION DE CONTRASEÑA
            
            // console.log("Files: ",req.files.avatar)
            if(req.files && req.files.avatar){
                var img_path = req.files.avatar.path;
                var name = img_path.split("\\");
                var avatar_name = name[2];
                req.body.avatar = avatar_name;    
               // console.log(req.body)
            }
            const User = await models.User.findByIdAndUpdate({_id: req.body._id}, req.body);
            const NUser = await models.User.findById({_id: req.body._id})
            res.status(200).json({
                message: 'El usuario se edito correctamente',
                user: resource.User.api_resource_user(NUser),
            })
        } catch (error) {
            console.log(console.error);
            res.status(500).send({
                message: 'Ocurrio un problema'
            });
        }
    },
    list: async(req, res) => {
        try {
        
            var search = req.query.search;
            var rol = req.query.rol;
            var filter = [
                {'name': new RegExp('', 'i')},
            ];
            if (search) {
                filter = [
                    {'name': new RegExp(search, 'i')},
                    {'surname': new RegExp(search, 'i')},
                    {'email': new RegExp(search, 'i')},  
                ];
            }
            if (rol) {
                if(!search){
                    filter = [];
                }
                filter.push({
                    'rol': rol
                });
            }
            let USERS = await models.User.find({
                $or : filter,
                "rol": { $in: ["admin","instructor"]}
            }).sort({'createdAt': -1});
             
                USERS = USERS.map((user) => {
                    return resource.User.api_resource_user(user);
                });

            res.status(200).json({
                users: USERS,
            });

        } catch (error) {
            console.log(console.error);
            res.status(500).send({
                message: 'Ocurrio un problema',
            });
        }
    },
    remove: async(req, res) => {
        try {
            let _id = req.params["id"];

            const user =  await models.User.findByIdAndDelete({_id: _id});
            res.status(200).json({
                message: 'El usuario se elimino correctamente'
            })
        } catch (error) {
            console.log(console.error);
            res.status(500).send({
                message: 'Ocurrio un problema'
            });
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
                fs.stat('./uploads/user/'+img, function(err) {
                    if(!err){
                        let path_img = './uploads/user/'+img;
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