import express from "express";
import YAML from "js-yaml";
import cors from "cors";
import fs from "fs-extra";
import multer from "multer";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors());

const upload = multer({ dest: "uploads/" });

declare global {
  namespace Express {
    interface Request {
      file: any;
    }
  }
}
// GET /config
app.get("/config", (req, res) => {
  try {
    const config = YAML.load(
      fs.readFileSync(`${__dirname}/dash-config.yml`, "utf8")
    );
    res.json(config);
  } catch (error) {
    console.error("Error loading config", error);
    res.status(500).json({ error: "Error loading config" });
  }
});

// POST /config
app.post("/config", (req, res) => {
  try {
    const configString = YAML.dump(req.body);
    fs.writeFileSync(`${__dirname}/dash-config.yml`, configString, "utf8");
    res.json({ message: "Config stored successfully" });
  } catch (error) {
    console.error("Error storing config", error);
    res.status(500).json({ error: "Error storing config" });
  }
});

// POST /upload
app.post(
  "/upload",
  upload.single("file"),
  async (req: express.Request, res) => {
    try {
      const file = req.file;
      const tileId = req.body.tileId;
      const data = JSON.parse(await fs.readFile(file.path, "utf8"));

      // Move the file to the tile's directory
      const newFilePath = path.join(
        __dirname,
        "uploads",
        tileId,
        file.originalname
      );
      await fs.move(file.path, newFilePath, { overwrite: true });

      res.json({
        message: "File uploaded successfully",
        file: newFilePath,
        data,
      });
    } catch (error) {
      console.error("Error uploading file", error);
      res.status(500).json({ error: "Error uploading file" });
    }
  }
);

// GET /file/:filePath
app.get("/file/:dir/:filePath", (req, res) => {
  const filePath = path.join(
    __dirname,
    "uploads",
    req.params.dir,
    req.params.filePath
  );
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file", err);
      res.status(500).json({ error: "Error reading file" });
      return;
    }

    res.json(JSON.parse(data));
  });
});

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
