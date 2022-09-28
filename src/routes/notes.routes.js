const { Router } = require('express');
const NotesController = require("../controllers/notesController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const controller = new NotesController();
const notesRoutes = Router();

notesRoutes.use(ensureAuthenticated)

notesRoutes.get("/", controller.index)
notesRoutes.get("/:note_id", controller.show);
notesRoutes.post("/", controller.create);
notesRoutes.put("/:id", controller.update);
notesRoutes.delete("/:id", controller.delete);

module.exports= notesRoutes;