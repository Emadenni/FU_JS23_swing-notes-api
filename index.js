require("dotenv").config();
console.log(process.env.BASE_URL);
const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swaggerConfig");
const userRoutes = require("./routes/user-routes");
/* const notesRoutes = require('./routes/notes-routes') */

app.use(express.json());
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/user", userRoutes);
/* app.use('/api/notes', notesRoutes)  */

app.get("/api", (req, res) => {
  res.send("TESTING SERVER: WORKING PROPERLY");
});

app.listen(process.env.PORT, process.env.BASE_URL, () => {
  console.log(`server running at http://${process.env.BASE_URL}:${process.env.PORT}:`);
});