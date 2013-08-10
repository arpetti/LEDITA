var express =       require('express')
    , helmet =      require('helmet')
    , fs =          require('fs')
    , http =        require('http')
    , https =        require('https')
    , configHelper = require('./server/util/ConfigHelper')
    , config = configHelper.config()
    , passport =    require('passport')
    , path =        require('path')
    , User =        require('./server/models/User.js');

var app = express();

var options = {
  key: fs.readFileSync(path.resolve(__dirname, 'server/cert/key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, 'server/cert/cert.pem'))
};

// Configure Express to look for x-xsrf-token sent by Angular
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
        secret: config.cookie_secret,
        cookie: {secure: false}
    }));
app.use(express.csrf({value: csrfValue}));

// Middleware to set a CSRF cookie for Angular
app.use(function(req, res, next) {
  res.cookie('XSRF-TOKEN', req.session._csrf, {secure: false});
  next();
});

// Passport Local Strategy
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.localStrategy);
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

require('./server/routes.js')(app);

app.set('port_https', process.env.PORT_HTTPS || 8443);
https.createServer(options, app).listen(app.get('port_https'), function(){
    console.log("Express https server listening on port " + app.get('port_https'));
});
