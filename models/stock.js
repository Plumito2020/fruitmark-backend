const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockSchema = new Schema(
  {
    ville: {
      type: String,
      required: true,
    },
    stock: {
      type: Array,
      of: Map,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stock", stockSchema);
