// backend/models/ExchangeRequest.js
const mongoose = require('mongoose');

const exchangeRequestSchema = mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  requestedBook: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  status: { type: String, default: 'pending' },
}, { timestamps: true });

const ExchangeRequest = mongoose.model('ExchangeRequest', exchangeRequestSchema);

export default ExchangeRequest;
