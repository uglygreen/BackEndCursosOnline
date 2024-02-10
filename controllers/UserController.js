import models from '../models'
import bycrpt from 'bcryptjs'
import token from '../service/token';

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
    }
}