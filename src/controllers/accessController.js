const knex = require("../database/knex");
const appError = require("../utils/appError");
const { compare } = require("bcryptjs");
const authConfig = require("../configs/jwt.js");
const { sign } = require("jsonwebtoken");

class Access {
  async create(request, response) {
    const {email, password } = request.body;

    const user = await knex('users').where({email}).first();

    if (!user) 
    { throw new appError("Credenciais inválidas", 401) }

    const checkPassword = await compare(password, user.password)
    
    if (!checkPassword)
    { throw new appError("Credenciais inválidas", 401) }
    
    const {secret, expiresIn} = authConfig.jwt;
    
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return response.status(200).json({user, token})
  }
}

module.exports= Access;