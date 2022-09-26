const { Router } = require("express");
const accessController = require("../controllers/accessController");

const accessRouter = Router();
const controller = new accessController();

accessRouter.get("/", controller.create);

module.exports = accessRouter;