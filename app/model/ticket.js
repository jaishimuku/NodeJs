const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   created_at: { type: Date, default: Date.now},
   name: String,
   age: Number,
   address: String,
   price: Number,
   from: String,
   to: String
});

module.exports = mongoose.model('Ticket', ticketSchema);