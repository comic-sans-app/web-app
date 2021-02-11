const router = require('express').Router();
const User = require('../db/models/user');
const Page = require('../db/models/page');
module.exports = router;

// POST /auth/login
router.post('/login', async (req, res, next) => {
  // we will be sending in a userName and a password on req.body
  try {
    const user = await User.findOne({ where: { userName: req.body.userName } });
    if (!user) {
      console.log('No such user found:', req.body.userName);
      res.status(401).send('Wrong username and/or password');
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.userName);
      res.status(401).send('Wrong username and/or password');
    } else {
      req.login(user, (err) => (err ? next(err) : res.json(user)));
      // this sets user on req object, so we can check to see what req.user is
    }
  } catch (err) {
    next(err);
  }
});

// POST /auth/signup
router.post('/signup', async (req, res, next) => {
  // sending in userName and password on req.body
  try {
    console.log('signing up!');
    const user = await User.create(req.body);
    const newCanvas = await Page.create({
      canvasId: user.userName,
    });
    await user.setPage(newCanvas);

    const userIncludingPage = await User.findOne({
      where: {
        userName: req.body.userName,
      },
      include: Page,
    });
    req.login(userIncludingPage, (err) =>
      err ? next(err) : res.json(userIncludingPage)
    );
    // setting user on req object ^^^
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

// POST /auth/logout
router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

// GET /auth/me
router.get('/me', (req, res) => {
  // this should send the current logged in user (a way of checking if there is a user logged in!)
  res.json(req.user);
  // back in the store, we check to see if this route has sent anything back (res.data will be null if there
  // is no user on req) and if this sends nothing back, we set the defaultUser on state, which indicates we need
  // the user to either sign up or log in (display modal)
});
