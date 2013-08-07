var express =       require('express')
    , helmet =      require('helmet')
    , http =        require('http')
    , configHelper = require('./server/util/ConfigHelper')
    , config = configHelper.config()
    , passport =    require('passport')
    , path =        require('path')
    , User =        require('./server/models/User.js');

var app = express();

// CSRF: Configure Express to look for x-xsrf-token sent by Angular
var csrfValue = function(req) {
  var token = (req.body && req.body._csrf)
    || (req.query && req.query._csrf)
    || (req.headers['x-csrf-token'])
    || (req.headers['x-xsrf-token']);
  return token;
};

app.set('views', __dirname + '/client/views');
app.engine('html', require('jade').renderFile);
app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);
app.use(express.logger('dev'))
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.set("view options", {layout: false});
app.use(express.static(path.join(__dirname, 'client')));

// Security Headers
app.use(helmet.xframe('sameorigin'));   // only allow frame and iframe from same origin (do not DENY - breaks e2e tests)
app.use(helmet.iexss());                // enable IE8+ anti-cross-site scripting filter
app.use(helmet.contentTypeOptions());   // stop browser from guessing MIME type via content sniffing
app.use(helmet.cacheControl());         // no-store, no-cache

app.use(express.cookieSession(
    {
        secret: config.cookie_secret
    }));
app.use(express.csrf({value: csrfValue}));

// CSRF: Use custom middleware to set a cookie for Angular
app.use(function(req, res, next) {
  res.cookie('XSRF-TOKEN', req.session._csrf);
  next();
});

// Passport Local Strategy
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.localStrategy);
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

require('./server/routes.js')(app);

app.set('port', process.env.PORT || 8000);
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});