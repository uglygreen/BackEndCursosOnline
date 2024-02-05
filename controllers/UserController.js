import models from '../models'

export default {
    register: async(req, res) => {
        try {
            //ENCRIPTACION DE CONTRASEÑA
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
    }
}