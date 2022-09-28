const knex = require("../database/knex/index");

class NotesController {

  async index(request, response) {
    const { title, tags } = request.query;
    const user_id = request.user.id;

    let notesList;
  
    if(!title && !tags) {
      notesList = await knex("notes")
      .where({user_id})
      .select("title", "description", "created_at", "updated_at")
      
      return response.status(200).json(notesList)
    }

    if(!title) {
      const filteredTags = tags.split(",").map(tag => tag.trim());
      
      notesList = await knex("tags")
        .select([
          "notes.id",
          "notes.title",
          "notes.user_id"
        ])
        .where("notes.user_id", user_id)
        .whereIn("name", filteredTags)
        .innerJoin("notes","notes.id","tags.note_id");

        const userTags = await knex("tags").where({user_id}).select("name","note_id");
        
        const notesWithTags = notesList.map( note => {
            const noteTags = userTags.filter(tag => tag.note_id == note.id)

            return{
              ...note,
              tag: noteTags
            }
          })

        return response.status(200).json(notesWithTags)
    }

    if(tags){
      const filteredTags = tags.split(",").map(tag => tag.trim());
      
      notesList = await knex("tags")
        .select([
          "notes.id",
          "notes.title",
          "notes.user_id"
        ])
        .where("notes.user_id", user_id)
        .whereLike("notes.title", `%${title}%`)
        .whereIn("name", filteredTags)
        .innerJoin("notes","notes.id","tags.note_id");

        const userTags = await knex("tags").where({user_id}).select("name","note_id");
        const notesWithTags = notesList.map( note => {
            const noteTags = userTags.filter(tag => tag.note_id == note.id)

            return{
              ...note,
              tag: noteTags
            }
          })
          return response.status(200).json(notesWithTags)
    } else {
        notesList = await knex("notes")
        .where({user_id})
        .whereLike("title", `%${title}%`)
        .select("title", "description", "created_at", "updated_at")
        .orderBy("created_at");
      };

      return response.status(200).json(notesList)

  }

  async create (request, response) {
    const {title, description, tags, links} = request.body;
    const user_id = request.user.id;

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

    response.status(201).json()
  };
  
  async show (request, response){
    const { note_id } = request.params;

    const note = await knex("notes").where("id", note_id).first();
    const tags = await knex("tags").where({note_id}).select("name").orderBy("name");
    const links = await knex("links").where({note_id}).select("url").orderBy("created_at");

    const tagNames = tags.map(tag => tag.name);
    const linksUrl = links.map(link => link.url);

    if(!note){
      return response.status(204);
    }

    return response.status(200).json({
      ...note,
      tagNames,
      linksUrl
    });
  };

  async update (request,response) {
    const { id } = request.params
    const { title, description } = request.body
    const updated_at = knex.fn.now()
    
    const note = await knex("notes").where({id})
    .update({ title, description, updated_at });

    return response.status(200).json("Nota Atualizada!!!");
  }

  async delete (request, response) {
    const { id } = request.params;

    await knex("notes").where({id}).delete();

    return response.status(200).json("Nota deletada.");
  }
}


module.exports = NotesController;