import Morgan from "morgan";
import ExpressSession from "express-session";
import ConnectRedis from "connect-redis";
import Express from "express";
import CookieParser from "cookie-parser";
import BodyParser from "body-parser";
import CORS from "cors";

import ENV from "../env";
import Passport from "../http/passport";
import Logger from "../logger";

import InitUserAPI from "../api/user";
import InitPollAPI from "../api/poll";
import InitRewardAPI from "../api/reward";

const RedisStore = ConnectRedis(ExpressSession);
const apiServer = Express();

apiServer.use(Morgan((tokens, req, res) => {
  return [
    `${Date.now()} - web: `,
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"), "-",
    tokens["response-time"](req, res), "ms",
  ].join(" ");
}));

apiServer.use(CookieParser());
apiServer.use(BodyParser.urlencoded({ extended: false }));
apiServer.use(BodyParser.json());

apiServer.use(ExpressSession({
  store: new RedisStore({
    url: `redis://${ENV.REDIS_HOST}:${ENV.REDIS_PORT}`,
  }),

  secret: ENV.API_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

apiServer.use(CORS({
  origin: ENV.API_UI_ORIGIN,
  credentials: true,
}));

apiServer.use(Passport.initialize());
apiServer.use(Passport.session());

InitPollAPI(apiServer);
InitRewardAPI(apiServer);
InitUserAPI(apiServer);

apiServer.listen(ENV.API_PORT, ENV.API_HOST, () => {
  Logger.info(`POVO api server listening on ${ENV.API_HOST}:${ENV.API_PORT}`);
});
