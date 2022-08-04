const { Router } = require('express');
const NotesController = require("../controller/notesController");

const controller = new NotesController()
const notesRoutes = Router()

notesRoutes.use("/:user_id", controller.create);

module.exports= notesRoutes;