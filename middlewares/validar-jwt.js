const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No se reconoce el token",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const usuario = await Usuario.findById(uid);

    //si el usuario no existe
    if (!usuario) {
      return res.status(401).json({
        msg: "Token no válido",
      });
    }

    if (!usuario.state) {
      return res.status(401).json({
        msg: "Token no válido",
      });
    }

    req.usuario = usuario;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validarJWT,
};
