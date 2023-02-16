const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    console.log(req.body)
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});


router.put('/:id', withAuth, async (req, res) => {
  console.log('req Body: ', req.body)
  try {
    const updatedComment = await Comment.update({
      ...req.body,
      user_id: req.session.user_id,
    }, { where: { id: req.params.id } });

    res.status(200).json(updatedComment);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});


router.delete('/:id', withAuth, async (req, res) => {
    try {
      const targetComment = await Comment.findByPk(req.params.id);
      if(targetComment.user_id == req.session.user_id){
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
  
      res.status(200).json(commentData);
    }
  }
     catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  });

  module.exports = router;