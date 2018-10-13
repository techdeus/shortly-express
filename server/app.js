const express = require('express');
const path = require('path');
const utils = require('./lib/hashUtils');
const partials = require('express-partials');
const bodyParser = require('body-parser');
const Auth = require('./middleware/auth');
const models = require('./models');
// const sessions = require('.//session')
// const User = require('./models/user');
const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(partials());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));


// console.log({User})

// get Link Creation Page
app.get('/create', 
(req, res) => {
  res.render('index');
});

// get the links page
app.get('/links', 
(req, res, next) => {
  models.Links.getAll()
    .then(links => {
      res.status(200).send(links);
    })
    .error(error => {
      res.status(500).send(error);
    });
});

// post a new link page
app.post('/links', 
(req, res, next) => {
  var url = req.body.url;
  if (!models.Links.isValidUrl(url)) {
    // send back a 404 if link is not valid
    return res.sendStatus(404);
  }

  return models.Links.get({ url })
    .then(link => {
      if (link) {
        throw link;
      }
      return models.Links.getUrlTitle(url);
    })
    .then(title => {
      return models.Links.create({
        url: url,
        title: title,
        baseUrl: req.headers.origin
      });
    })
    .then(results => {
      return models.Links.get({ id: results.insertId });
    })
    .then(link => {
      throw link;
    })
    .error(error => {
      res.status(500).send(error);
    })
    .catch(link => {
      res.status(200).send(link);
    });
});

/************************************************************/
// Write your authentication routes here
/************************************************************/

// get the signup page
app.get('/signup', 
  (req, res) => {
  res.render(app.get('views') + '/signup');
});

// get the login page
app.get('/login', 
  (req, res) => {
  res.render(app.get('views') + '/login');

});

// new user sign up page
app.post('/signup',
  (req, res) => {

    models.Users.create(req.body)
  
    .then(function(user) {
      res.redirect('/');

    }).error(function(error) {
      res.redirect('/signup');
    })    
});


app.get('/', 
(req, res) => {
  res.render('index');
});

app.post('/login',
  (req, res) => {
    var user = {
      username: req.body.username
    };
    // console.log(req.body)
    var typedPassword = req.body.password;
    // console.log({typedPassword})
    
    
    models.Users.get(user)
    // console.log(req.body);
    .then(function(obj) {
      if (obj) {
        var password = obj.password;
        var salt = obj.salt;
        if (models.Users.compare(typedPassword, password, salt)){
          res.redirect('/');  
        } else {
          res.redirect('/login');
        }
     
    }
      res.redirect('/login');
    }).error(function(error) {
      res.redirect('/login');
    })    
});





/************************************************************/
// Handle the code parameter route last - if all other routes fail
// assume the route is a short code and try and handle it here.
// If the short-code doesn't exist, send the user to '/'
/************************************************************/

app.get('/:code', (req, res, next) => {

  return models.Links.get({ code: req.params.code })
    .tap(link => {

      if (!link) {
        throw new Error('Link does not exist');
      }
      return models.Clicks.create({ linkId: link.id });
    })
    .tap(link => {
      return models.Links.update(link, { visits: link.visits + 1 });
    })
    .then(({ url }) => {
      res.redirect(url);
    })
    .error(error => {
      res.status(500).send(error);
    })
    .catch(() => {
      res.redirect('/');
    });
});

module.exports = app;
