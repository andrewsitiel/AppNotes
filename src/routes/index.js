const { Router } = require('express');
const userRoutes = require('./users.routes');
const notesRoutes = require('./notes.routes');
const router = Router()

router.use('/users', userRoutes);
router.use("/notes", notesRoutes);

module.exports = router
