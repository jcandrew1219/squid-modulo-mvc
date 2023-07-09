const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//get all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in,
      username: req.session.username,
      user_id: req.session.user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get one post
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {id: req.params.id},
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ],
    });

    if (postData) {
      // Serialize data
      const post = postData.get({ plain: true });
      console.log(post);
      res.render('single-post', {
        post,
        logged_in: req.session.logged_in,
        username: req.session.username,
        user_id: req.session.user_id
      });
    } else {
      res.status(404).json({message: "No post found with requested id."});
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', async (req, res) => {
  res.render('signup');
})

module.exports = router;