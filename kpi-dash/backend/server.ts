import express from "express";
import YAML from "js-yaml";
import cors from "cors";
import * as fs from "fs";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors());

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

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
