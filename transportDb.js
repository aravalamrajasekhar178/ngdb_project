const mongoose = require('mongoose');

const transportConnection = mongoose.createConnection('mongodb://localhost:27017/transport', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const transportSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const Transport = transportConnection.model('Transport', transportSchema);

module.exports = Transport;
