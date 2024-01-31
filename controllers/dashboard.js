const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');


// User's all posts ('/dashboard')
router.get('/', withAuth, (req, res) => {
    User.findByPk({
      where: {
        userId: req.session.userId,
      },
      attributes: ['id', 'title', 'content', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment', 'postId', 'userId', 'created_at'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    })
      .then(dbPostData => {
        const posts = dbPostData.get({ plain: true });
        res.render('dashboard', { posts, loggedIn: true, username: req.session.username,});       
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/", (req, res) => {
  Post.findAll({
    where: {userId: req.session.userId},
    attributes: ['id', 'title', 'content', 'created_at'],
    include: [{
      model: User,
      attributes: ['username'],
    },
    {
      model: User,
      attributes: ['username']
    },
  ]
  })
  .then((postData) => {
  const posts = postData.map((post) => post.get({plain: true}));
  res.render('dashboard', {posts, loggedIn: true, username: req.session.username});
}).catch((err) => {
  console.log(err);
  res.status(500).json(err);
});
});

// Get one post to edit ('dashboard/edit/:id')
router.get('/blogs/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'content', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      {
        model: Comment,
        attributes: ['id', 'comment', 'postId', 'userId', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'This id has no post.' });
        return;
      }
      const post = dbPostData.get({ plain: true });
      res.render('dashboard', { post, loggedIn: true, username: req.session.username});         
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/new', withAuth,(req, res) => {
  res.render('new-post', {username: req.session.username});
})

module.exports = router; 