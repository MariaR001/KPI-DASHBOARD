import express from "express";
import * as YAML from "js-yaml";
import * as fs from "fs";

const app = express();

app.use(express.json());

// GET /config
app.get("/config", (req, res) => {
  try {
    const config = YAML.load(fs.readFileSync("config.yml", "utf8"));
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
    fs.writeFileSync("config.yml", configString, "utf8");
    res.json({ message: "Config stored successfully" });
  } catch (error) {
    console.error("Error storing config", error);
    res.status(500).json({ error: "Error storing config" });
  }
});

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
