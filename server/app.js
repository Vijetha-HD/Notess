const express = require("express");
const path = require("path");
const connectToDatabase = require("./database/dbConfig");
const noteRoutes = require("./routes/index");
const errorMiddleware = require("./middlewares/error");
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// API Routes
app.use(noteRoutes);

// ✅ Serve frontend static build
app.use(express.static(path.join(__dirname, "../client/build")));

// ✅ For any route not handled by backend, serve React index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
});

// ❌ DO NOT include the 404 JSON handler after the React catch-all route

// Error Middleware
app.use(errorMiddleware);

// Start Server
const PORT = process.env.PORT || 3001;
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(app.get("env"));
  });
});
