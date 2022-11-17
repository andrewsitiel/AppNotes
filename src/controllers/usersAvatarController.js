const knex = require("../database/knex");
const appError = require("../utils/appError");
const DiskStorage = require("../providers/diskstorage");

class UsersAvatarController{
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFilename = request.file.filename;
    
    const diskStorage = new DiskStorage()
    const user = await knex("users").where({id: user_id}).first();

    if(!user) {
      throw new appError("Função somente disponível para usuários autenticados.", 401)
    }
    
    if(user.avatar) {
      await diskStorage.deleteFile(user.avatar)
    }

    await diskStorage.saveFile(avatarFilename)
    await knex("users").update({avatar: avatarFilename}).where({id: user_id})

    return response.json({avatarFilename})
  }
}

module.exports= UsersAvatarController;