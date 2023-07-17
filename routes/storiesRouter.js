const router = require('express').Router();
const req = require('express/lib/request');
const Story = require('../models/blog.js');

//  Authentication check middleware
const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};

router.get('/', async (req, res) => {
  try {
    const result = await Story.find().sort({ createdAt: -1 });
    console.log(req.user);
    res.render('home', {
      title: 'Home',
      stories: result,
      style: '/styles-home.css',
      user: req.user,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const story = new Story({
      title: req.body.title,
      snippet: req.body.snippet,
      body: req.body.body,
      user: req.user,
    });

    await story.save();
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
});

//  route to each story's unique page
router.get('/stories/:slug', async (req, res) => {
  try {
    const result = await Story.findOne({ slug: req.params.slug });
    res.render('story', {
      title: result.title,
      style: '/styles-story.css',
      story: result,
      user: req.user,
    });
  } catch (err) {
    console.log(err);
  }
});

// route to the create page
router.get('/create', authCheck, (req, res) => {
  res.render('create', {
    title: 'Create',
    style: '/styles-create.css',
    user: req.user,
  });
});

// route to profile page
router.get('/profile', authCheck, async (req, res) => {
  try {
    console.log('profile', req.user);
    const result = await Story.find({ user: req.user }).sort({ createdAt: -1 });
    res.render('Profile', {
        title: 'profile',
        stories: result,
        style: '/styles-home.css',
        user: req.user,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post('/profile/delete/:id', authCheck, async (req, res) => {
    try {
        const id = req.params.id
        await Story.findByIdAndDelete(id)
        const result = await Story.find({ user: req.user }).sort({ createdAt: -1 });

        res.render('Profile', {
            title: 'profile',
            stories: result,
            style: '/styles-home.css',
            user: req.user,
        });

    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
