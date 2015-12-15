'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _browserifyMiddleware = require('browserify-middleware');

var _browserifyMiddleware2 = _interopRequireDefault(_browserifyMiddleware);

var _stylus = require('stylus');

var _stylus2 = _interopRequireDefault(_stylus);

var _jeet = require('jeet');

var _jeet2 = _interopRequireDefault(_jeet);

var _kue = require('kue');

var _kue2 = _interopRequireDefault(_kue);

var _modulesQueue = require('./modules/queue');

var _modulesQueue2 = _interopRequireDefault(_modulesQueue);

var _routesIndex = require('./routes/index');

var _routesIndex2 = _interopRequireDefault(_routesIndex);

var _routesDatasources = require('./routes/datasources');

var _routesDatasources2 = _interopRequireDefault(_routesDatasources);

_modulesQueue2['default'].init();

var app = (0, _express2['default'])();

// view engine setup
app.set('views', _path2['default'].join(__dirname, '../views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use((0, _morgan2['default'])('dev'));
app.use(_bodyParser2['default'].json());
app.use(_bodyParser2['default'].urlencoded({ extended: false }));
app.use((0, _cookieParser2['default'])());
app.use(_stylus2['default'].middleware({
	src: __dirname + '/../stylus',
	dest: __dirname + '/../public',
	compile: function compile(str, path) {
		return (0, _stylus2['default'])(str).set('filename', path).set('compress', true).use((0, _jeet2['default'])())['import']('jeet');
	}
}));
app.use(_express2['default']['static'](_path2['default'].join(__dirname, '/../public')));
app.get('/main.js', (0, _browserifyMiddleware2['default'])(__dirname + '/../client/index.js'));

app.use('/fila', _kue2['default'].app);
app.use('/', _routesIndex2['default']);
app.use('/datasources', _routesDatasources2['default']);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

exports['default'] = app;
module.exports = exports['default'];