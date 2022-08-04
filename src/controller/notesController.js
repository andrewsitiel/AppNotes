const knex = require("../database/knex/index");

class NotesController {
  async create (req, res) {
    const {title, description, tags, links} = req.body;
    const {user_id} = req.params;
    
    const note_id = await knex("notes").insert({
      title,
      description,
      user_id
    });

    const noteLinks = links.map(link => {
      return{
        url: link,
        note_id
      }
    });

    const noteTags = tags.map(tag => {
      return{
        name: tag,
        note_id,
        user_id
      }
    });

    await knex("tags").insert(noteTags);
    await knex("links").insert(noteLinks);

    res.status(201).json()
  }
}

module.exports = NotesController;