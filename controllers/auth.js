const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

//importar para generar el JWT
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    //verificar si el email existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        msg: "Correo o Contraseña incorrectos",
      });
    }

    //verificar si el usuario esta activo
    if (!usuario.state) {
      return res.status(400).json({
        msg: "Usuario suspendido",
      });
    }

    //verificar la contraseña
    const validarPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validarPassword) {
      return res.status(400).json({
        msg: "Correo o Contraseña incorrectos",
      });
    }

    //generar el token
    const token = await generarJWT(usuario.id);

    res.status(200).json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Comuníquese con el administrador",
    });
  }
};

const obtenerID = (req = request, res = response) => {
  const { id, role } = req.usuario;

  res.json({
    id,
    role,
  });
};

module.exports = {
  login,
  obtenerID,
};
