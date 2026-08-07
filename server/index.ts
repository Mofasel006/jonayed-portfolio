import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";

var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var staticPath = path.resolve(__dirname, "..", "dist", "public");

app.use(express.static(staticPath));

app.get("*", (_req: Request, res: Response<any, Record<string, any>>) => {
  (res as any).sendFile(path.join(staticPath, "index.html"));
});

var index_default = app;

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3e3;
  app.listen(port, () => {
    console.log(`Server running locally on http://localhost:${port}/`);
  });
}

export {
  index_default as default
};
