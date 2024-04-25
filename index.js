const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerConfig'); // Importa il modulo di configurazione Swagger
const PORT = 3000;

app.use(express.json())
app.use('/swing-notes-api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.get('/api', (req, res) => {
    res.send('TESTING SERVER: WORKING PROPERLY');
  });

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))