const { Router } = require("express");
const acessController = require("../controllers/acessController");

const acessRouter = Router();
const controller = new acessController();

acessRouter.get("/", controller.create);

module.exports = acessRouter;