import express from "express";
import studentRoutes from "./routes/routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/students", studentRoutes);

app.get("/", (req, res) => {
  res.send("Servir running on port 3000!");
});

app.listen(PORT, () => {
  console.log(`Server running at http:localhost:${PORT}`);
});