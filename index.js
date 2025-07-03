const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Log = require('./models/log'); // Asegúrate de que la ruta sea correcta

dotenv.config();

const app = express();
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Ruta webhook
app.post('/dialogflow/webhook', async (req, res) => {
  const body = req.body;

  const session_id = body.session || '';
  const intent_name = body.queryResult?.intent?.displayName || '';
  const user_message = body.queryResult?.queryText || '';
  const bot_response = `Respuesta a ${intent_name}`;

  // Guardar en MongoDB
  const log = new Log({
    session_id,
    intent_name,
    user_message,
    bot_response
  });

  await log.save();

  res.json({
    fulfillmentText: bot_response
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
