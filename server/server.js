const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const app = express();
const PORT = process.env.PORT || 8080;
module.exports = app;
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({ db });
const passport = require('passport');

// This is a global Mocha hook, used for resource cleanup.
// Otherwise, Mocha v4+ never quits after tests.
if (process.env.NODE_ENV === 'test') {
  after('close the session store', () => sessionStore.stopExpiringSessions());
}

// passport registration
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'));

  // body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'Zuko Trixie Diego',
      store: sessionStore,
      // resave: if you have not changed anything, don't resave (recommended)
      resave: false,
      saveUninitialized: true,
      // possible additions: cookie: {secure: true}
    })
  );

  app.use((req, res, next) => {
    console.log('SESSION --> ', req.session.cookie);
    next();
  });

  app.use(passport.initialize());
  app.use(passport.session());

  // auth and api routes
  app.use('/auth', require('./auth'));
  app.use('/api', require('./api'));

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'client/public')));

  //cors middleware
  app.use(cors());

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  // sends index.html
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'client/public/index.html'));
  });

  // test route for server/client connection
  app.get('/ping', function (req, res) {
    console.log('pingidy pong');
    return res.send('pong');
  });

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(
    PORT,
    () => console.log(`Dev server started on ${PORT}`),
    console.log(`http://localhost:${PORT}`)
  );
};

const syncDb = () => db.sync();

async function bootApp() {
  //passport-Oauth:
  await sessionStore.sync();
  await syncDb();
  await createApp();
  await startListening();
}

// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec

if (require.main === module) {
  bootApp();
} else {
  createApp();
}
