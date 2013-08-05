var express =       require('express')
    , http =        require('http')
    , configHelper = require('./server/util/ConfigHelper')
    , config = configHelper.config()
    , passport =    require('passport')
    , path =        require('path')
    , User =        require('./server/models/User.js');

var app = express();

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

app.use(express.cookieSession(
    {
        secret: config.cookie_secret
    }));
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