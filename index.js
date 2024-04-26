const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerConfig'); // Importa il modulo di configurazione Swagger
const PORT = 3000;
const userRoutes = require('./routes/user-routes')
/* const notesRoutes = require('./routes/notes-routes') */

app.use(express.json())
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/user', userRoutes) 
/* app.use('/api/notes', notesRoutes)  */


app.get('/api', (req, res) => {
    res.send('TESTING SERVER: WORKING PROPERLY');
  });

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))