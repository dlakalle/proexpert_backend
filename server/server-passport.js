// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: loopback-example-passport
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
// var cookieParser = require('cookie-parser');
var session = require('express-session');

// Passport configurators..
var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

/*
 * body-parser is a piece of express middleware that
 *   reads a form's input and stores it as a javascript
 *   object accessible through `req.body`
 *
 */
var bodyParser = require('body-parser');

/**
 * Flash messages for passport
 *
 * Setting the failureFlash option to true instructs Passport to flash an
 * error message using the message given by the strategy's verify callback,
 * if any. This is often the best approach, because the verify callback
 * can make the most accurate determination of why authentication failed.
 */
var flash      = require('express-flash');

// attempt to build the providers/passport config
var config = {};
try {
  config = require('../providers.json');
} catch (err) {
  console.trace(err);
  process.exit(1); // fatal
}

// -- Add your pre-processing middleware here --

// Setup the view engine (jade)
var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// boot scripts mount components like REST API
boot(app, __dirname);

// to support JSON-encoded bodies
app.middleware('parse', bodyParser.json());
// to support URL-encoded bodies
app.middleware('parse', bodyParser.urlencoded({
  extended: true,
}));

// The access token is only available after boot
app.middleware('auth', loopback.token({
  model: app.models.accessToken,
}));

// app.middleware('session:before', cookieParser(app.get('cookieSecret')));
// app.middleware('session', session({
//   secret: 'kitty',
//   saveUninitialized: true,
//   resave: true,
//   // cookie: {
//   //   httpOnly: true,
//   //   secure: true
//   // }
// }));
passportConfigurator.init();

// We need flash messages to see passport errors
app.use(flash());

passportConfigurator.setupModels({
  userModel: app.models.user,
  userIdentityModel: app.models.userIdentity,
  userCredentialModel: app.models.userCredential,
});
for (var s in config) {
  var c = config[s];
  c.session = c.session !== false;
  passportConfigurator.configureProvider(s, c);
}
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;


app.get('/signup', function(req, res, next) {
  res.render('pages/signup', {
    user: req.user,
    url: req.url,
  });
});

app.post('/signup', function(req, res, next) {
  var User = app.models.user;

  var newUser = {};
  newUser.email = req.body.email.toLowerCase();
  newUser.username = req.body.username.trim();
  newUser.password = req.body.password;

  User.create(newUser, function(err, user) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('back');
    } else {
      // Passport exposes a login() function on req (also aliased as logIn())
      // that can be used to establish a login session. This function is
      // primarily used when users sign up, during which req.login() can
      // be invoked to log in the newly registered user.
      req.login(user, function(err) {
        if (err) {
          req.flash('error', err.message);
          return res.redirect('back');
        }
        return res.redirect('/auth/account');
      });
    }
  });
});

app.get('/auth/logout', function(req, res, next) {
  req.logout();
  // res.clearCookie('access_token');
  // res.clearCookie('userId');
  res.redirect('/login');
});

app.post('/auth/valid', function(req, res, next) {
  var User = app.models.user;
  var accessToken = app.models.accessToken;

  var u;
  var t;

  res.setHeader('Content-Type', 'application/json');

  accessToken.findById(req.body.token, function(err, token){
    if(err || token === null){
      return res.send(JSON.stringify({
        auth: false,
        message: 'invalid token'
      }));
    }
    else{
      t = token;
      User.findById(req.body.userId, function(err, user){
        if(err || user === null){
          return res.send(JSON.stringify({
            auth: false,
            message: 'invalid user'
          }));
        }
        else{
          u = user;
          console.log(user.id.toString(), typeof(user.id.toString()));
          console.log(token.userId.toString(), typeof(token.userId.toString()));
          if(user.id.toString() !== token.userId.toString()){
            return res.send(JSON.stringify({
              auth: false,
              message: "token doesn't belong to user"
            }));
          }

          return res.send(JSON.stringify({
            auth: true,
            message: 'authentication successful',
            user: u
          }));
        }
      });
    }
  });

});

app.post('/user/informe', function(req, res, next) {
  var accessToken = app.models.accessToken;
  // var Informe = app.models.informe;
  
  if (!req.body.token) return res.sendStatus(401);

  accessToken.findById(req.body.token, function(err, token){
    if(err || token === null){
      return res.send(JSON.stringify({
        auth: false,
        message: 'invalid token'
      }));
    }

    var carrera = 'Ingeniería Civil en Computación';
    var sueldo = 1500000;
    var industria = 'Software y Telecomunicaciones';
    var institucion = 'Universidad de Chile';
    var anos_exp = 3;
    var cargo = 'Consultor Junior';

    return res.send(JSON.stringify({
      informe: {
        carrera: carrera,
        sueldo: sueldo,
        industria: industria,
        institucion: institucion,
        anos_exp: anos_exp,
        cargo: cargo,
        tarjetas: [
          {
            description: 'Al realizar una comparación de tu sueldo con otros ingenieros que comparten tu Carrera, Industria y Años de Experiencia, tu sueldo es $255.000 inferior que el promedio. En un ranking de 0 a 100 donde 0 es el menor y 100 es el mayor, tú estás en el lugar:',
            percent: 35,
            value: sueldo,
            iconClass: "fa-graduation-cap",
            passClass: "fa-times"
          },
          {
            description: 'Descripción de comparación',
            percent: 69,
            value: sueldo,
            iconClass: "fa-black-tie",
            passClass: "fa-check"
          },
        ],

        por_industria: {
          titulo: 'Comparación por Industria',
          desc: 'Considerando Carrera - Años de Experiencia',
          posiciones: [
            {
              nombre: 'Minería',
              sueldo: 3000000
            },
            {
              nombre: 'Financiera',
              sueldo: 1700000
            },
            {
              nombre: 'Energía',
              sueldo: 2300000
            },
            {
              nombre: 'Informática',
              sueldo: 1500000
            }
          ],
          yours: {
            nombre: industria,
            sueldo: 1350000,
            resultado: false
          }
        },

        por_institucion: {
          titulo: 'Comparación por Institución',
          desc: 'Considerando Carrera - Años de Experiencia',
          posiciones: [
            {
              nombre: 'Pontificia Universidad Católica',
              sueldo: 2777261
            },
            {
              nombre: 'Universidad de Chile',
              sueldo: 1904419
            },
            {
              nombre: 'Universidad Adolfo Ibañez',
              sueldo: 1198444
            }
          ],
          yours: {
            nombre: institucion,
            sueldo: sueldo,
            resultado: true
          }
        },

        por_cargo: {
          titulo: 'Comparación por Cargo',
          desc: 'Considerando Carrera - Años de Experiencia',
          posiciones: [
            {
              nombre: 'Gerente General',
              sueldo: 2777261
            },
            {
              nombre: 'Jefe',
              sueldo: 1904419
            },
            {
              nombre: 'Ingeniero Junior',
              sueldo: 1198444
            }
          ],
          yours: {
            nombre: cargo,
            sueldo: sueldo,
            resultado: false
          }
        }
      }
    }));

  });

});


app.post('/user/encuesta', function(req, res, next) {
  var accessToken = app.models.accessToken;
  var User = app.models.user;
  var encuesta = app.models.encuesta;

  if (!req.body.token) return res.sendStatus(401);

  accessToken.findById(req.body.token, function(err, token){
    if(err || token === null){
      return res.send(JSON.stringify({
        auth: false,
        message: 'invalid token'
      }));
    }

    User.findById(token.userId, function(err, user){
      if(err || user === null){
        return res.send(JSON.stringify({
          auth: false,
          message: 'could not find user'
        }));
      }
      else{
        encuesta.findOne({where: {email: user.email}}, function(err, encuesta){
          if(err || encuesta === null){
            return res.send(JSON.stringify({
              auth: false,
              message: 'record not found'
            }));
          }
          else {
            return res.send(JSON.stringify(encuesta));
          }
        });
      }
    });


  });

});




app.post('/change-password', function(req, res, next) {
  var User = app.models.user;
  var accessToken = app.models.accessToken;
  
  if (!req.body.token) return res.sendStatus(401);

  accessToken.findById(req.body.token, function(err, token){
    if(err || token === null){
      return res.send(JSON.stringify({
        auth: false,
        message: 'invalid token'
      }));
    }
    else{
      //verify passwords match
      if (!req.body.password || !req.body.confirmation ||
        req.body.password !== req.body.confirmation) {
        return res.sendStatus(400, new Error('Passwords do not match'));
      }

      User.findById(token.userId, function(err, user) {
        if (err) return res.sendStatus(404);
        user.hasPassword(req.body.oldPassword, function(err, isMatch) {
          if (!isMatch) {
            return res.sendStatus(401);
          } else {
            user.updateAttribute('password', User.hashPassword(req.body.password), function(err, user) {
              if (err) return res.sendStatus(404);
              console.log('> password change request processed successfully');
              res.status(200).json({msg: 'password change request processed successfully'});
            });
          }
        });
      });

    }
  });

});


app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
