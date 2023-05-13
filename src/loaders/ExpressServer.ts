import * as cors from "cors";
import * as express from "express";
import { Express } from "express";

import helmet from "helmet";
import * as httpStatus from "http-status";

import { ApiError, errorConverter, errorHandler } from "@dinedrop/shared";
import { morgan } from "@dinedrop/shared";
import config from "../common/config";
import routes from "../api/routes";

const app: Express = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// enable cors
app.use(cors());
app.options("*", cors());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// v1 api routes
app.use("/", routes);

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
