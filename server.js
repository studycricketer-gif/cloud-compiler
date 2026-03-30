const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/run", async (req, res) => {
  try {
    const response = await axios.post(
      "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
      {
        source_code: req.body.code,
        language_id: req.body.language_id
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ output: response.data.stdout || "No Output" });
  } catch (err) {
    res.json({ output: "Error running code" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));