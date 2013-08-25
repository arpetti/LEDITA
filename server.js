var express =       require('express')
    , log4js =       require('log4js')
    , helmet =      require('helmet')
    , fs =          require('fs')
    , http =        require('http')
    , https =        require('https')
    , configHelper = require('./server/util/ConfigHelper')
    , config = configHelper.config()
    , csrfHelper = require('./server/util/CsrfHelper')
    , passport =    require('passport')
    , path =        require('path')
    , User =        require('./server/models/User.js');

var app = express();

log4js.configure('./express-log-cfg.json');
var logger = log4js.getLogger('express-log');
app.configure(function() {
    app.use(log4js.connectLogger(logger, { level: 'auto' }));
});

var options = {
  key: fs.readFileSync(path.resolve(__dirname, 'server/cert/key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, 'server/cert/cert.pem'))
};

app.set('views', __dirname + '/client/views');
app.engine('html', require('jade').renderFile);
app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);
// app.use(express.logger('dev'))
app.use(express.compress());
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
        cookie: {secure: config.encrypt_cookie}
    }));

app.use(express.csrf({value: csrfHelper.csrfValue}));
app.use(csrfHelper.angularCsrf());

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