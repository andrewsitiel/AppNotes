const {Router} = require("express");

const tagsRouter = Router()

const tagsController = require("../controller/tagsController")
const controller = new tagsController()

tagsRouter.get("/:user_id", controller.index)

module.exports = tagsRouter;