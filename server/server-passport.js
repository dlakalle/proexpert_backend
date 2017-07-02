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

// para realizar "group by" en arreglos de objetos
var groupArray = require('group-array');
var ss = require('simple-statistics');

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


app.post('/user/create', function(req, res, next) {
  var User = app.models.user;

  var newUser = {};
  newUser.email = req.body.email.toLowerCase();
  newUser.password = req.body.password;
  newUser.emailVerified = true;

  User.create(newUser, function(err, user) {
    if (err) {
      return res.send(JSON.stringify({
        message: "couldn't create user: " + newUser.email
      }));
    } else {
      return res.send(JSON.stringify({
        message: "user created successfully: " + newUser.email
      }));
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
  var Encuesta = app.models.encuesta;

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
        Encuesta.findOne({where: {email: user.email}}, function(err, encuesta){
          if(err || encuesta === null){
            return res.send(JSON.stringify({
              auth: false,
              message: 'record not found'
            }));
          }
          else {
            // db.encuesta.find().forEach(function(data) {
            //     db.encuesta.update({
            //         "_id": data._id
            //     }, {
            //         "$set": {
            //             "anoexp": parseInt(data.anoexp)
            //         }
            //     });
            // })

            Encuesta.find({where: {
              and: [
                {
                  or: [
                    { carrera: encuesta.carrera }, 
                    { industria: encuesta.industria }, 
                    { institucion: encuesta.institucion },
                  ]
                },
                { 
                  anoexp: {
                    between: [
                      parseInt(encuesta.anoexp - 1),
                      parseInt(encuesta.anoexp + 1)
                    ]
                  }
                }
              ]
            }}, function(err, encuestas){
              if(err){
                return res.send(JSON.stringify({
                  encuesta: encuesta,
                  message: "group array ERROR"
                }));
              }
              else {

                var carr_indust = groupArray(encuestas, 'carrera', 'industria')
                carr_indust = carr_indust[encuesta['carrera']][encuesta['industria']];

                var institut_carr = groupArray(encuestas, 'carrera', 'institucion');
                institut_carr = institut_carr[encuesta['carrera']];

                var indust_carr = groupArray(encuestas, 'carrera', 'industria');
                indust_carr = indust_carr[encuesta['carrera']];

                var cargo_carr = groupArray(encuestas, 'carrera', 'cargo');
                cargo_carr = cargo_carr[encuesta['carrera']];

                var genero = groupArray(encuestas, 'genero', 'genero');
                // genero = genero[encuesta['carrera']];

                return res.send(JSON.stringify({
                  encuesta: encuesta,
                  carr_indust: getRanking(carr_indust)[encuesta['sueldo']],
                  cargo_indust: groupArray(encuestas, 'cargo', 'industria'),
                  indust_carr: getTopFromRanking(encuesta, indust_carr, 'industria', 4),
                  institut_carr: getTopFromRanking(encuesta, institut_carr, 'institucion', 3),
                  cargo_carr: getTopFromRanking(encuesta, cargo_carr, 'cargo', 3),
                  genero: genero,
                  encuestas: encuestas
                }));
              }
            });

          }
        });
      }
    });


  });

});

var getRanking = function(array){
  var sueldos, sorted, ranks, n, dict, i;

  sueldos = array.map(function(x){ return x['sueldo']; });
  sorted = sueldos.sort(function(a, b){ return a - b });
  ranks = sueldos.map(function(v){ return sorted.indexOf(v) + 1 });

  n = ranks.length;
  dict = {};

  for(i = 0; i < n; i ++){
    dict[sorted[i]] = Math.round((ranks[i]/n)*100);
  }
  return dict;
};

var getTopFromRanking = function(encuesta, encuestas_agrupadas, filtro, k){
  var sorted, sueldos, i, nombre, item, tmp, item_cliente;
  sueldos = [];
  for(i in encuestas_agrupadas){
    nombre = encuestas_agrupadas[i][0][filtro];
    tmp = encuestas_agrupadas[i].map(function(x){ return x['sueldo']; });
    item = {
      nombre: nombre,
      sueldo_prom: Math.round(ss.mean(tmp)),
      sueldo_median: Math.round(ss.median(tmp))
    };

    if(encuesta[filtro] !== nombre){
      sueldos.push(item);
    }
    else {
      item_cliente = item;
    }
  }

  sorted = sueldos.sort(function(a, b){ return b['sueldo_prom'] - a['sueldo_prom'] });
  
  return {
    items: sorted.slice(0, k),
    item_cliente: item_cliente
  };
};

var getGlobalStats = function(array, field){
  var grouped = groupArray(array, field);

  for(i in grouped)
};

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
