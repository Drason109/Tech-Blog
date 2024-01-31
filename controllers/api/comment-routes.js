const router = require('express').Router();
const { User, Comment, Blog} = require('../../models');
const withAuth = require('../../utils/auth');

// get comments ('api/comment')
router.get('/', (req, res) => {
  Comment.findAll({})
  .then(dbComment => {
    if(dbComment.length === 0){
      res.status(404).json({message: "You have no comment."});
      return;
    };
    res.status(200).json(dbComment);
  }).catch (err => {
    res.status(500).json({msg: "an error occured",err});
  });
});

// Get all the comments from 1 post
router.get('/:id', (req, res) => {
  Comment.findAll({
    where: req.params.id,
  }).then(commentData => {
    if(commentData.length === 0) {
      res.status(404).json({message: `The id ${req.params.id} has no comment.`});
      return;
    }
      res.status(200).json(commentData);
  }).catch (err => {
      res.status(500).json({msg: "an error occured",err});
  });
});

// create comment ('/api/comment')
router.post('/', withAuth,(req, res) => {
    Comment.create({
      body: req.body,
      userId:req.session.user.id
    }).then(newComment => {
        res.status(200).json({ newComment, success: true });
    }).catch (err => {
      console.log(err);
        res.status(500).json({msg: "an error occured",err});
    })
});

router.put('/:id', withAuth,(req,res) => {
  Comment.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(newComment => {
    res.json(newComment);
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "an error occured", err});
  });
});

// delete comment ('api/comment/:id')
router.delete('/:id', withAuth,(req, res) => {
   Comment.destroy({
        where: {id: req.params.id},
      }).then(dbCommentData => {
      res.status(200).json({dbCommentData, success: true});
    }).catch (err => {
      console.log(err);
      res.status(500).json({msg: "an error occured",err});
    })
});

module.exports = router;