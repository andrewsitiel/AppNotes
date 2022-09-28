const { Router } = require('express');
const userRoutes = require('./users.routes');
const notesRoutes = require('./notes.routes');
const tagsRoutes = require('./tags.routes');
const accessRoutes = require('./access.routes');
const router = Router()

router.use('/users', userRoutes);
router.use("/notes", notesRoutes);
router.use("/tags", tagsRoutes);
router.use("/access", accessRoutes);

module.exports = router;
