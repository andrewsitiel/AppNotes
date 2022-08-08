const knex = require("../database/knex/index");

class TagsController {
  async index (request, response) {
    const {user_id} = request.params;


    const userTags = await knex("tags").where({user_id});

    return response.status(200).json(userTags);
  };
};

module.exports = TagsController;