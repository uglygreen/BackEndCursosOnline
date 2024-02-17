export default {
    api_resource_categorie: (categorie) => {
        return {
            '_id': categorie._id,
            'title': categorie.title,
            'state': categorie.state,
            'imagen': categorie.imagen ? process.env.URL_BACKEND+"/api/categorias/imagen-categoria/"+categorie.imagen : null,
        }
    }
}