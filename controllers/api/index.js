const router = require('express').Router();

const userRoutes = require('./user-route');
const blogRoutes = require('./post-route');
const commentRoutes = require('./comment-routes');

router.use('/user', userRoutes);
router.use('/blog', blogRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
