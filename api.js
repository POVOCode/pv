const Dotenv = require("dotenv");

if (process.env.NODE_ENV === "development") {
  Dotenv.config({ path: `${__dirname}/env/development` });
}

// TODO: Add doc header
const Passport = require("./lib/http/passport");
const ExpressSession = require("express-session");
const RedisStore = require("connect-redis")(ExpressSession);

const apiServer = require("express")();

apiServer.use(require("cookie-parser")());
apiServer.use(require("body-parser").urlencoded({ extended: false }));
apiServer.use(require("body-parser").json());

apiServer.use(ExpressSession({
  store: new RedisStore({
    url: "redis://127.0.0.1:6379",
  }),

  secret: process.env.API_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

apiServer.use(require("cors")({
  origin: process.env.API_UI_ORIGIN,
  credentials: true,
}));

apiServer.use(Passport.initialize());
apiServer.use(Passport.session());

require("./lib/api/poll.js")(apiServer);
require("./lib/api/reward.js")(apiServer);
require("./lib/api/user.js")(apiServer);

apiServer.listen(process.env.API_PORT);
