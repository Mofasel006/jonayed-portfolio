import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Vercel-এর সার্ভারলেস পাথের জন্য কনফিগারেশন
const staticPath = path.resolve(__dirname, "..", "dist", "public");

app.use(express.static(staticPath));

app.get("*", (_req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

// Vercel এর জন্য এক্সপোর্ট
export default app;

// শুধুমাত্র লোকাল পিসিতে রান করার জন্য
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running locally on http://localhost:${port}/`);
  });
}
