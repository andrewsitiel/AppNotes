const {Router} = require("express");
const tagsRouter = Router()

const tagsController = require("../controllers/tagsController")
const controller = new tagsController()

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

tagsRouter.get("/", ensureAuthenticated, controller.index)

module.exports = tagsRouter;