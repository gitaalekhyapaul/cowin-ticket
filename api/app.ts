import { config as dotenvConfig } from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { join } from "path";

dotenvConfig();

import { errorHandler } from "./error/error.handler";
import validateRoutes from "./validate/validate.routes";

const app: Express = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/validate", validateRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(join(__dirname, "..", "client", "out")));
  app.use("*", (req: Request, res: Response, next: NextFunction) => {
    try {
      res.render(join(__dirname, "..", "client", "out", "index.html"));
    } catch (err) {
      next(err);
    }
  });
} else {
  app.use("*", (req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      error: `Cannot ${req.method} ${req.originalUrl}`,
    });
  });
}

app.use(errorHandler);

Promise.all([])
  .then(() => {
    app.listen(process.env.PORT!, () => {
      console.log(
        `Server:${process.env.NODE_ENV} Listening for Requests on Port ${process.env.PORT}`
      );
    });
  })
  .catch((_) => {
    process.exit(1);
  });

process.on("SIGHUP", (_) => {
  process.exit(0);
});
process.on("SIGINT", (_) => {
  process.exit(0);
});
