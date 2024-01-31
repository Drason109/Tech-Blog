const router = require('express').Router();
const { User, Blog, Comment  } = require('../../models');
const withAuth = require('../../utils/auth');


// create a new post ('/api/post')
router.post('/', withAuth, async (req, res) => {
   Blog.create({
   ...req.body,
    userId: req.session.user.id
   }).then(newPost => {
      console.log("This is the new post", newPost);
    res.status(200).json(newPost);
   }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "an error occured", err});
   });
});

// edit post ('/api/post/:id')
router.put('/:id', withAuth, async (req, res) => {
   Blog.update({
    where: {
      id: req.params.id
    }},
    {
      title: req.body.title,
      content: req.body.content
    }
   ).then(updatedPost => {
      if(!updatedPost){
         res.status(404).json({message: 'this id has no post'})
      }
    res.status(200).json(updatedPost);
   }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "an error occured", err});
   });
});

// delete post ('/api/post/:id')
router.delete('/:id', withAuth, async (req, res) => {
   Blog.destroy({
    where: {
      id: req.params.id,
      userId: req.session.userId
    }
   }).then(delePost => {
    res.status(200).json(delePost);
   }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "an error occured", err});
   });
});

module.exports = router;