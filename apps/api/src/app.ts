import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import adminApp from "./services/admin";
import degreesApp from "./services/degrees";
import feedbackApp from "./services/feedback";
import happeningApp from "./services/happening";
import healthApp from "./services/health";
import shoppingApp from "./services/shopping-list";

const app = new Hono();

app.use(logger());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://echo.uib.no"],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

app.route("/", healthApp);
app.route("/", adminApp);
app.route("/", happeningApp);
app.route("/", feedbackApp);
app.route("/", shoppingApp);
app.route("/", degreesApp);

app.get("/date", (c) => {
  return c.text(new Date().toISOString());
});

export default app;
