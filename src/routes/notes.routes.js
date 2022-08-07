const { Router } = require('express');
const NotesController = require("../controller/notesController");

const controller = new NotesController()
const notesRoutes = Router()

notesRoutes.get("/", controller.index)
notesRoutes.get("/:note_id", controller.show);
notesRoutes.post("/:user_id", controller.create);
notesRoutes.put("/:id", controller.update);
notesRoutes.delete("/:id", controller.delete);

module.exports= notesRoutes;