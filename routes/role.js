const { Schema, model } = require("mongoose");

const RoleSChema = Schema({
  role: {
    type: String,
    required: [true, "El rol es obligatorio"],
  },
});

module.exports = model("Role", RoleSChema);
