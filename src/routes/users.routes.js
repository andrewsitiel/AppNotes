const { Router } = require('express');

const multer = require("multer");
const uploadConfig = require("../configs/upload");

const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const usersController = require('../controllers/usersController');
const UsersAvatarController = require("../controllers/usersAvatarController");

const controller = new usersController();
const avatarController = new UsersAvatarController();
const userRoutes = Router();
const upload = multer(uploadConfig.MULTER);

userRoutes.post('/', controller.create);
userRoutes.put("/", ensureAuthenticated, controller.update);
userRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), avatarController.update);

module.exports = userRoutes;
