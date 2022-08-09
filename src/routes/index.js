const { Router } = require('express');
const userRoutes = require('./users.routes');
const notesRoutes = require('./notes.routes');
const tagsRoutes = require('./tags.routes');
const router = Router()

router.use('/users', userRoutes);
router.use("/notes", notesRoutes);
router.use("/tags", tagsRoutes);

module.exports = router;
